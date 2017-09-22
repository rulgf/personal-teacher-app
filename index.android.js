/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
// Firebase
import * as firebase from 'firebase';
// Redux
import { Provider, connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import configureStore from './src/store/configureStore';
// Navigation
import { RouteApp } from './src/config/routes';
// End imports-------------------------------------------

const config = {
  apiKey: 'AIzaSyCcvJjwxPSxT5hmVrudmiYnu84k_0yIbQo',
  authDomain: 'at-home-a4a3b.firebaseapp.com',
  databaseURL: 'https://at-home-a4a3b.firebaseio.com',
  projectId: 'at-home-a4a3b',
  storageBucket: 'at-home-a4a3b.appspot.com',
  messagingSenderId: '91151052080',
};

const firebaseApp = firebase.initializeApp(config);
const store = configureStore();

const App = ({ dispatch, nav }) =>
  (<RouteApp navigation={addNavigationHelpers({ dispatch, state: nav })} />);

const mapStateToProps = state => ({ nav: state.nav });

const AppWithNavigation = connect(mapStateToProps)(App);

class AppMain extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigation />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('athome', () => AppMain);

export default App;
