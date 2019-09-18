/* global __DEV__ */

const API_URL = __DEV__
  ? 'http://localhost:8000/api/v1/'
  : 'https://example.com/api/v1/';

export default API_URL;
