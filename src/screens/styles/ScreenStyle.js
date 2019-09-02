import { Platform, StatusBar, StyleSheet} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import normalize from '../../modules/responsive.js';

export default StyleSheet.create({
// General Properties
  oneHundredPercentWidth: {
    width: '100%',
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
// Containers
  container: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
  },
  forgotPasswordTouchable: {
    width: '70%',
    maxWidth: normalize(250),
  },
  forgotPasswordKeyboardAvoidingView: {
    height: normalize(260),
  },
  signUpKeyboardAvoidingView: {
    height: normalize(375),
  },
  upperTextBox: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderWidth: 1,
  },
  midTextBox: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  lowerTextBox: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  passwordWithButtonsContainer: {
    flexDirection: 'row',
  },
  singleTextBox: {
    borderWidth: 1,
    borderRadius: 12,
  },
  textBox: {
    padding: normalize(10),
    borderColor: 'lightgray',
    height: normalize(50),
    width: '70%',
    maxWidth: normalize(250),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  developerMessageBox: {
    marginTop: '10%',
    backgroundColor: 'rgba(255,0,0, 0.5)',
    flexDirection: 'row',
    width: '70%',
    maxWidth: normalize(250),
    flexWrap: 'wrap',
    padding: normalize(10),
    opacity: 0.8
  },
// Space Boxes
  fivePercentSpace: {
    height: '5%',
  },
  thirteenSpace: {
    height: normalize(13),
  },
// Text
  text: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: normalize(15),
  },
  heading: {
    textAlign: 'center',
    fontSize: normalize(25),
    fontFamily: 'ProximaNova-Bold',
  },
  textInput: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: normalize(15),
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
  },
  errorMessage: {
    margin: normalize(8),
    maxWidth: '75%',
    color: 'red',
    textAlign: 'center',
  },
  successMessage: {
    color: 'green',
    marginTop: normalize(8),
    marginBottom: normalize(8),
    maxWidth: '75%',
    textAlign: 'center',
  },
  passwordWithButtons: {
    width: '85%', // leave space for buttons
  },
  subtext: {
    marginTop: normalize(20),
    color: '#898989',
  },
// Borders
  grayBorder: {
    borderColor: 'gray',
    borderWidth: 1,
  },
// Other
  logoAttemptText: {
    marginBottom: normalize(15),
  },
  logoActivityIndicator: {
    margin: normalize(8),
  },
});
