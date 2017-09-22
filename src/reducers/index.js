import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { firebaseStateReducer } from 'react-redux-firebase';

// import user from './user';
import nav from './nav';
import login from './login';

export default combineReducers({
  nav,
  login,
  form: formReducer,
  firebase: firebaseStateReducer,
});
