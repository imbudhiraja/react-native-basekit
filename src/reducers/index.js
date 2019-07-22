import { AsyncStorage } from 'react-native';
import { persistCombineReducers } from 'redux-persist';
import { toastReducer as toast } from 'react-native-redux-toast';
import { reducer as network } from 'react-native-offline';
import app from './app';
import nav from './nav';
import user from './user';

const config = {
  blacklist: ['app', 'nav', 'toast'],
  key: 'primary',
  storage: AsyncStorage,
};

const reducers = persistCombineReducers(config, {
  app,
  nav,
  network,
  toast,
  user,
});

export default reducers;
