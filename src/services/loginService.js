import * as firebase from 'firebase';

import { LOGIN_SEND, LOGIN_CHANGE, LOGOUT } from '../constants/actionTypes';
import Login from '../Models/Login';
import * as loginActions from '../actions/login';

const loginService = store => next => (action) => {
  next(action);
  switch (action.type) {
    case LOGIN_SEND:
      Login.handleLogin(action.payload.userName, action.payload.password).then((result) => {
        if (result.error) {
          return next(loginActions.loginError(result.error));
        }
        return next(loginActions.loginSuccess(action.payload.userName));
      });
      break;
    case LOGIN_CHANGE:
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const providerId = user.providerData[0].providerId; // Obtengo el proveedor de la sesión
          if (providerId !== 'facebook.com') {
            // Si no es de facebook iniciar sesión normal
            next(loginActions.loginSuccess(user.email));
          } else {
            // Si es sesión de facebok verificar si ya acepto su información
            const userId = user.email.split('.').join('%2E');
            const ref = firebase.database().ref(`user/${userId}`);
            ref.once('value').then((snapshot) => {
              const verified = snapshot.child('verified').val();
              if (verified) {
                next(loginActions.loginSuccess(user.email));
              }/* else {
                next(loginActions.logout()); // CHANGE
                 Navigate to AfterFb Screen
                      navigate('AfterFb');

              } */
            });
          }
        }
      });
      break;
    case LOGOUT:
      Login.handleLogout();
      break;
    default:
      break;
  }
};

export default loginService;
