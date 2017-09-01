import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, ScrollView, Dimensions,Platform, Alert} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Hoshi } from 'react-native-textinput-effects';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import Button from 'apsl-react-native-button';
import SnackBar from 'react-native-snackbar-dialog';

import MainView from '../../Components/MainView.js';
import MyText from '../../Components/MyText.js';
import MyButton from '../../Components/MyButton.js';
import LoginFb from '../../Components/LoginFb.js';

import * as firebase from 'firebase';

const fbIcon = (<FontAwesomeIcon name="facebook-official" size={30} color="#fff" />)
const windowsize = Dimensions.get('window');

export default class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            email: null,
            password: null
        };
    };

    static navigationOptions = {
        title: 'Inicio de Sesión',
    };

    componentDidMount(){
        /**
         * Listener de sesión
         */
        let listener = firebase.auth().onAuthStateChanged((user) => {
            //Si el usuario existe proseguir
            if (user) {
                const { navigate } = this.props.navigation;
                var providerId = user.providerData[0].providerId; //Obtengo el proveedor de la sesión
                if(providerId != "facebook.com"){
                    //Si no es de facebook iniciar sesión normal
                    navigate('Main');
                }else{
                    //Si es sesión de facebok verificar si ya acepto su información
                    var  userId = user.email.split('.').join('%2E');
                    var ref = firebase.database().ref('user/'+userId);
                    ref.once("value").then((snapshot) => {
                        var verified = snapshot.child("verified").val();
                        this.handleSession(verified);
                    });
                }
            }
        })
    }

    /**
     * Funciones para controlar navegaciones
     */

    //Navegación a creación de cuenta
    handleCreate(){
        //Función para redirigir a la vista de crear cuenta
        const { navigate } = this.props.navigation;
        navigate('Signup');
    }

    //Navegación en case de sesión de facebook
    handleSession(isVerified){
        const { navigate } = this.props.navigation;
        if(isVerified){
            navigate('Main');
        }else{
            navigate('AfterFb');
        }
    }

    /**
     * Funciones internas de la vista
     */

    //Función para verificar email y contraseña con firebase
    async handleLogin() {
        try {
            await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
        } catch (error) {
            console.log(error);
            var errorTxt = ""; //Variable para guardar el texto del error traducido

            switch (error.code){
                case "auth/argument-error":
                    errorTxt = "Los datos ingresados no son validos o se encuentran vacios";
                    break;
                case "auth/invalid-email":
                    errorTxt = "El email ingresado no es válido";
                    break;
                case "auth/user-not-found":
                    errorTxt = "El email y/o la contraseña no coinciden con ningún registro";
                    break;
                case "auth/wrong-password":
                    errorTxt = "El email y/o la contraseña no coinciden con ningún registro";
                    break;
            }
            SnackBar.show(errorTxt, {
                backgroundColor: 'white',
                textColor: 'black',
                duration: 5000
            })

        }

    }

    /**
     * Funciones de control de estados
     */
    //Controlador del input Email
    handleEmail(text){
        this.setState({email: text});
    }

    //Controlador del input password
    handlePassword(text){
        this.setState({password: text});
    }

    render(){
        const { navigate } = this.props.navigation;
        return(
            <MainView>
                <KeyboardAwareScrollView>
                    <View style={styles.container}>
                        <View style={styles.fbContainer}>
                            <View style={styles.fbText}>
                                <MyText>Iniciar Sesión con Facebook</MyText>
                            </View>
                            <LoginFb/>
                        </View>
                        <View style={styles.formContainer}>
                            <Hoshi
                                label={'Correo Electrónico'}
                                labelStyle={{ color: 'white',backgroundColor: 'transparent',fontFamily: 'Champagne & Limousines', }}
                                inputStyle={{ color: 'white' }}
                                borderColor={'#fff'}
                                keyboard={'email-address'}
                                onChangeText={this.handleEmail.bind(this)}
                                keyboard={'email-address'}
                                autoCapitalize={'none'}
                            />

                            <Hoshi
                                label={'Contraseña'}
                                labelStyle={{ color: 'white',backgroundColor: 'transparent',fontFamily: 'Champagne & Limousines', }}
                                inputStyle={{ color: 'white' }}
                                borderColor={'#fff'}
                                password={true}
                                onChangeText={this.handlePassword.bind(this)}
                                password={true}
                            />
                            <View style={styles.forget}>
                                <Text style={styles.forgetTxt} onPress={() => navigate('OlvideContrasena')}>Olvide mi contraseña</Text>
                            </View>
                            <View style={styles.loginBtn}>
                                <MyButton onPress={() => this.handleLogin.bind(this)}>Iniciar</MyButton>
                            </View>
                        </View>
                        <View style={styles.registerContainer}>
                            <Text style={styles.txtPad}>¿Aún no estás registrado?</Text>
                            <MyButton onPress={() => this.handleCreate.bind(this)}>Crear Cuenta</MyButton>
                        </View>
                        <View style={styles.footContainer}>
                            <Text style={styles.footTxtLink} onPress={() => navigate('Terminos')} >TÉRMINOS Y CONDICIONES</Text>
                            <Text style={styles.footTxt}> Y </Text>
                            <Text style={styles.footTxtLink} onPress={() => navigate('Politicas')} >PÓLTITICA DE PRIVACIDAD</Text>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </MainView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...Platform.select({
            ios: { height: windowsize.height-30},
            android: { height: ExtraDimensions.get('REAL_WINDOW_HEIGHT') - ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT') - ExtraDimensions.get('STATUS_BAR_HEIGHT'), },
        }),
    },
    fbContainer:{
        alignItems: 'center',
        flexGrow: 1.2,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    fbLogo: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        maxHeight: 80,
        backgroundColor: 'transparent'
    },
    fbText: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingBottom:5,
    },
    logo: {
        flex: 1
    },
    formContainer: {
        flexGrow: 1,
        paddingLeft: 20,
        paddingRight: 20
    },
    registerContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 40,
        paddingRight: 40,
    },
    footContainer: {
        flexGrow: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
        flexWrap:'wrap'
    },
    footTxt:{
        fontSize: 10,
        fontFamily: 'Champagne & Limousines',
        color: '#fff',
        backgroundColor: 'transparent',
    },
    footTxtLink:{
        fontSize: 10,
        fontFamily: 'Champagne & Limousines',
        color: '#fff',
        backgroundColor: 'transparent',
        textDecorationLine: 'underline'
    },
    forget:{
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginTop: 15,
        marginBottom: 15
    },
    forgetTxt:{
        fontSize: 18,
        fontFamily: 'Champagne & Limousines',
        color: '#fff',
        backgroundColor: 'transparent',
        textDecorationLine: 'underline'
    },
    loginBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    loginBtnStyle: {
        backgroundColor: '#82f212',
        borderColor: '#82f212',
    },
    createTxt: {
        color: '#fff',
        backgroundColor: 'transparent'
    },
    whiteTxt: {
        fontSize: 18,
        fontFamily: 'Champagne & Limousines',
        color: '#fff',
        backgroundColor: 'transparent'
    },
    txtPad: {
        fontSize: 18,
        fontFamily: 'Champagne & Limousines',
        paddingBottom: 10,
        color: '#fff',
        backgroundColor: 'transparent'
    },
});