import React from 'react';
import { ViewPropTypes,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Picker as DefaultPicker } from 'react-native';
import { arrayOf, func, shape, string } from 'prop-types';
import Constants from '../../constants';

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.White,
    flexDirection: 'row',
    height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 5,
    justifyContent: 'space-between',
    width: Constants.BaseStyle.DEVICE_WIDTH,
    ...Constants.BaseStyle.SHADOW_STYLE,
  },
  cancelButton: {
    color: Constants.Colors.Black,
    marginLeft: 15,
    textAlign: 'left',
    ...Constants.Fonts.regular,
  },
  doneButton: {
    color: Constants.Colors.Black,
    marginRight: 15,
    textAlign: 'right',
    ...Constants.Fonts.regular,
  },
  mainViewContainer: {
    bottom: 0,
    height: Constants.BaseStyle.DEVICE_HEIGHT,
    position: 'absolute',
    width: Constants.BaseStyle.DEVICE_WIDTH,
  },
  modalContainer: {
    ...Constants.BaseStyle.SHADOW_STYLE,
    backgroundColor: Constants.Colors.WHITE,
    bottom: 0,
    height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 30,
    position: 'absolute',
    width: Constants.BaseStyle.DEVICE_WIDTH,
  },
  picker: { backgroundColor: Constants.Colors.White },
});

const Picker = ({
  onClose, items, selectedValue, onChange, style,
}) => (
  <View style={[styles.mainViewContainer, style]}>
    <View style={styles.modalContainer}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          hitSlop={Constants.BaseStyle.HIT_SLOP}
          activeOpacity={0.9}
          onPress={onClose}
        >
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          hitSlop={Constants.BaseStyle.HIT_SLOP}
          activeOpacity={0.9}
          onPress={onClose}
        >
          <Text style={styles.doneButton}>Done</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.picker}>
        <DefaultPicker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => onChange(itemValue)}
        >
          {items.map(({ name }) => (
            <DefaultPicker.Item key={name} label={name} value={name} />
          ))}
        </DefaultPicker>
      </View>
    </View>
  </View>
);

Picker.propTypes = {
  items: arrayOf(shape({ name: string.isRequired })).isRequired,
  onChange: func.isRequired,
  onClose: func.isRequired,
  selectedValue: string.isRequired,
  style: ViewPropTypes.style,
};

Picker.defaultProps = { style: {} };
export default Picker;
