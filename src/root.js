import React from 'react';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import { Toast } from 'react-native-redux-toast';
import Navigator from './config/navigator';
import Constants from './constants';
import { Progress } from './components';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.White,
    flex: 1,
  },
  errorStyle: { backgroundColor: Constants.Colors.ERROR },
  messageStyle: {
    color: Constants.Colors.WHITE,
    ...Constants.Fonts.regular,
  },
  toastContainerStyle: { backgroundColor: Constants.Colors.BLACK },
  warningStyle: { backgroundColor: Constants.Colors.WARNING },
});

const Root = () => (
  <View style={styles.container}>
    {Platform.OS === 'android' && (
      <StatusBar backgroundColor={Constants.Colors.AccentColor} />
    )}
    <Progress />
    <Navigator />
    <Toast
      errorStyle={styles.errorStyle}
      warningStyle={styles.warningStyle}
      containerStyle={styles.toastContainerStyle}
      messageStyle={styles.messageStyle}
    />
  </View>
);

export default Root;
