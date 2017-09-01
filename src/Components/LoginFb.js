import React, { Component } from 'react'
import { Button, View, StyleSheet } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import SnackBar from 'react-native-snackbar-dialog';

import { LoginManager, AccessToken } from 'react-native-fbsdk';
import User from '../Models/User.js';

import * as firebase from 'firebase';

const FBSDK = require('react-native-fbsdk');
const {
    GraphRequest,
    GraphRequestManager,
    } = FBSDK;

export default class LoginFb extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: null,
            lastnames: null,
            email: null,
            birthday: null
        }
    }

    handleFacebookLogin () {
        LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_birthday']).then(
            (result) => {

                if (result.isCancelled) {
                    console.log('Login cancelled')
                } else {
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            //console.log(data);
                            console.log("lets try to sign in with provider");

                            var credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken.toString());
                            firebase.auth().signInWithCredential(credential).then((user) => {
                                console.log("Sign In Success", user);

                                console.log("Retrieving Data: ");
                                let accessToken = data.accessToken;
                                const responseInfoCallback = (error, result) => {
                                    if (error) {
                                        console.log('Error fetching data: ');
                                        console.log(error);
                                    } else {
                                        console.log('Success fetching data: ');
                                        console.log(result);
                                        User.setUserFbInfo(user.email, result.first_name, result.last_name, result.birthday, result.id)
                                    }
                                };

                                const infoRequest = new GraphRequest(
                                    '/me',
                                    {
                                        accessToken: accessToken,
                                        parameters: {
                                            fields: {
                                                string: 'email,name,first_name,middle_name,last_name,birthday'
                                            }
                                        }
                                    },
                                    responseInfoCallback
                                );

                                // Start the graph request.
                                new GraphRequestManager().addRequest(infoRequest).start()
                            }, function (error) {
                                console.log("Sign In Error", error);
                                var errorTxt = "";
                                switch (error.code){
                                    case 'auth/account-exists-with-different-credential':
                                        errorTxt = "El mail ligado a tu cuenta de Facebook ya esta registrado";
                                        break;
                                    default:
                                        errorTxt = "Hubo un problema favor de intentarlo más tarde"
                                }
                                SnackBar.show(errorTxt, {
                                    backgroundColor: 'white',
                                    textColor: 'black',
                                    duration: 5000
                                })

                            });
                        }
                    );
                }
            },
            function (error) {
                console.log('Login fail with error: ' + error)
            }
        )
    }
    render(){
        return(
            <View style={styles.fbLogo}>
                <FontAwesomeIcon
                    name="facebook-official"
                    size={30}
                    color="#fff"
                    onPress={this.handleFacebookLogin.bind(this)}
                />
            </View>
        );
    };

}

const styles = StyleSheet.create({
    fbLogo: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        maxHeight: 80,
        backgroundColor: 'transparent'
    }
});