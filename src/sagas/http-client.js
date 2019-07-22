import { call, select, put, delay } from 'redux-saga/effects';
import { ToastActionsCreators } from 'react-native-redux-toast';
import Idx from 'idx';
import { showLoader, hideLoader } from '../actions/app-action-types';
import { logoutSuccess, setAuthenticationToken } from '../actions/user-actions-types';
import axiosInstance from '../utilities/axios-instance';

function* HttpClient(payload, isLoader = true, authorization = true) {
  const networkStatus = yield select(({ network: { isConnected } }) => isConnected);

  if (!networkStatus) {
    yield put(ToastActionsCreators.displayInfo('Please make sure you\'re connected with internet.'));

    return {
      error: true,
      result: null,
    };
  }

  if (isLoader) {
    yield put(showLoader());
    yield delay(250);
  }
  const data = { ...payload };

  if (authorization) {
    const authToken = yield select(({ user: { token } }) => token);

    if (authToken) {
      data.headers = { 'x-authorization': authToken };
    } else {
      yield put(hideLoader());

      return {
        error: true,
        result: null,
      };
    }
  }

  try {
    const {
      data: result,
      headers: { 'x-authorization': authentication = '' },
    } = yield call(axiosInstance, data);

    yield put(hideLoader());

    if (authentication) {
      yield put(setAuthenticationToken(authentication));
    }

    return {
      error: null,
      result,
    };
  } catch (error) {
    yield put(hideLoader());
    if (Idx(error, (_) => _.code)) {
      if (error.code === 'ECONNABORTED') {
        const message = 'Please make sure you\'re connected with internet or our servers are not responding.';

        yield put(ToastActionsCreators.displayInfo(message));
      } else if (error.code === 401) {
        yield delay(250);
        yield put(logoutSuccess());
        yield put(ToastActionsCreators.displayInfo(error.message));
      } else {
        yield put(ToastActionsCreators.displayInfo(error.message));
      }
    }

    console.log('err----> ', error);

    return {
      error,
      result: null,
    };
  }
}

export default HttpClient;
