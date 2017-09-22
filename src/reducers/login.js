import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from '../constants/actionTypes';

const cloneObject = function (obj) {
  return JSON.parse(JSON.stringify(obj));
};

let newState = {
  user: {
    loggedIn: false,
    activeUser: '',
    logError: '',
  },
};

export default function (state, action) {
  console.log("Dispatching Action: ", action.type);
  switch (action.type) {
    case LOGIN_SUCCESS:
      newState = cloneObject(state);
      newState.user.loggedIn = true;
      newState.user.activeUser = action.activeUser;
      newState.user.logError = '';
      return newState;
    case LOGIN_ERROR:
      newState = cloneObject(state);
      newState.user.loggedIn = false;
      newState.user.activeUser = '';
      newState.user.logError = action.logError;
      return newState;
    case LOGOUT:
      newState = cloneObject(state);
      newState.user.loggedIn = false;
      newState.user.activeUser = '';
      newState.user.logError = '';
      return newState;
    default:
      newState = cloneObject(state || newState);
      newState.user.logError = '';
      return newState;
  }
}
