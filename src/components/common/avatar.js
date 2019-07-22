import React from 'react';
import { Image, View, StyleSheet, Text, ViewPropTypes } from 'react-native';
import { oneOfType, string, number } from 'prop-types';
import Constants from '../../constants';
import Connection from '../../config/connection';

const defaultStyles = StyleSheet.create({
  initials: {
    ...Constants.Fonts.subtitleBold,
    color: Constants.Colors.White,
  },
  style: {
    borderRadius: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 7.5,
    height: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 15,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 15,
  },
});

const Avatar = (props) => {
  const setAvatarColor = (fullName) => {
    const userName = fullName || '';
    const name = userName.toUpperCase().split(' ');

    let avatarName;

    if (name.length === 1) {
      avatarName = `${name[0].charAt(0)}`;
    } else if (name.length > 1) {
      avatarName = `${name[0].charAt(0)}${name[1].charAt(0)}`;
    } else {
      avatarName = '';
    }
    let sumChars = 0;

    // eslint-disable-next-line
    for (let i = 0; i < userName.length; i++) {
      sumChars += userName.charCodeAt(i);
    }
    // inspired by https://github.com/wbinnssmith/react-user-avatar
    // colors from https://flatuicolors.com/
    const colors = [
      '#e67e22',
      '#2ecc71',
      '#3498db',
      '#8e44ad',
      '#e74c3c',
      '#1abc9c',
      '#2c3e50',
    ];

    return {
      avatarColor: colors[sumChars % colors.length],
      avatarName,
    };
  };

  const renderInitials = (user, style) => {
    const {
      avatarName, avatarColor,
    } = setAvatarColor(user);

    return (
      <View
        style={[defaultStyles.style, style, { backgroundColor: avatarColor }]}
      >
        <Text style={defaultStyles.initials}>{avatarName}</Text>
      </View>
    );
  };

  const {
    fullName, image, style, resizeMode,
  } = props;

  if (!image) {
    return renderInitials(fullName, style);
  }

  if (typeof image === 'string') {
    return (
      <Image
        resizeMode={resizeMode}
        source={{ uri: Connection.getMedia(image) }}
        style={[defaultStyles.style, style]}
      />
    );
  }

  return <Image source={image} style={[defaultStyles.style, style]} />;
};

Avatar.defaultProps = {
  fullName: '',
  image: '',
  resizeMode: 'contain',
  style: {},
};

Avatar.propTypes = {
  fullName: string,
  image: oneOfType([string, number]),
  resizeMode: string,
  style: ViewPropTypes.style,
};

export default Avatar;
