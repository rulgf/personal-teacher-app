import {
  LOGIN_SUCCESS,
  LOGIN_ERROR
}from '../constants/actionTypes';

let cloneObject = function(obj) {
  return JSON.parse(JSON.stringify(obj))
}

let newState =
{
  user:{
    loggedIn: false
  }
};

export default function (state, action){
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log("Login Success...");
      newState = cloneObject(state);
      newState.user.loggedIn = true;
      newState.user.activeUser = action.activeUser;
      return newState;
    case LOGIN_ERROR:
      console.log("Login Failed..");
      newState = cloneObject(state);
      newState.user.loggedIn = false;
      newState.user.logError = action.logError;
      return newState;
    default:
      return state || newState;
  }
}
