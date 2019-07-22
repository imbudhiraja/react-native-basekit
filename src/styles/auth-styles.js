import { ifIphoneX } from 'react-native-iphone-x-helper';
import { StyleSheet } from 'react-native';
import Constants from '../constants';

const styles = {
  alignText: { textAlign: 'center' },
  buttonStyle: {
    backgroundColor: Constants.Colors.BUTTON_COLOR,
    marginTop: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 2,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 90,
  },
  container: {
    backgroundColor: Constants.Colors.WHITE,
    flex: 1,
  },
  content: {
    alignItems: 'center',
    flex: 1,
  },
  description: {
    ...Constants.Fonts.regular,
    color: Constants.Colors.GRAY,
    marginTop: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 1,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 70,
  },
  emailTextStyle: { color: Constants.Colors.BLACK },
  logoStyle: {
    alignSelf: 'center',
    height: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 50,
    marginVertical: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 8,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 50,
  },
  navigationBarStyle: { ...ifIphoneX({ height: 64 }, { height: 44 }) },
  sepratorStyle: {
    ...Constants.Fonts.regularBold,
    color: Constants.Colors.GRAY,
    fontFamily: 'Avenir-Medium',
    marginTop: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 2,
    textAlign: 'center',
  },
  signupTextInputContainer: { marginTop: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 5 },
  textDecorationLineStyle: {
    ...Constants.Fonts.regular,
    color: Constants.Colors.BUTTON_COLOR,
    marginTop: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 2,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  textStyle: {
    ...Constants.Fonts.extraLargeBold,
    color: Constants.Colors.BLACK,
    marginTop: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 2,
  },
};

export default StyleSheet.create(styles);
