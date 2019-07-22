import { NavigationActions, createStackNavigator } from 'react-navigation';
import { createReduxContainer,
  createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import React from 'react';
import { Alert, BackHandler, Platform } from 'react-native';
import { shape, string, number, func } from 'prop-types';
import routes from './routes';
import Constants from '../constants';

const stackNavigatorConfiguration = {
  headerBackTitle: 'Back',
  headerBackTitleStyle: {
    ...Constants.Fonts.large,
    fontWeight: '400',
  },
  headerBackTitleVisible: true,
  headerMode: Platform.OS === 'ios' ? 'float' : 'screen',
  headerTitleStyle: {
    flex: 1,
    fontFamily:
      Platform.OS === 'ios' ? 'SofiaPro-SemiBold' : 'sofia_pro_semiBold',
    textAlign: 'center',
  },
  headerTransitionPreset: 'fade-in-place',
  headerTruncatedBackTitle: 'back',
  mode: 'card',
  navigationOptions: { gesturesEnabled: false },
};

// Note: createReactNavigationReduxMiddleware must be run before createReduxContainer

export const routerMiddleware = createReactNavigationReduxMiddleware(
  (state) => state.nav
);

export const AppNavigator = createStackNavigator(
  routes,
  stackNavigatorConfiguration
);

const App = createReduxContainer(AppNavigator, 'root');

class navigator extends React.Component {
  static propTypes = {
    dispatch: func.isRequired,
    nav: shape({
      index: number,
      key: string.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const {
      nav, dispatch,
    } = this.props;

    if (nav.index === 0) {
      Alert.alert(
        'Exit Jumbea',
        'Are you sure you want exit the Jumbea application?',
        [
          {
            onPress: () => BackHandler.exitApp(),
            text: 'Yes',
          },
          {
            style: 'cancel',
            text: 'Cancel',
          },
        ],
        { cancelable: false }
      );
    }
    dispatch(NavigationActions.back());

    return true;
  };

  render() {
    const {
      nav, dispatch,
    } = this.props;

    return <App state={nav} dispatch={dispatch} />;
  }
}

const mapStateToProps = ({ nav }) => ({ nav });

export default connect(mapStateToProps)(navigator);
