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
    DatePickerAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Hoshi } from 'react-native-textinput-effects';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import Button from 'apsl-react-native-button';
import { NavigationActions } from 'react-navigation'
import SnackBar from 'react-native-snackbar-dialog';
import RNGooglePlaces from 'react-native-google-places';

import MainView from '../../components/MainView.js';
import BackHeader from '../../components/BackHeader.js';
import MyText from '../../components/MyText.js';
import MyButton from '../../components/MyButton.js';
import User from '../../Models/User.js';

import * as firebase from 'firebase';

const arrowRightIcon = (<Icon name="ios-arrow-round-forward" size={30} color="#414242" />);
const windowsize = Dimensions.get('window');

export default class SignupAddress extends Component{

    constructor(props){
        super(props);
        this.state = {
            address: null,
            latitude: null,
            longitude: null,

            name: this.props.navigation.state.params.name,
            lastnames: this.props.navigation.state.params.lastnames,
            birthday: this.props.navigation.state.params.birthday,
            email:this.props.navigation.state.params.email,
            password:this.props.navigation.state.params.password
        }
    };

    componentDidMount(){
        console.log(this.state.name);
    }

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
        if(this.state.address != null){
            //Validación de campos
            this.handleRegister();

        }else{
            SnackBar.show('Favor de ingresar una dirección', {
                backgroundColor: 'white',
                textColor: 'black',
                duration: 5000
            })
        }
    }

    /**
     * Funciones internas de la vista
     */

    openSearchModal() {
        RNGooglePlaces.openPlacePickerModal({
                country: 'MX'
        })
            .then((place) => {
                console.log(place);
                this.setState({
                    address: place.address,
                    latitude: place.latitude,
                    longitude: place.longitude
                });
            })
            .catch(error => console.log(error.message));  // error is a Javascript Error object
    }

    async handleRegister() {
        //Funcion para manejar el Registro del sistema
        try {
            var state = this.state;
            await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).
            then((user) => {
                User.setUserInfo(this.state.email, this.state.name,
                    this.state.lastnames, this.state.birthday.toString(),
                    this.state.address, this.state.longitude, this.state.latitude);
                const { navigate } = this.props.navigation;
                navigate('Signup');
            });

            console.log("Account created");

            //Crear el registro del nuevo usuario con la nueva información
            //let childRef = firebase.database().reference(withPath: "users");

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
                case "auth/weak-password":
                    errorTxt = "La contraseña ingresada es débil";
                    break;
                case "auth/email-already-in-use":
                    errorTxt = "El email ingresado ya esta en uso";
                    break;
                default:
                    errorTxt = "Hubo un error, favor de intentarlo más tarde";
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


    /**
     * Funciones Extras
     */


    /**
     * Funcion Render
     */
    render(){

        var add = null;

        if(this.state.address != null){
            add = this.state.address.substring(0, 27) + '...';
        }

        return(
            <MainView>
                <KeyboardAwareScrollView>
                    <View style={styles.container}>
                        <BackHeader onPress={() => this.backAction()}/>
                        <View style={styles.formContainer}>
                            <Text style={styles.generalTxt}>¿Y tu dirección?</Text>
                            <TouchableOpacity style={{flex:1, maxHeight: 70}}
                                              onPress={this.openSearchModal.bind(this)}>
                                <Hoshi
                                    label={'Dirección'}
                                    labelStyle={{ color: 'white',backgroundColor: 'transparent',fontFamily: 'Champagne & Limousines', }}
                                    inputStyle={{ color: 'white' }}
                                    borderColor={'#fff'}
                                    value={add}
                                    editable={false}
                                />
                            </TouchableOpacity>

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
        );
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
