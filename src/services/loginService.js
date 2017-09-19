import {
  LOGIN_SEND,
  LOGOUT
} from '../constants/actionTypes'

import  Login  from '../Models/Login';
import * as loginActions from '../actions/login';

const loginService = (store) => (next) => (action) => {
  next(action)
  console.log("Middleware ACTION catch: ", action.type);
  switch (action.type) {
    case LOGIN_SEND:
      var error = false;
      var errorTxt = ""
      Login.handleLogin(action.payload.userName, action.payload.password).then((result) => {
        if(result.error){
          return next(loginActions.loginError(result.error));
        }else{
          return next(loginActions.loginSuccess(action.payload.userName));
        }
      });
    case LOGOUT:
      Login.handleLogout();
    default:
      break;
  }
}

export default loginService;
