import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import API_URL from '../globals/server';
import getMostSignificantError from '../modules/authentication';
import styles from './styles/ScreenStyle';
import { AppButton, AppKeyboardAvoidingView } from '../components/CustomBasics';
import PasswordButtons from '../components/PasswordButtons';

// Note: It is highly recommended to require the user to enter their email
//       along with their username to create an account

export default class SignUpScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      notVisible: true,
      error: ' ',
      loadingResponse: false,
    };
  }

  /*
   * Attempt to create an account in the database via the Django REST API.
   * If account creation is successful, an authentication token will be returned from the fetch request
   */
  createAccount = () => {
    const { username, email, password } = this.state;
    const password1 = password;
    const password2 = password;
    const { navigation } = this.props;

    this.setState(
      () => ({
        loadingResponse: true,
      }),
      () => {
        fetch(`${API_URL}rest-auth/registration/`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            ...(email !== '' && { email }),
            password1,
            password2,
          }),
          // only send email parameter if it is not empty. If we send email with empty string,
          // the back-end will tell us we must provide a valid email address
        })
          .then(createResponse => createResponse.json())
          .then(createResponseJson => {
            if (createResponseJson.key !== undefined) {
              // if account was successfully created in the database
              AsyncStorage.setItem(
                '@storage_token',
                createResponseJson.key,
              ).then(() =>
                this.setState(
                  () => ({
                    loadingResponse: false,
                    error: ' ',
                  }),
                  () => navigation.navigate('App'),
                ),
              );
            } else {
              // pass all the error messages about why account creation failed into getMostSignificantError
              const mostSignificantError = getMostSignificantError(
                createResponseJson,
              );
              if (
                mostSignificantError ===
                  'The username you provided is already registered' ||
                mostSignificantError ===
                  'The email address you provided is already registered'
              ) {
                this.setState(
                  () => ({
                    loadingResponse: false,
                    error: ' ',
                  }),
                  () => {
                    navigation.navigate('Login', {
                      username,
                      password,
                      error: mostSignificantError,
                    });
                  },
                );
              } else {
                this.setState(() => ({
                  error: getMostSignificantError(createResponseJson),
                  loadingResponse: false,
                }));
              }
            }
          })
          .catch(error =>
            this.setState(() => ({
              error: error.message, // e.g. storage failure or "Network request failed" (i.e. could not connect to server)
              loadingResponse: false,
            })),
          );
      },
    );
  };

  render() {
    const {
      username,
      password,
      notVisible,
      error,
      loadingResponse,
    } = this.state;
    const { navigation } = this.props;

    return (
      <ScrollView
        style={styles.oneHundredPercentWidth}
        contentContainerStyle={styles.container}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
      >
        <AppKeyboardAvoidingView style={styles.signUpKeyboardAvoidingView}>
          <View>
            <Text style={[styles.text, styles.heading]}>Sign Up</Text>
          </View>
          <View style={styles.fivePercentSpace} />
          <View>
            <View style={[styles.upperTextBox, styles.textBox]}>
              <TextInput
                autoCapitalize="none"
                autoCompleteType="off"
                blurOnSubmit={false}
                editable
                placeholder="Create a username"
                ref={usernameRef => {
                  this.usernameRef = usernameRef;
                }}
                style={styles.textInput}
                onChangeText={usernameInput =>
                  this.setState({ username: usernameInput, error: ' ' })
                }
                onSubmitEditing={() => this.emailInput.focus()}
              />
            </View>
            <View style={[styles.midTextBox, styles.textBox]}>
              <TextInput
                autoCapitalize="none"
                autoCompleteType="email"
                blurOnSubmit={false}
                editable
                keyboardType="email-address"
                placeholder="Enter your email (optional)"
                ref={emailInput => {
                  this.emailInput = emailInput;
                }}
                style={[styles.textInput]}
                onChangeText={email => this.setState({ email, error: ' ' })}
                onSubmitEditing={() => {
                  this.passwordInput.focus();
                }}
              />
            </View>
            <View
              style={[
                styles.passwordWithButtonsContainer,
                styles.lowerTextBox,
                styles.textBox,
              ]}
            >
              <TextInput
                autoCapitalize="none"
                autoCompleteType="password"
                editable
                placeholder="Create a password"
                ref={passwordInput => {
                  this.passwordInput = passwordInput;
                }}
                secureTextEntry={notVisible}
                style={[styles.textInput, styles.passwordWithButtons]}
                textContentType="none" // attempt to avoid strong password bug
                onChangeText={passwordInput =>
                  this.setState({ password: passwordInput, error: ' ' })
                }
                onSubmitEditing={this.createAccount}
              />
              <PasswordButtons
                notVisible={notVisible}
                password={password}
                clearOnPress={() => {
                  this.setState(
                    () => ({ password: '', error: ' ' }),
                    () => {
                      this.passwordInput.clear();
                      this.passwordInput.focus();
                    },
                  );
                }}
                visibleOnPress={() => {
                  this.setState(
                    state => ({ notVisible: !state.notVisible }),
                    this.passwordInput.focus(),
                  );
                }}
              />
            </View>
          </View>
          <View>
            <Text style={[styles.text, styles.errorMessage]}>{error}</Text>
          </View>
          <AppButton
            disabled={loadingResponse}
            primary
            title="Sign Up"
            onPress={this.createAccount}
          />
        </AppKeyboardAvoidingView>
        <View style={[styles.thirteenSpace]} />
        <AppButton
          disabled={loadingResponse}
          title="Log In"
          onPress={() => navigation.navigate('Login', { username, password })}
        />
        <View style={styles.fivePercentSpace} />
        <ActivityIndicator size="small" animating={loadingResponse} />
      </ScrollView>
    );
  }
}
