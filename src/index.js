import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import NetInfo from '@react-native-community/netinfo';
import configureStore from './config/configure-store';
import Root from './root';
import Constants from './constants';
import './utilities/string-en';
import { Loader } from './components';

const {
  store, persistor,
} = configureStore();

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.White,
    flex: 1,
  },
});

class src extends React.Component {
  constructor(props) {
    super(props);
    this.init();
  }

  init = async () => {
    console.disableYellowBox = true; // eslint-disable-line
    this.handleNetwork();
  };

  handleNetwork = () => {
    function handleFirstConnectivityChange() {
      NetInfo.isConnected.removeEventListener('connectionChange', handleFirstConnectivityChange);
    }
    NetInfo.isConnected.addEventListener('connectionChange', handleFirstConnectivityChange);
    NetInfo.isConnected.fetch().then(() => {});
  };

  render() {
    return (
      <View style={styles.container}>
        <Provider store={store}>
          <PersistGate loading={<Loader />} persistor={persistor}>
            <Root />
          </PersistGate>
        </Provider>
      </View>
    );
  }
}

export default src;
