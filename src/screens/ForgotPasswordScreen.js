import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import API_URL from '../globals/server';
import getMostSignificantError from '../modules/authentication';
import styles from './styles/ScreenStyle';
import { AppButton, AppKeyboardAvoidingView } from '../components/CustomBasics';

export default class ForgotPasswordScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      error: ' ',
      success: ' ',
      loadingResponse: false,
    };
  }

  sendResetPasswordEmail = () => {
    const { email } = this.state;
    this.setState(
      () => ({
        loadingResponse: true,
      }),
      () => {
        fetch(`${API_URL}rest-auth/password/reset/`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        })
          .then(resetResponse => resetResponse.json())
          .then(resetResponseJson => {
            if (
              resetResponseJson.detail ===
              'Password reset e-mail has been sent.'
            ) {
              this.setState(() => ({
                success: 'Please check your email for further instructions',
                error: ' ',
                loadingResponse: false,
              }));
            } else {
              this.setState(() => ({
                success: ' ',
                error: getMostSignificantError(resetResponseJson),
                loadingResponse: false,
              }));
            }
          })
          .catch(error =>
            this.setState(() => ({
              success: ' ',
              error: error.message, // e.g. storage failure or "Network request failed" (i.e. could not connect to server)
              loadingResponse: false,
            })),
          );
      },
    );
  };

  render() {
    const { error, success, loadingResponse } = this.state;
    const { navigation } = this.props;
    const messageStyle =
      error !== ' ' ? styles.errorMessage : styles.successMessage;
    const messageToDisplay = error !== ' ' ? error : success;

    return (
      <ScrollView
        style={styles.oneHundredPercentWidth}
        contentContainerStyle={styles.container}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
      >
        <AppKeyboardAvoidingView
          style={styles.forgotPasswordKeyboardAvoidingView}
        >
          <View>
            <Text style={[styles.text, styles.heading]}>Reset Password</Text>
          </View>
          <View>
            <Text style={[styles.text, styles.subtext]}>
              An email will be sent to your account
            </Text>
          </View>
          <View style={styles.fivePercentSpace} />
          <View style={[styles.singleTextBox, styles.textBox]}>
            <TextInput
              autoCapitalize="none"
              autoCompleteType="email"
              editable
              placeholder="Enter your email"
              style={styles.textInput}
              onChangeText={email =>
                this.setState({ email, error: ' ', success: ' ' })
              }
              onSubmitEditing={this.sendResetPasswordEmail}
            />
          </View>
          <View>
            <Text style={[styles.text, messageStyle]}>{messageToDisplay}</Text>
          </View>
          <AppButton
            disabled={loadingResponse}
            primary
            title="Send Email"
            onPress={this.sendResetPasswordEmail}
          />
        </AppKeyboardAvoidingView>
        <View style={[styles.thirteenSpace]} />
        <AppButton
          disabled={loadingResponse}
          title="Log In"
          onPress={() => navigation.navigate('Login')}
        />
        <View style={[styles.singleTextBox, styles.developerMessageBox]}>
          <Text style={styles.text}>
            Note to Developers:
          </Text>
          <Text style={styles.text}>
            This feature will not work because no email server is configured on
            the back-end.
          </Text>
        </View>
        <View style={styles.fivePercentSpace} />
        <ActivityIndicator size="small" animating={loadingResponse} />
      </ScrollView>
    );
  }
}
