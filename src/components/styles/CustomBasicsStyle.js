import { StyleSheet } from 'react-native';

import normalize from '../../modules/responsive';

export default StyleSheet.create({
  // Container
  keyboardAvoidingView: {
    height: normalize(280),
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  // Buttons
  button: {
    padding: normalize(15),
    alignItems: 'center',
    width: '68%',
    borderRadius: normalize(50),
    marginBottom: normalize(5),
  },
  primaryButton: {
    backgroundColor: '#FF5035',
  },
  secondaryButton: {
    borderColor: '#FF5035',
    borderWidth: 1,
  },
  // Text
  text: {
    fontSize: normalize(15),
  },
  secondaryButtonText: {
    color: '#FF5035',
    fontWeight: 'bold',
  },
  primaryButtonText: {
    color: 'snow',
    fontWeight: 'bold',
  },
});
