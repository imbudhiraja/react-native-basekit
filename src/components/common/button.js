import React from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, ViewPropTypes } from 'react-native';
import { bool, func, string, number } from 'prop-types';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import Constants from '../../constants';

const styles = StyleSheet.create({
  iconStyle: {
    height: 20,
    width: 20,
  },
  style: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.BUTTON_COLOR,
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    width: (Constants.BaseStyle.DEVICE_WIDTH * 100) / 90,
    ...ifIphoneX(
      { height: (Constants.BaseStyle.DEVICE_HEIGHT * 6) / 100 },
      { height: (Constants.BaseStyle.DEVICE_HEIGHT * 7) / 100 }
    ),
  },
  text: {
    color: Constants.Colors.WHITE,
    ...Constants.Fonts.large,
    marginLeft: 10,
  },
});

const Button = ({
  disabled, onPress, style, title, textStyle, showIcon, icon,
}) => (
  <TouchableOpacity activeOpacity={0.9} disabled={disabled} onPress={onPress} style={[styles.style, style]}>
    {showIcon && <Image resizeMode="contain" style={styles.iconStyle} source={icon} />}
    <Text style={[styles.text, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

Button.defaultProps = {
  disabled: false,
  icon: Constants.Images.tick,
  showIcon: false,
  style: {},
  textStyle: {},
};

Button.propTypes = {
  disabled: bool,
  icon: number,
  onPress: func.isRequired,
  showIcon: bool,
  style: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  title: string.isRequired,
};

export default Button;
