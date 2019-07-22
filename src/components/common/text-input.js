import React from 'react';
import { Image,
  View,
  ViewPropTypes,
  StyleSheet,
  TextInput as DefaultTextInput,
  Platform,
  TouchableOpacity } from 'react-native';
import { bool, func, string, number } from 'prop-types';
import Constants from '../../constants';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderColor: Constants.Colors.BORDER_COLOR,
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 2,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 90,
  },
  iconStyle: {
    alignSelf: 'center',
    marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3,
  },
  textInputStyle: {
    color: Constants.Colors.BLACK,
    flex: 1,
    marginHorizontal: 10,
    ...Constants.Fonts.regular,
    ...Platform.select({
      android: { height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 7.8 },
      ios: { height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 5 },
    }),
  },
});

export default class TextInput extends React.Component {
  static propTypes = {
    autoCapitalize: string,
    autoCorrect: bool,
    autoFocus: bool,
    container: ViewPropTypes.style,
    editable: bool,
    icon: number,
    iconStyle: ViewPropTypes.style,
    keyboardType: string,
    maxLength: number,
    multiline: bool,
    onBlur: func,
    onChange: func,
    onChangeText: func.isRequired,
    onContentSizeChange: func,
    onFocus: func,
    onKeyPress: func,
    onPress: func,
    onSubmitEditing: func,
    placeholder: string.isRequired,
    placeholderTextColor: string,
    returnKeyType: string,
    secureTextEntry: bool,
    showDropdown: bool,
    showIcon: bool,
    textInputStyle: ViewPropTypes.style,
    value: string.isRequired,
  };

  static defaultProps = {
    autoCapitalize: 'none',
    autoCorrect: false,
    autoFocus: false,
    container: {},
    editable: true,
    icon: Constants.Images.iconSearch,
    iconStyle: {},
    keyboardType: 'default',
    maxLength: 250,
    multiline: false,
    onBlur: () => {},
    onChange: () => {},
    onContentSizeChange: () => {},
    onFocus: () => {},
    onKeyPress: () => {},
    onPress: () => true,
    onSubmitEditing: () => {},
    placeholderTextColor: Constants.Colors.BORDER_COLOR,
    returnKeyType: 'done',
    secureTextEntry: false,
    showDropdown: false,
    showIcon: false,
    textInputStyle: {},
  };

  onFocus() {
    const { onFocus } = this.props;

    if (onFocus) {
      onFocus();
    }
  }

  onBlur() {
    const { onBlur } = this.props;

    if (onBlur) {
      onBlur();
    }
  }

  onChange(event) {
    const { onChange } = this.props;

    if (onChange) {
      onChange(event);
    }
  }

  focus() {
    if (this.textInput) {
      this.textInput.focus();
    }
  }

  render() {
    const {
      autoCapitalize,
      autoCorrect,
      autoFocus,
      container,
      keyboardType,
      placeholder,
      placeholderTextColor,
      onChangeText,
      value,
      editable,
      secureTextEntry,
      returnKeyType,
      textInputStyle,
      onSubmitEditing,
      maxLength,
      onKeyPress,
      icon,
      iconStyle,
      showIcon,
      multiline,
      onContentSizeChange,
      showDropdown,
      onPress,
    } = this.props;

    return (
      <View style={[styles.container, container]}>
        {showIcon && (
          <View>
            <Image
              resizeMode="contain"
              source={icon}
              style={[styles.iconStyle, iconStyle]}
            />
          </View>
        )}
        <DefaultTextInput
          ref={(textInput) => {
            this.textInput = textInput;
          }}
          autoFocus={autoFocus}
          autoCorrect={autoCorrect}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeText}
          onChange={(event) => this.onChange(event)}
          value={value}
          editable={editable}
          multiline={multiline}
          onFocus={() => this.onFocus()}
          onBlur={() => this.onBlur()}
          style={[styles.textInputStyle, textInputStyle]}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          selectionColor={Constants.Colors.BLACK}
          underlineColorAndroid={Constants.Colors.TRANSPARENT}
          onKeyPress={onKeyPress}
          onContentSizeChange={onContentSizeChange}
        />
        {showDropdown && (
          <TouchableOpacity
            hitSlop={Constants.BaseStyle.HIT_SLOP}
            activeOpacity={0.9}
            onPress={onPress}
          >
            <Image
              resizeMode="contain"
              source={icon}
              style={[styles.iconStyle, iconStyle]}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
