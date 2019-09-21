import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import API_URL from '../globals/server';
import getMostSignificantError from '../modules/authentication';
import styles from './styles/ScreenStyle';
import { AppButton, AppKeyboardAvoidingView } from '../components/CustomBasics';
import PasswordButtons from '../components/PasswordButtons';

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      notVisible: true,
      error: ' ',
      loadingResponse: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.setState(() => ({
      username: navigation.getParam('username', ''),
      password: navigation.getParam('password', ''),
      error: navigation.getParam('error', ' '),
    }));
  }

  /*
   * Attempt to fetch token from database via Django REST API
   */
  logIn = () => {
    const { username, password } = this.state;
    const { navigation } = this.props;

    this.setState(
      () => ({
        loadingResponse: true,
      }),
      () => {
        fetch(`${API_URL}rest-auth/login/`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        })
          .then(loginResponse => loginResponse.json())
          .then(loginResponseJson => {
            if (loginResponseJson.key !== undefined) {
              // if the database returned a token
              AsyncStorage.setItem('@storage_token', loginResponseJson.key) // store token in user storage
                .then(() =>
                  this.setState(
                    () => ({
                      loadingResponse: false,
                    }),
                    () => navigation.navigate('App'),
                  ),
                );
            } else {
              // pass all the error messages about why the login failed into getMostSignificantError
              this.setState(() => ({
                error: getMostSignificantError(loginResponseJson),
                loadingResponse: false,
              }));
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
        <AppKeyboardAvoidingView>
          <View>
            <Text style={[styles.text, styles.heading]}>Log In</Text>
          </View>
          <View style={styles.fivePercentSpace} />
          <View>
            <View style={[styles.upperTextBox, styles.textBox]}>
              <TextInput
                autoCapitalize="none"
                autoCompleteType="username"
                blurOnSubmit={false}
                defaultValue={username}
                editable
                placeholder="Enter your username"
                ref={usernameRef => {
                  this.usernameRef = usernameRef;
                }}
                style={styles.textInput}
                onChangeText={usernameInput =>
                  this.setState({ username: usernameInput, error: ' ' })
                }
                onSubmitEditing={() => this.passwordInput.focus()}
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
                defaultValue={password}
                editable
                placeholder="Enter your password"
                ref={passwordInput => {
                  this.passwordInput = passwordInput;
                }}
                secureTextEntry={notVisible}
                style={[styles.textInput, styles.passwordWithButtons]}
                textContentType="none" // attempt to avoid strong password bug
                onChangeText={passwordInput =>
                  this.setState({ password: passwordInput, error: ' ' })
                }
                onSubmitEditing={this.logIn}
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
            title="Log In"
            onPress={this.logIn}
          />
        </AppKeyboardAvoidingView>
        <View style={[styles.thirteenSpace]} />
        <AppButton
          disabled={loadingResponse}
          title="Sign Up"
          onPress={() => navigation.navigate('SignUp')}
        />
        <TouchableOpacity
          style={[styles.forgotPasswordTouchable, styles.flexCenter]}
          disabled={loadingResponse}
          onPress={() => navigation.navigate('Forgot')}
        >
          <Text style={[styles.text, styles.subtext]}>Forgot Password?</Text>
        </TouchableOpacity>
        <View style={styles.fivePercentSpace} />
        <ActivityIndicator size="small" animating={loadingResponse} />
      </ScrollView>
    );
  }
}
