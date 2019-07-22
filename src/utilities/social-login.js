import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { ToastActionsCreators } from 'react-native-redux-toast';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { showLoader, hideLoader } from '../actions/app-action-types';
import Connection from '../config/connection';

export const checkInternetConnectivity = () => new Promise((resolve, reject) => {
  NetInfo.isConnected.fetch().then((isConnected) => {
    if (isConnected) {
      resolve(isConnected);
    } else {
      reject(new Error('no internet'));
    }
  });
});

GoogleSignin.configure({
  forceConsentPrompt: true,
  hostedDomain: '',
  iosClientId: '',
  offlineAccess: true,
  scopes: [
    'profile',
    'email',
  ],
  webClientId: '',
});

export const googleSignin = async (dispatch, isConnect = false) => {
  try {
    dispatch(showLoader());
    await GoogleSignin.signOut();
    await GoogleSignin.hasPlayServices();
    const res = await GoogleSignin.signIn();
    const { accessToken } = await GoogleSignin.getTokens();

    const requestUrl = await `${Connection.getBaseUrl()}/api/v1/users/google-oauth-login?code=${res.serverAuthCode}`;
    const isCoon = await checkInternetConnectivity();

    let result;

    if (isCoon) {
      // to update refresh token
      result = await axios.get(requestUrl);
    } else {
      ToastActionsCreators.displayInfo('Please make sure you\'re connected with internet.');

      return;
    }

    let request;

    if (result.status && result.status === 200) {
      const {
        data: {
          payload: {
            accessToken: token, expiryDate, refreshToken,
          },
        },
      } = result;

      request = {
        email: res.user.email,
        googleAuth: {
          accessToken: token,
          expiry: expiryDate || 0,
          refreshToken,
        },
        googleId: res.user.id,
        name: res.user.name,
        photo: res.user.photo,
      };
    } else {
      request = {
        email: res.user.email,
        googleAuth: {
          accessToken,
          expiry: res.accessTokenExpirationDate || 0,
          refreshToken: res.serverAuthCode,
        },
        googleId: res.user.id,
        name: res.user.name,
        photo: res.user.photo,
      };
    }
    if (isConnect) {
      delete request.name;
      delete request.photo;
    }

    // call your server api here
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('google login err---> ', error);
    dispatch(hideLoader());
    if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      dispatch(ToastActionsCreators.displayInfo('Google Play Service not available.'));
    }
  }
};

export const facebookSignin = async (dispatch, isConnect = false) => {
  try {
    LoginManager.logOut();
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      dispatch(hideLoader());
    } else {
      dispatch(showLoader());
      const data = await AccessToken.getCurrentAccessToken();
      const parameters = {
        accessToken: data.accessToken,
        parameters: { fields: { string: 'email,name,picture.height(500).width(500),id' } },
      };
      const infoRequest = new GraphRequest('/me', parameters, (error, res) => {
        if (error) {
          dispatch(ToastActionsCreators.displayInfo('Something went wrong. Please try later.'));

          return;
        }
        if (res) {
          if (res.email) {
            const request = {
              email: res.email,
              fbAuth: {
                accessToken: data.accessToken,
                expiry: data.dataAccessExpirationTime,
                refreshToken: 'string',
              },
              fbId: res.id,
              name: res.name,
              photo: res.picture.data.url,
            };

            if (isConnect) {
              delete request.name;
              delete request.photo;
            }

            // call your server api here
          } else {
            dispatch(ToastActionsCreators.displayInfo('Please share your email address to continue'));
          }
        }
      });

      new GraphRequestManager().addRequest(infoRequest).start();
    }
  } catch (e) {
    dispatch(hideLoader());
    dispatch(ToastActionsCreators.displayInfo('Please try later'));
  }
};

export const logoutSocialAccount = () => new Promise((resolve, reject) => {
  GoogleSignin.signOut()
    .then(() => {
      LoginManager.logOut();
      resolve(true);
    })
    .catch(() => {
      LoginManager.logOut();
      reject(new Error('Failed to logout'));
    });
});
