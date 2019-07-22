import Idx from 'idx';
import { NavigationActions, StackActions } from 'react-navigation';
import { REHYDRATE } from 'redux-persist';
import { AppNavigator } from '../config/navigator';
import { GO_BACK, RESET_NAVIGATOR } from '../actions/nav-action-types';
import { LOGOUT_SUCCESS } from '../actions/user-actions-types';

const initialRoute = 'Loader';
const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams(initialRoute)
);

export default function nav(state = initialState, action) {
  const {
    payload, type,
  } = action;

  let firstState = 'Welcome';
  const firstStateData = {};

  if (Idx(payload, (_) => _.user.userDetails)) {
    firstState = 'Dashboard';
  }

  switch (type) {
    case RESET_NAVIGATOR:
      return AppNavigator.router.getStateForAction(
        StackActions.reset({
          actions: [
            NavigationActions.navigate({
              params: payload.data ? payload.data : {},
              routeName: payload.route,
            }),
          ],
          index: 0,
        }),
        state
      );

    case GO_BACK:
      return AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );

    case LOGOUT_SUCCESS:
      return AppNavigator.router.getStateForAction(
        StackActions.reset({
          actions: [NavigationActions.navigate({ routeName: 'Welcome' })],
          index: 0,
        }),
        state
      );

    case REHYDRATE:
      return AppNavigator.router.getStateForAction(
        StackActions.reset({
          actions: [
            NavigationActions.navigate({
              params: firstStateData,
              routeName: firstState,
            }),
          ],
          index: 0,
        }),
        state
      );

    default:
      return AppNavigator.router.getStateForAction(action, state);
  }
}
