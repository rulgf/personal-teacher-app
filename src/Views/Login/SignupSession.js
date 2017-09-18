import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    ScrollView,
    Dimensions,
    Platform,
    TouchableOpacity,
    DatePickerAndroid,
    DatePickerIOS
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Hoshi } from 'react-native-textinput-effects';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import Button from 'apsl-react-native-button';
import { NavigationActions } from 'react-navigation'
import SnackBar from 'react-native-snackbar-dialog';

import MainView from '../../components/MainView.js';
import BackHeader from '../../components/BackHeader.js';
import MyText from '../../components/MyText.js';
import MyButton from '../../components/MyButton.js';

import * as firebase from 'firebase';

const arrowRightIcon = (<Icon name="ios-arrow-round-forward" size={30} color="#414242" />)
const windowsize = Dimensions.get('window');

export default class SignupSession extends Component{

    constructor(props){
        super(props);
        this.state = {
            email: null,
            password: null,
            rptpassword: null,

            name: this.props.navigation.state.params.name,
            lastnames: this.props.navigation.state.params.lastnames,
            birthday: this.props.navigation.state.params.birthday,
        };
    };

    static navigationOptions = {
        title: 'Registro Email',
    };

    /**
     * Funciones para controlar navegaciones
     */
    backAction(){
        const backAction = NavigationActions.back({});
        this.props.navigation.dispatch(backAction);
    }

    handleNextScreen(){
        //Función para redirigir a la vista de crear cuenta
        if(this.state.email != null && this.state.password != null && this.state.rptpassword != null){
            //Validación de campos
            var password = this.state.password;
            if(password.length >= 6){
                if(this.validatePasswords(this.state.password, this.state.rptpassword)){
                    //Validacion de datos
                    if (this.checkEmail(this.state.email)){
                        //Validación del mail en la base de datos
                        const { navigate } = this.props.navigation;
                        navigate('SignupAddress', {
                            name: this.state.name,
                            lastnames: this.state.lastnames,
                            birthday: this.state.birthday,
                            email: this.state.email,
                            password: this.state.password,
                        });
                    }
                }else{
                    SnackBar.show('Las contraseñas no coinciden', {
                        backgroundColor: 'white',
                        textColor: 'black',
                        duration: 5000
                    })
                }
            }else{
                SnackBar.show('La contraseña debe ser al menos de 6 carácteres', {
                    backgroundColor: 'white',
                    textColor: 'black',
                    duration: 5000
                })
            }
        }else{
            SnackBar.show('Uno o más campos se encuentran vaciós', {
                backgroundColor: 'white',
                textColor: 'black',
                duration: 5000
            })
        }
    }

    /**
     * Funciones internas de la vista
     */

    async handleRegister() {
        //Funcion para manejar el Registro del sistema
        try {
            await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);

            console.log("Logged In!");

            // Navigate to the Home page

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
    handleEmail(text){
        this.setState({email: text});
    }

    handlePassword(text){
        this.setState({password: text});
    }

    handleRptPassword(text){
        this.setState({rptpassword: text});
    }

    /**
     * Funciones Extras
     */
    //Validación de Contraseñas idénticas
    validatePasswords(password, repeat){
        return password === repeat;
    }

    //Revisar email en Firebase
    async checkEmail(email){
        try {
            await firebase.auth().fetchProvidersForEmail(email);
            return true

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
                case "auth/wrong-password":
                    errorTxt = "El email y/o la contraseña no coinciden con ningún registro";
                    break;
            }
            SnackBar.show(errorTxt, {
                backgroundColor: 'white',
                textColor: 'black',
                duration: 5000
            })
            return false;
        }
    }


    render(){
        const { navigate } = this.props.navigation;
        const backAction = NavigationActions.back({});

        return(
            <MainView>
                <KeyboardAwareScrollView>
                    <View style={styles.container}>
                        <BackHeader onPress={() => this.backAction()}/>
                        <View style={styles.formContainer}>
                            <Text style={styles.generalTxt}>¿Tu correo es?</Text>


                            <Hoshi
                                label={'Correo Electrónico'}
                                labelStyle={{ color: 'white',backgroundColor: 'transparent',fontFamily: 'Champagne & Limousines', }}
                                inputStyle={{ color: 'white' }}
                                borderColor={'#fff'}
                                keyboard={'email-address'}
                                autoCapitalize={'none'}
                                onChangeText={this.handleEmail.bind(this)}
                            />
                            <Hoshi
                                label={'Contraseña'}
                                labelStyle={{ color: 'white',backgroundColor: 'transparent',fontFamily: 'Champagne & Limousines', }}
                                inputStyle={{ color: 'white' }}
                                borderColor={'#fff'}
                                password={true}
                                onChangeText={this.handlePassword.bind(this)}
                            />
                            <Hoshi
                                label={'Repetir Contraseña'}
                                labelStyle={{ color: 'white',backgroundColor: 'transparent',fontFamily: 'Champagne & Limousines', }}
                                inputStyle={{ color: 'white' }}
                                borderColor={'#fff'}
                                password={true}
                                onChangeText={this.handleRptPassword.bind(this)}
                            />
                        </View>
                        <View style={styles.continueBtn}>
                            <Button
                                onPress={this.handleNextScreen.bind(this)}
                                style={styles.loginBtnStyle}
                                textStyle={{fontSize: 18,fontFamily: 'Champagne & Limousines',}}>
                                {arrowRightIcon}
                            </Button>
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
    generalTxt:{
        fontSize: 20,
        fontFamily: 'Champagne & Limousines',
        color: '#fff',
        backgroundColor: 'transparent',
        paddingTop: 15,
    },
    returnBtn: {
        width: 50,
        borderWidth: 0,
        backgroundColor: 'transparent',
    },
    formContainer: {
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20
    },
    continueBtn: {
        flex: 1,
        paddingRight: 20,
        paddingLeft: 20,
        flexDirection: 'column',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
    },
    loginBtnStyle: {
        backgroundColor: '#82f212',
        borderColor: '#82f212',
        width: 50,
    },
});
