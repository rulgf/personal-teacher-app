import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'

import user from './user';
import nav from './nav';
import login from './login'

export default combineReducers({
  nav,
  login,
  form: formReducer // <---- Mounted at 'form'
});
