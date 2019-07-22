import React from 'react';
import { Keyboard,
  findNodeHandle,
  View,
  Image,
  ScrollView,
  Text,
  Platform,
  TouchableOpacity } from 'react-native';
import _ from 'lodash';
import { func, shape } from 'prop-types';
import TimerMixin from 'react-timer-mixin';
import ReactMixin from 'react-mixin';
import { ToastActionsCreators } from 'react-native-redux-toast';
import Regex from '../../utilities/regex';
import Constants from '../../constants';
import { AuthStyles } from '../../styles';
import { Button, TextInput } from '../../components';

class Signup extends React.Component {
  static propTypes = {
    navigation: shape({
      dispatch: func.isRequired,
      goBack: func.isRequired,
      navigate: func.isRequired,
    }).isRequired,
  };

  state = {
    email: '',
    password: '',
  };

  emailRef = React.createRef();

  passwordRef = React.createRef();

  scrollViewRef = React.createRef();

  onSubmit = () => {
    Keyboard.dismiss();

    const {
      email, password,
    } = this.state;
    const {
      navigation: {
        dispatch, navigate,
      },
    } = this.props;
    const {
      enterEmail,
      enterValidEmail,
      enterPassword,
      invalidPassword,
    } = Constants.i18n.validations;

    if (_.isEmpty(email.trim())) {
      dispatch(ToastActionsCreators.displayInfo(enterEmail));

      return;
    }

    if (!Regex.validateEmail(email.trim())) {
      dispatch(ToastActionsCreators.displayInfo(enterValidEmail));

      return;
    }

    if (_.isEmpty(password.trim())) {
      dispatch(ToastActionsCreators.displayInfo(enterPassword));

      return;
    }

    if (!Regex.validatePassword(password.trim())) {
      dispatch(ToastActionsCreators.displayInfo(invalidPassword));

      return;
    }

    navigate('Success');
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
      email, password,
    } = this.state;
    const { navigation: { navigate } } = this.props;
    const {
      common: {
        emailAddress, password: passwordText, or,
      },
      signup: {
        alreadyUser, createAccount,
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
            <TextInput
              container={AuthStyles.signupTextInputContainer}
              ref={this.emailRef}
              value={email}
              placeholder={emailAddress}
              returnKeyType="next"
              onChangeText={(value) => this.setState({ email: value })}
              onFocus={() => {
                this.handleScrollView(findNodeHandle(this.emailRef.current));
              }}
              onBlur={() => {
                this.resetScrollView(findNodeHandle(this.emailRef.current));
              }}
              onSubmitEditing={() => this.passwordRef.current.focus()}
            />
            <TextInput
              ref={this.passwordRef}
              value={password}
              placeholder={passwordText}
              returnKeyType="done"
              secureTextEntry
              maxLength={16}
              onChangeText={(pass) => this.setState({ password: pass })}
              onFocus={() => {
                this.handleScrollView(findNodeHandle(this.passwordRef.current));
              }}
              onBlur={() => {
                this.resetScrollView(findNodeHandle(this.passwordRef.current));
              }}
              onSubmitEditing={this.onSubmit}
            />
            <Button
              onPress={this.onSubmit}
              style={AuthStyles.buttonStyle}
              title={createAccount}
            />
            <Text style={AuthStyles.sepratorStyle}>{or}</Text>
            <TouchableOpacity
              hitSlop={Constants.BaseStyle.HIT_SLOP}
              onPress={() => navigate('Login')}
              activeOpacity={0.9}
            >
              <Text style={AuthStyles.textDecorationLineStyle}>
                {alreadyUser}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}
ReactMixin(Signup.prototype, TimerMixin);

export default Signup;
