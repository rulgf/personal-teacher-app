import React, { Component } from 'react';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';

//Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

//Import screens:
import Login from '../Views/Login/Login.js';
import Terminos from '../Views/TerminosyCondiciones.js';
import Politicas from '../Views/Politicas.js';
import OlvideContrasena from '../Views/Login/OlvideContrasena.js';
import Signup from '../Views/Login/Signup.js';
import SignupSession from '../Views/Login/SignupSession.js';
import SignupAddress from '../Views/Login/SignupAddress.js';
import AfterFb from '../Views/Login/AfterFb.js';
import Home from '../Views/Principal/Home.js';
import Favoritos from '../Views/Principal/Favoritos.js';
import Profile from '../Views/Principal/Profile.js';
import Messages from '../Views/Principal/Messages.js';

const MainRoute = TabNavigator({
        Busqueda: {
                screen: Home,
                navigationOptions: {
                        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-search-outline" size={26} color={tintColor}/>
                }
        },
        Favoritos: {
                screen: Favoritos,
                navigationOptions: {
                        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-heart-outline" size={26} color={tintColor}/>
                }
        },
        Mensajes:{
            screen: Messages,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Ionicons name="ios-text" size={26} color={tintColor}/>
            }
        },
        Perfil:{
                screen: Profile,
                navigationOptions: {
                        tabBarIcon: ({ tintColor }) => <Ionicons name="md-person" size={26} color={tintColor}/>
                }
        }/*
        Clases:{

        }
        */
},
    {
        tabBarPosition: 'bottom',
        swipeEnabled: false,
            tabBarOptions: {
                    showIcon: true,
                    showLabel: false,
                    activeTintColor: '#94D500',
                    inactiveTintColor: '#443e43',
                    style: {
                            backgroundColor: '#EAEAEA'
                    },
                    indicatorStyle: {
                            backgroundColor: 'transparent',
                    }
            }
    });

const Recomendations = TabNavigator({
        Parati: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: 'Para ti',
            }
        },
        Novedades: {
            screen: Favoritos,
            navigationOptions: {
                tabBarLabel: 'Novedades',
            }
        },/*
         Promociones:{

         }*/
    },
    {
        swipeEnabled: true,
        tabBarOptions: {
            showIcon: false,
            showLabel: true,
            activeTintColor: '#fff',
            inactiveTintColor: '#fff',
            style: {
                backgroundColor: '#005CB8'
            },
            indicatorStyle: {
                backgroundColor: '#94D500',
            }
        }
    });

const RouteApp = StackNavigator({
            Home: { screen: Login },
            Terminos: { screen: Terminos },
            Politicas: { screen: Politicas },
            OlvideContrasena: { screen: OlvideContrasena },
            Signup: { screen: Signup },
            SignupSession: { screen : SignupSession},
            SignupAddress: {screen: SignupAddress},
            Main: {screen: MainRoute},
            AfterFb: {screen: AfterFb}

    },
    { headerMode: 'none' }
);

const navigateOnce = (getStateForAction) => (action, state) => {
    const {type, routeName} = action;
    return (
        state &&
        type === NavigationActions.NAVIGATE &&
        routeName === state.routes[state.routes.length - 1].routeName
    ) ? null : getStateForAction(action, state);
    // you might want to replace 'null' with 'state' if you're using redux (see comments below)
};

RouteApp.router.getStateForAction = navigateOnce(RouteApp.router.getStateForAction);

export default RouteApp;