import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { API_URL } from '../globals/constants';
import getMostSignificantError from '../modules/authentication';
import styles from './styles/ScreenStyle';
import { AppButton, AppKeyboardAvoidingView } from '../components/CustomBasics';

// Note: It is highly recommended to require the user to enter their email
//       along with their username to create an account

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password1: '',
      password2: '',
      error: ' ',
      loadingResponse: false,
    };
  }

  /*
   * Attempt to create an account in the database via the Django REST API.
   * If account creation is successful, an authentication token will be returned from the fetch request
   */
  createAccount = () => {
    const { username, email, password1, password2 } = this.state;
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
                  }),
                  () => navigation.navigate('App'),
                ),
              );
            } else {
              // pass all the error messages about why account creation failed into getMostSignificantError
              let mostSignificantError = getMostSignificantError(
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
                  }),
                  () => {
                    navigation.navigate('Login', {
                      username,
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
    const { error, loadingResponse } = this.state;
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
                  this.password1Input.focus();
                }}
              />
            </View>
            <View style={[styles.midTextBox, styles.textBox]}>
              <TextInput
                autoCapitalize="none"
                blurOnSubmit={false}
                editable
                placeholder="Create a password"
                ref={password1Input => {
                  this.password1Input = password1Input;
                }}
                secureTextEntry
                style={[styles.textInput]}
                textContentType="none" // attempt to avoid strong password bug
                onChangeText={password1 =>
                  this.setState({ password1, error: ' ' })
                }
                onSubmitEditing={() => this.password2Input.focus()}
              />
            </View>
            <View style={[styles.lowerTextBox, styles.textBox]}>
              <TextInput
                autoCapitalize="none"
                editable
                placeholder="Re-enter your password"
                ref={password2Input => {
                  this.password2Input = password2Input;
                }}
                secureTextEntry
                style={[styles.textInput]}
                textContentType="none" // attempt to avoid strong password bug
                onChangeText={password2 =>
                  this.setState({ password2, error: ' ' })
                }
                onSubmitEditing={this.createAccount}
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
          onPress={() => navigation.navigate('Login')}
        />
        <View style={styles.fivePercentSpace} />
        <ActivityIndicator size="small" animating={loadingResponse} />
      </ScrollView>
    );
  }
}
