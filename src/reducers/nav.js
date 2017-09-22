import { NavigationActions } from 'react-navigation';
import { RouteApp } from '../config/routes';
import { LOGOUT, LOGIN_SUCCESS } from '../constants/actionTypes';

const initialState = RouteApp.router.getStateForAction(NavigationActions.init());

export default(state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case LOGIN_SUCCESS:
      nextState = RouteApp.router.getStateForAction(NavigationActions.navigate({ routeName: 'Main' }), state);
      break;
    case LOGOUT:
      nextState = RouteApp.router.getStateForAction(NavigationActions.navigate({ routeName: 'Home' }), state);
      break;
    default:
      nextState = RouteApp.router.getStateForAction(action, state);
      break;
  }
  return nextState || state;
};
