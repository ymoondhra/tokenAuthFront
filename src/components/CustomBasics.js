import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './styles/CustomBasicsStyle';

export const AppButton = ({ primary, title, disabled, ...props }) => {
  const buttonStyle = primary ? styles.primaryButton : styles.secondaryButton;
  const textStyle = primary
    ? styles.primaryButtonText
    : styles.secondaryButtonText;
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[buttonStyle, styles.button, { opacity: disabled ? 0.6 : 1 }]}
      underlayColor="#fff"
      {...props}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export const AppKeyboardAvoidingView = props => {
  const keyboardVerticalOffset =
    Platform.OS === 'android' ? StatusBar.currentHeight : 0;

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={[styles.keyboardAvoidingView, props.style]}
    >
      {props.children}
    </KeyboardAvoidingView>
  );
};
