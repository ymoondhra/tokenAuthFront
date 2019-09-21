/* global __DEV__ */
import { Platform } from 'react-native';

let API_URL;

if (Platform.OS === 'android') {
  API_URL = __DEV__
    ? 'http://10.0.2.2:8000/api/v1/'
    : 'https://example.com/api/v1/';
} else {
  API_URL = __DEV__
    ? 'http://localhost:8000/api/v1/'
    : 'https://example.com/api/v1/';
}

export default API_URL;
