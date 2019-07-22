import { createAction } from 'redux-actions';

export const GO_BACK = 'GO_BACK';
export const goBack = createAction(GO_BACK);

export const RESET_NAVIGATOR = 'RESET_NAVIGATOR';
export const resetNavigator = createAction(RESET_NAVIGATOR);
