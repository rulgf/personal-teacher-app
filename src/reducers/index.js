import { combineReducers } from 'redux';

import user from './user';
import nav from './nav';
import login from './login'

export default combineReducers({
  nav,
  login,
});
