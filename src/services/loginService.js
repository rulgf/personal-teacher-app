import {
  LOGIN_SEND,
  LOGIN_CHANGE,
  LOGOUT
} from '../constants/actionTypes'

import  Login  from '../Models/Login';
import * as loginActions from '../actions/login';

import * as firebase from 'firebase';

const loginService = (store) => (next) => (action) => {
  next(action)
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
      break;
    case LOGIN_CHANGE:
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                var providerId = user.providerData[0].providerId; //Obtengo el proveedor de la sesión
                if (providerId != "facebook.com") {
                  //Si no es de facebook iniciar sesión normal
                  next(loginActions.loginSuccess(user.email));
                } else {
                  //Si es sesión de facebok verificar si ya acepto su información
                  var userId = user.email.split('.').join('%2E');
                  var ref = firebase.database().ref('user/' + userId);
                  ref.once("value").then((snapshot) => {
                    var verified = snapshot.child("verified").val();
                    if (verified) {
                      next(loginActions.loginSuccess(user.email));
                    } else {
                      next(loginActions.logout());//CHANGE
                      /* Navigate to AfterFb Screen
                      navigate('AfterFb');
                      */
                    }
                  });
                }
            }
        });
        break;
    case LOGOUT:
      Login.handleLogout();
    default:
      break;
  }
}

export default loginService;
