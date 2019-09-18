import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './styles/CustomBasicsStyle';

export class AppButton extends React.PureComponent {
  render() {
    const { primary, title, disabled, onPress } = this.props;
    const buttonStyle = primary ? styles.primaryButton : styles.secondaryButton;
    const textStyle = primary
      ? styles.primaryButtonText
      : styles.secondaryButtonText;
    return (
      <TouchableOpacity
        disabled={disabled}
        style={[buttonStyle, styles.button, { opacity: disabled ? 0.6 : 1 }]}
        underlayColor="#fff"
        onPress={onPress}
      >
        <Text style={textStyle}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

export const AppKeyboardAvoidingView = props => {
  const keyboardVerticalOffset =
    Platform.OS === 'android' ? StatusBar.currentHeight : 0;
  const { style, children } = props;

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={[styles.keyboardAvoidingView, style]}
    >
      {children}
    </KeyboardAvoidingView>
  );
};
