import {
  LOGIN_SEND,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT
} from '../constants/actionTypes'

export function submitLogin(userCredentials){
  return {
    type: LOGIN_SEND,
    payload:{
      userName: userCredentials.userName,
      password: userCredentials.password
    }
  }
}

export function logout(){
  return {
    type: LOGOUT
  }
}

export function loginSuccess(userName){
  return {
    type: LOGIN_SUCCESS,
    activeUser: userName
  }
}

export function loginError(error){
   return {
     type: LOGIN_ERROR,
     logError: error
   }
 }
