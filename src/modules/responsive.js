import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/*
 * Adjusts size values based on device of the user
 */
const scale = SCREEN_WIDTH / 375; // changed from 320, which is based on iPhone 5 scale
export default function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios')
    return Math.round(PixelRatio.roundToNearestPixel(newSize));

  return Math.round(PixelRatio.roundToNearestPixel(newSize) - 2);
}
