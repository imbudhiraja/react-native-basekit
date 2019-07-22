import { all, fork } from 'redux-saga/effects';
import { networkSaga } from 'react-native-offline';
import user from './user';

const sagas = function* sagas() {
  yield all([fork(networkSaga, { pingInterval: 20000 }), user()]);
};

export default sagas;
