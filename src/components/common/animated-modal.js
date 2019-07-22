import React from 'react';
import { StyleSheet, View, Modal, ViewPropTypes } from 'react-native';
import { bool, node } from 'prop-types';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import Constants from '../../constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.TRANSLUCENT,
    flex: 1,
  },
  content: {
    backgroundColor: Constants.Colors.WHITE,
    borderTopLeftRadius: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 6,
    borderTopRightRadius: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 6,
    bottom: 0,
    left: 0,
    paddingHorizontal: Constants.BaseStyle.MARGINHORIZONTAL,
    position: 'absolute',
    right: 0,
    width: Constants.BaseStyle.DEVICE_WIDTH,
    ...ifIphoneX(
      { top: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 25 },
      { top: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 20 }
    ),
  },
});

const AnimatedModal = ({
  children, visible, contentStyle,
}) => (
  <Modal animationType="slide" transparent visible={visible}>
    <View style={styles.container}>
      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  </Modal>
);

AnimatedModal.propTypes = {
  children: node.isRequired,
  contentStyle: ViewPropTypes.style,
  visible: bool,
};

AnimatedModal.defaultProps = {
  contentStyle: {},
  visible: false,
};

export default AnimatedModal;
