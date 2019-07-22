import React from 'react';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import Constants from '../../constants';

const styles = StyleSheet.create({
  separatorStyle: {
    backgroundColor: Constants.Colors.BORDER_COLOR,
    height: 1,
  },
});
const ItemSeparator = ({ style }) => (
  <View style={[styles.separatorStyle, style]} />
);

ItemSeparator.propTypes = { style: ViewPropTypes.style };
ItemSeparator.defaultProps = { style: {} };

export default ItemSeparator;
