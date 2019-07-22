import React from 'react';
import { bool } from 'prop-types';
import NoInternet from '../common/no-internet';

const WithNetworkStatus = (WrappedComponent) => {
  class WithNetworkOfflineHOC extends React.Component {
    static navigationOptions = WrappedComponent.navigationOptions || {};
    static propTypes = { isConnected: bool.isRequired };

    render() {
      const { isConnected } = this.props;

      return <React.Fragment>{isConnected ? <WrappedComponent {...this.props} /> : <NoInternet />}</React.Fragment>;
    }
  }

  return WithNetworkOfflineHOC;
};

export default WithNetworkStatus;
