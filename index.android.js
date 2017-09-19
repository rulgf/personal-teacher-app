/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
//Redux
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import  AppReducer  from './src/reducers';
import Services from './src/services'
//Firebase
import * as firebase from 'firebase';
//Navigation
import { RouteApp } from './src/config/routes.js';
//End imports--------------------------------------------


const config = {
    apiKey: "AIzaSyCcvJjwxPSxT5hmVrudmiYnu84k_0yIbQo",
    authDomain: "at-home-a4a3b.firebaseapp.com",
    databaseURL: "https://at-home-a4a3b.firebaseio.com",
    projectId: "at-home-a4a3b",
    storageBucket: "at-home-a4a3b.appspot.com",
    messagingSenderId: "91151052080"
};

const firebaseApp = firebase.initializeApp(config);
const store = createStore(AppReducer, Services);

const App = ({dispatch, nav}) => (
  <RouteApp
    navigation={addNavigationHelpers({
      dispatch,
      state: nav,
    })}
  />
)

const mapStateToProps = state =>({
  nav: state.nav,
});

const AppWithNavigation = connect(mapStateToProps)(App);

class AppMain extends Component{
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
