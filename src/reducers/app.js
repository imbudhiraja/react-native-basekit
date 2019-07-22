import { HIDE_LOADER, SHOW_LOADER } from '../actions/app-action-types';
import { LOGOUT_SUCCESS } from '../actions/user-actions-types';

const initialState = { visible: false };

export default function app(state = initialState, { type }) {
  switch (type) {
    case HIDE_LOADER:
      return { visible: false };

    case SHOW_LOADER:
      return { visible: true };

    case LOGOUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
}
