import { NavigationActions } from 'react-navigation';
import { RouteApp } from '../config/routes';

const initialState =
RouteApp.router.getStateForAction(NavigationActions.init());

export default(state= initialState, action) => {
  const nextState = RouteApp.router.getStateForAction(action, state);
  return nextState || state;
};
