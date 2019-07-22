import React from 'react';
import { Keyboard,
  findNodeHandle,
  View,
  Image,
  ScrollView,
  Text,
  Platform } from 'react-native';
import _ from 'lodash';
import { func, shape } from 'prop-types';
import TimerMixin from 'react-timer-mixin';
import ReactMixin from 'react-mixin';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { connect } from 'react-redux';
import Regex from '../../utilities/regex';
import Constants from '../../constants';
import { resetNavigator } from '../../actions/nav-action-types';
import { AuthStyles } from '../../styles';
import { Button, TextInput } from '../../components';

class ChangePassword extends React.Component {
  static propTypes = {
    navigation: shape({
      dispatch: func.isRequired,
      goBack: func.isRequired,
    }).isRequired,
    resetNavigator: func.isRequired,
  };

  state = {
    confirmPassword: '',
    oldPassword: '',
    password: '',
  };

  oldPasswordRef = React.createRef();

  newPasswordRef = React.createRef();

  confirmPasswordRef = React.createRef();

  scrollViewRef = React.createRef();

  onSubmit = () => {
    Keyboard.dismiss();
    const {
      confirmPassword, password, oldPassword,
    } = this.state;
    const {
      navigation: { dispatch },
      resetNavigator: resetNav,
    } = this.props;

    const {
      enterOldPassword,
      enterNewPassword,
      invalidPassword,
      paswordNotMatched,
    } = Constants.i18n.validations;

    if (_.isEmpty(oldPassword.trim())) {
      dispatch(ToastActionsCreators.displayInfo(enterOldPassword));

      return;
    }

    if (_.isEmpty(password.trim())) {
      dispatch(ToastActionsCreators.displayInfo(enterNewPassword));

      return;
    }

    if (!Regex.validatePassword(password.trim())) {
      dispatch(ToastActionsCreators.displayInfo(invalidPassword));

      return;
    }

    if (confirmPassword.trim() !== password.trim()) {
      dispatch(ToastActionsCreators.displayInfo(paswordNotMatched));

      return;
    }

    resetNav({ route: 'Login' });
  };

  handleScrollView = (ref) => {
    const context = this;
    const scrollResponder = context.scrollViewRef.current.getScrollResponder();

    context.setTimeout(() => {
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        ref,
        (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 20,
        true
      );
    }, 300);
  };

  resetScrollView = (ref) => {
    const context = this;
    const scrollResponder = context.scrollViewRef.current.getScrollResponder();

    context.setTimeout(() => {
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(ref, 0, true);
    }, 300);
  };

  render() {
    const {
      confirmPassword, password, oldPassword,
    } = this.state;
    const {
      password: {
        oldPasswordText,
        savePassword,
        setNewPassword,
        setNewPasswordHere,
        confirm,
        newPassword,
      },
    } = Constants.i18n;

    return (
      <View style={AuthStyles.container}>
        <View style={AuthStyles.content}>
          <ScrollView
            ref={this.scrollViewRef}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
            keyboardShouldPersistTaps="always"
          >
            <Image
              source={Constants.Images.Logo}
              style={AuthStyles.logoStyle}
            />
            <Text style={AuthStyles.textStyle}>{setNewPassword}</Text>
            <Text style={AuthStyles.description}>{setNewPasswordHere}</Text>
            <TextInput
              ref={this.oldPasswordRef}
              value={oldPassword}
              placeholder={oldPasswordText}
              returnKeyType="next"
              secureTextEntry
              onChangeText={(value) => this.setState({ oldPassword: value })}
              onFocus={() => {
                this.handleScrollView(
                  findNodeHandle(this.oldPasswordRef.current)
                );
              }}
              onBlur={() => {
                this.resetScrollView(
                  findNodeHandle(this.oldPasswordRef.current)
                );
              }}
              onSubmitEditing={() => this.newPasswordRef.current.focus()}
              maxLength={16}
            />
            <TextInput
              ref={this.newPasswordRef}
              value={password}
              placeholder={newPassword}
              returnKeyType="next"
              secureTextEntry
              onChangeText={(value) => this.setState({ password: value })}
              onFocus={() => {
                this.handleScrollView(
                  findNodeHandle(this.newPasswordRef.current)
                );
              }}
              onBlur={() => {
                this.resetScrollView(
                  findNodeHandle(this.newPasswordRef.current)
                );
              }}
              onSubmitEditing={() => this.confirmPasswordRef.current.focus()}
              maxLength={16}
            />

            <TextInput
              ref={this.confirmPasswordRef}
              value={confirmPassword}
              placeholder={confirm}
              returnKeyType="done"
              secureTextEntry
              onChangeText={(value) => this.setState({ confirmPassword: value })}
              onFocus={() => {
                this.handleScrollView(
                  findNodeHandle(this.confirmPasswordRef.current)
                );
              }}
              onBlur={() => {
                this.resetScrollView(
                  findNodeHandle(this.confirmPasswordRef.current)
                );
              }}
              onSubmitEditing={this.onSubmit}
              maxLength={16}
            />

            <Button
              onPress={this.onSubmit}
              style={AuthStyles.buttonStyle}
              title={savePassword}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}
ReactMixin(ChangePassword.prototype, TimerMixin);

export default connect(
  null,
  { resetNavigator }
)(ChangePassword);
