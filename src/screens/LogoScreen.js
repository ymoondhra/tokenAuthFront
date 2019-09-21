import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import API_URL from '../globals/server';
import styles from './styles/ScreenStyle';

export default class LogoScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      error: ' ',
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    AsyncStorage.getItem('@storage_token')
      .then(storageToken => {
        if (storageToken === null) {
          // if user does not have token in storage
          navigation.navigate('Auth');
        } else {
          // if user has token in storage
          this.isActiveToken(storageToken).then(isActive => {
            if (isActive === true)
              // if valid token
              navigation.navigate('App');
            else if (isActive === false)
              // if invalid token
              navigation.navigate('Auth');
            // else isActive === null, meaning we could not get token from database,
            // stay on this screen to show error
          });
        }
      })
      .catch(() => {
        this.setState(error => ({
          error: error.message, // e.g. storage failure or "Network request failed" (i.e. could not connect to server)
        }));
      });
  }

  /*
   * Checks if the token in storage maps to a user in the database.
   * It may be the case that the user logged in, went on a different device,
   * and logged out through that different device. Sending a valid request to log out
   * to the back-end causes the back-end to delete the token, invalidating the token.
   */
  isActiveToken = token => {
    return fetch(`${API_URL}rest-auth/user/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
      .then(userResponse => userResponse.ok)
      .catch(error => {
        this.setState(() => ({
          error: error.message, // "Network request failed" (i.e. could not connect to server)
        }));
        return null;
      });
  };

  render() {
    const { error } = this.state;
    return (
      <View style={styles.container}>
        <Text style={[styles.text, styles.logoAttemptText]}>
          Attempting to log in
        </Text>
        {error === ' ' ? (
          <ActivityIndicator
            size="small"
            style={styles.logoActivityIndicator}
          />
        ) : (
          <Text style={[styles.text, styles.errorMessage]}> {error} </Text>
        )}
      </View>
    );
  }
}
