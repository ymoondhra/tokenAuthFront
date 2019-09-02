import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import styles from './styles/PasswordButtonsStyle';

export class PasswordButtons extends React.PureComponent {
  render() {
    const {
      clearOnPress,
      visibleOnPress,
      notVisible,
      password,
      ...props
    } = this.props;
    return (
      <View style={styles.passwordButtons}>
        {password !== '' && <ClearButton onPress={clearOnPress} />}
        <View style={styles.passwordButtonSpace} />
        {password !== '' && (
          <VisibleButton onPress={visibleOnPress} notVisible={notVisible} />
        )}
      </View>
    );
  }
}

export class ClearButton extends React.PureComponent {
  render() {
    const { style, ...props } = this.props;
    return (
      <TouchableOpacity style={[styles.passwordButton, style]} {...props}>
        <Image
          style={styles.clearImg}
          source={require('../../assets/clear-icon.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  }
}
export class VisibleButton extends React.PureComponent {
  render() {
    const { style, ...props } = this.props;
    return (
      <TouchableOpacity style={[styles.passwordButton, style]} {...props}>
        <Image
          style={styles.visibleImg}
          source={
            props.notVisible
              ? require('../../assets/visible-icon.png')
              : require('../../assets/invisible-icon.png')
          }
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  }
}
