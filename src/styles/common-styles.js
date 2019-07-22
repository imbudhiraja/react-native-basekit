import { StyleSheet } from 'react-native';
import Constants from '../constants';

const styles = {
  animationStyle: {
    height: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 65,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 65,
  },
  container: {
    backgroundColor: Constants.Colors.DASHBOARD_BG_COLOR,
    flex: 1,
  },
};

export default StyleSheet.create(styles);
