import { Dimensions } from 'react-native';
import Colors from './colors';

// Precalculate Device Dimensions for better performance
const x = Dimensions.get('window').width;
const y = Dimensions.get('window').height;

// Calculating ratio from Phone breakpoints
const ratioX = x < 375 ? (x < 320 ? 0.75 : 0.875) : 1; // eslint-disable-line
const ratioY = y < 568 ? (y < 480 ? 0.75 : 0.875) : 1; // eslint-disable-line

// We set our base font size value
const baseUnit = 16;

// We're simulating EM by changing font size according to Ratio
const unit = baseUnit * ratioX;

// We add an em() shortcut function
function em(value) {
  return unit * value;
}

// Then we set our styles with the help of the em() function
const BaseStyle = {
  DEVICE_HEIGHT: y,
  DEVICE_WIDTH: x,
  DRAWER_HEIGHT: y,
  DRAWER_OFFSET: 0.3,
  DRAWER_WIDTH: x * 0.53,

  HALF_HIT_SLOP: {
    bottom: 5,
    left: 5,
    right: 5,
    top: 5,
  },

  HIT_SLOP: {
    bottom: 10,
    left: 10,
    right: 10,
    top: 10,
  },

  IS_TABLET: !(y / x > 1.6),

  MARGIN: (x / 100) * 5,
  MARGINHORIZONTAL: (x / 100) * 5,
  MARGINVERTICAL: (y / 100) * 2,
  PADDING: (x / 100) * 5,
  PADDINGVERTICAL: (y / 100) * 1.2,
  RATIO_X: ratioX,
  RATIO_Y: ratioY,

  SHADOW_STYLE: {
    elevation: 5,
    shadowColor: Colors.SHADOW_COLOR,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },

  SMALL_HIT_SLOP: {
    bottom: 3,
    left: 3,
    right: 3,
    top: 3,
  },

  TAB_GROUP_STYLE: {
    backgroundColor: Colors.WHITE,
    elevation: 5,
    height: 56,
    shadowColor: Colors.SHADOW_COLOR,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },

  UNIT: em(1),
};

module.exports = BaseStyle;
