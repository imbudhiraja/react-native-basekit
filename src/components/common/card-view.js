import React from 'react';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import { node } from 'prop-types';
import Constants from '../../constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.White,
    borderRadius: 8,
    ...Constants.BaseStyle.SHADOW_STYLE,
  },
});
const CardView = ({
  children, style,
}) => <View style={[styles.container, style]}>{children}</View>;

CardView.defaultProps = { style: {} };
CardView.propTypes = {
  children: node.isRequired,
  style: ViewPropTypes.style,
};

export default CardView;
