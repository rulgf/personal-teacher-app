import * as firebase from 'firebase';

class Login {
  /*
   * Iniciar Sesión
  */
  static async handleLogin(email, password) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      return ({ success: 'User Logged' });
    } catch (error) {
      let errorTxt = ''; // Variable para guardar el texto del error traducido
      switch (error.code) {
        case 'auth/argument-error':
          errorTxt = 'Los datos ingresados no son validos o se encuentran vacios';
          break;
        case 'auth/invalid-email':
          errorTxt = 'El email ingresado no es válido';
          break;
        case 'auth/user-not-found':
          errorTxt = 'El email y/o la contraseña no coinciden con ningún registro';
          break;
        case 'auth/wrong-password':
          errorTxt = 'El email y/o la contraseña no coinciden con ningún registro';
          break;
        default:
          break;
      }
      return ({ error: errorTxt });
    }
  }

  /*
   * Cerrar Sesión
  */
  static async handleLogout() {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      // console.log('Logout Error:', error);
    }
  }
}

module.exports = Login;
