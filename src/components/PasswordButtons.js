import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import styles from './styles/PasswordButtonsStyle';

const clearIconImg = require('../../assets/clear-icon.png');
const visibleIconImg = require('../../assets/visible-icon.png');
const invisibleIconImg = require('../../assets/invisible-icon.png');

export default class PasswordButtons extends React.PureComponent {
  render() {
    const { clearOnPress, visibleOnPress, notVisible, password } = this.props;

    if (password === '' || password === undefined)
      return <View style={styles.passwordButtons} />;

    return (
      <View style={styles.passwordButtons}>
        <TouchableOpacity style={styles.passwordButton} onPress={clearOnPress}>
          <Image
            style={styles.passwordImg}
            source={clearIconImg}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.passwordButton}
          notVisible={notVisible}
          onPress={visibleOnPress}
        >
          <Image
            style={styles.passwordImg}
            source={notVisible ? visibleIconImg : invisibleIconImg}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  }
}
