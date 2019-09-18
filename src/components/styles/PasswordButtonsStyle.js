import { StyleSheet } from 'react-native';

import normalize from '../../modules/responsive';

export default StyleSheet.create({
  // Password Buttons
  passwordButtons: {
    width: '15%',
    height: '100%',
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 10,
  },
  passwordButton: {
    height: '50%',
    aspectRatio: 1,
    marginLeft: normalize(5),
  },
  // Password Images
  passwordImg: {
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
});
