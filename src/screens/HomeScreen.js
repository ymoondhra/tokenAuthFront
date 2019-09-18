import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import API_URL from '../globals/constants';
import styles from './styles/ScreenStyle';
import { AppButton } from '../components/CustomBasics';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      token: null,
      username: null,
      error: ' ',
      loadingResponse: false,
    };
  }

  logOut = () => {
    const { navigation } = this.props;

    this.setState(
      () => ({
        loadingResponse: true,
      }),
      () => {
        AsyncStorage.getItem('@storage_token')
          .then(token => {
            return fetch(`${API_URL}rest-auth/logout/`, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
              },
            });
          })
          // The token may have been invalidated since the user logged in.
          // Regardless of the response from the server, we want to return to the Login screen.
          // However, if you want to do some logic based on whether or not the log out, was successful
          // (e.g. log unsuccessful logout attempt in the database), here is the code:
          // .then(logoutResponse => logoutResponse.json())
          // .then(logoutResponseJson => {
          //   if ('detail' in logoutResponseJson) {
          //     if (logoutResponseJson.detail === 'Successfully logged out.') {
          //       // insert logic here
          //     } else if (logoutResponseJson.detail === 'Invalid token.') {
          //       // Token has been invalidated since
          //       // Or account has been deleted
          //     }
          //   }
          // })
          .then(() => AsyncStorage.removeItem('@storage_token'))
          .then(() => {
            this.setState(() => ({
              loadingResponse: false,
            }));
          })
          .then(() => navigation.navigate('Login'))
          .catch(error =>
            this.setState(() => ({
              error: error.message,
              loadingResponse: false,
              // "Network request failed" (i.e. could not connect to server)
              // or one of the two error messages from above
            })),
          );
      },
    );
  };

  getUsername = () => {
    this.setState(
      () => ({
        loadingResponse: true,
      }),
      () => {
        AsyncStorage.getItem('@storage_token')
          .then(token => {
            return fetch(`${API_URL}rest-auth/user/`, {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
              },
            });
          })
          .then(userResponse => userResponse.json())
          .then(userResponseJson => {
            if ('username' in userResponseJson) {
              this.setState(() => ({
                username: userResponseJson.username,
                loadingResponse: false,
              }));
            } else {
              this.setState(() => ({
                error: 'Could not get username',
                // token may have been invalidated since log in
                // or user may have been deleted
                loadingResponse: false,
              }));
            }
          })
          .catch(error =>
            this.setState(() => ({
              error: error.message, // e.g. "Network request failed" (i.e. could not connect to server)
              loadingResponse: false,
            })),
          );
      },
    );
  };

  getToken = () => {
    this.setState(
      () => ({
        loadingResponse: true,
      }),
      () => {
        AsyncStorage.getItem('@storage_token')
          .then(token => {
            this.setState(() => ({ token, loadingResponse: false }));
          })
          .catch(error =>
            this.setState(() => ({
              error: error.message, // "Network request failed" (i.e. could not connect to server)
              loadingResponse: false,
            })),
          );
      },
    );
  };

  render() {
    const { token, username, error, loadingResponse } = this.state;
    return (
      <View style={styles.container}>
        <Text style={[styles.text, styles.heading]}>You are authenticated</Text>
        <View style={styles.fivePercentSpace} />
        <Text style={[styles.text, styles.errorMessage]} text={error}>
          {error}
        </Text>
        {username ? (
          <Text style={[styles.text, styles.successMessage]}>
            Welcome to the app, {username}!
          </Text>
        ) : (
          <AppButton
            disabled={loadingResponse}
            primary
            title="Fetch My Username"
            onPress={this.getUsername}
          />
        )}
        <View style={[styles.thirteenSpace]} />
        {token ? (
          <Text style={[styles.text, styles.successMessage]}>{token}</Text>
        ) : (
          <AppButton
            disabled={loadingResponse}
            primary
            title="Fetch My Token"
            onPress={this.getToken}
          />
        )}
        <View style={[styles.thirteenSpace]} />
        <AppButton
          disabled={loadingResponse}
          primary
          title="Log Out"
          onPress={this.logOut}
        />
        <View style={styles.fivePercentSpace} />
        <ActivityIndicator size="small" animating={loadingResponse} />
      </View>
    );
  }
}
