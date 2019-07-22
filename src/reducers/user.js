import uniqBy from 'lodash/uniqBy';
import { LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  GET_MOVIES_SUCCESS,
  SET_AUTHENTICATION_TOKEN,
  SET_DEVICE_TOKEN,
  UPDATE_PROFILE } from '../actions/user-actions-types';

const initialState = {
  movies: [],
  token: '',
  userDetails: null,
};

export default function user(state = initialState, {
  payload, type,
}) {
  switch (type) {
    case GET_MOVIES_SUCCESS:
      return {
        ...state,
        movies: uniqBy([...state.movies, ...payload], 'id'),
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        userDetails: payload,
      };

    case UPDATE_PROFILE:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          ...payload,
        },
      };

    case SET_AUTHENTICATION_TOKEN:
      return {
        ...state,
        token: payload,
      };

    case SET_DEVICE_TOKEN:
      return {
        ...state,
        deviceToken: payload,
      };

    case LOGOUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
}
