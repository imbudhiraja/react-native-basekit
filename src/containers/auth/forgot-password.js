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
import Regex from '../../utilities/regex';
import Constants from '../../constants';
import { AuthStyles } from '../../styles';
import { Button, TextInput } from '../../components';

class ForgotPassword extends React.Component {
  static propTypes = {
    navigation: shape({
      dispatch: func.isRequired,
      goBack: func.isRequired,
    }).isRequired,
  };

  state = { email: '' };

  emailRef = React.createRef();

  scrollViewRef = React.createRef();

  onSubmit = () => {
    Keyboard.dismiss();
    const { email } = this.state;
    const { navigation: { dispatch } } = this.props;
    const {
      enterEmail, enterValidEmail,
    } = Constants.i18n.validations;

    if (_.isEmpty(email.trim())) {
      dispatch(ToastActionsCreators.displayInfo(enterEmail));

      return;
    }

    if (!Regex.validateEmail(email.trim())) {
      dispatch(ToastActionsCreators.displayInfo(enterValidEmail));
    }

    // call restfull api
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
    const { email } = this.state;
    const {
      common: {
        emailAddress, forgotPass,
      },
      forgotPass: {
        desciption, sendLink,
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
            <Text style={AuthStyles.textStyle}>{forgotPass}</Text>
            <Text style={AuthStyles.description}>{desciption}</Text>
            <TextInput
              ref={this.emailRef}
              value={email}
              placeholder={emailAddress}
              returnKeyType="done"
              keyboardType="email-address"
              onChangeText={(name) => this.setState({ email: name })}
              onFocus={() => {
                this.handleScrollView(findNodeHandle(this.emailRef.current));
              }}
              onBlur={() => {
                this.resetScrollView(findNodeHandle(this.emailRef.current));
              }}
              onSubmitEditing={this.onSubmit}
            />
            <Button
              onPress={this.onSubmit}
              style={AuthStyles.buttonStyle}
              title={sendLink}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}
ReactMixin(ForgotPassword.prototype, TimerMixin);

export default ForgotPassword;
