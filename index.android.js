/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

//Firebase
import * as firebase from 'firebase';

import RouteApp from './src/config/routes.js';


const config = {
    apiKey: "AIzaSyCcvJjwxPSxT5hmVrudmiYnu84k_0yIbQo",
    authDomain: "at-home-a4a3b.firebaseapp.com",
    databaseURL: "https://at-home-a4a3b.firebaseio.com",
    projectId: "at-home-a4a3b",
    storageBucket: "at-home-a4a3b.appspot.com",
    messagingSenderId: "91151052080"
};

const firebaseApp = firebase.initializeApp(config);

AppRegistry.registerComponent('athome', () => RouteApp);
