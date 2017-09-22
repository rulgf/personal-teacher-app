import {
  LOGIN_SEND,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  LOGIN_CHANGE,
} from '../constants/actionTypes';

export function submitLogin(userCredentials) {
  return {
    type: LOGIN_SEND,
    payload: {
      userName: userCredentials.userName,
      password: userCredentials.password,
    },
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function loginSuccess(userName) {
  return {
    type: LOGIN_SUCCESS,
    activeUser: userName,
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    logError: error,
  };
}

export function verifyAuth() {
  return {
    type: LOGIN_CHANGE,
  };
}
