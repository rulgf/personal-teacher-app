import { NavigationActions } from 'react-navigation';
import { RouteApp } from '../config/routes';
import {
  LOGOUT,
} from '../constants/actionTypes';

const initialState =
RouteApp.router.getStateForAction(NavigationActions.init());

export default(state= initialState, action) => {
  let nextState;
  console.log("Route: ", state);
  switch (action.type){
    case LOGOUT:
      nextState = RouteApp.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Home' }),
        state
      );
      break;
    default:
      nextState = RouteApp.router.getStateForAction(action, state);
      break;
  }
  return nextState || state;
};
