import { createStore } from 'redux';
import AppReducer from '../reducers';
import Services from '../services';

import * as loginActions from '../actions/login';

export default function configureStore() {
  const store = createStore(AppReducer, Services);

  store.dispatch(loginActions.verifyAuth());

  return store;
}
