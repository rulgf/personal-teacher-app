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

import MainView from '../../../Components/MainView.js';
import BackHeader from '../../../Components/BackHeader.js';
import MyText from '../../../Components/MyText.js';
import MyButton from '../../../Components/MyButton.js';
import User from '../../../Models/User.js';

import * as firebase from 'firebase';

const arrowRightIcon = (<Icon name="ios-arrow-round-forward" size={30} color="#414242" />);
const windowsize = Dimensions.get('window');

export default class Donde extends Component{

    constructor(props){
        super(props);
        this.state = {
            address: null,
            latitude: null,
            longitude: null,
            ext: null,
            int: null,

            newAddress: null,
            newLatitude: null,
            newLongitude: null,
            newExt: null,
            newInt: null,
        }
    };

    componentDidMount(){

    }

    /**
     * Funciones para controlar navegaciones
     */
    backAction(){
        this.props.closeModal();
    }

    handleNextScreen(){
        //Función para redirigir a la vista de crear cuenta

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

        var addNew = null;

        if(this.state.newAddress != null){
            addNew = this.state.newAddress.substring(0, 27) + '...';
        }

        return(
            <MainView>
                <KeyboardAwareScrollView>
                    <View style={styles.container}>
                        <BackHeader onPress={() => this.backAction()}/>
                        <View style={styles.formContainer}>
                            <Text style={styles.generalTxt}>¿Dónde?</Text>
                            <TouchableOpacity onPress={this.openSearchModal.bind(this)}>
                                <Hoshi
                                    label={'Dirección'}
                                    labelStyle={{ color: 'white',backgroundColor: 'transparent',fontFamily: 'Champagne & Limousines', }}
                                    inputStyle={{ color: 'white' }}
                                    borderColor={'#fff'}
                                    value={add}
                                    editable={false}
                                />
                            </TouchableOpacity>
                            <Hoshi
                                label={'Número Exterior'}
                                labelStyle={{ color: 'white',backgroundColor: 'transparent',fontFamily: 'Champagne & Limousines', }}
                                inputStyle={{ color: 'white' }}
                                borderColor={'#fff'}
                                value={this.state.int}
                                keyboardType={'numeric'}
                            />
                            <Hoshi
                                label={'Número Interior'}
                                labelStyle={{ color: 'white',backgroundColor: 'transparent',fontFamily: 'Champagne & Limousines', }}
                                inputStyle={{ color: 'white' }}
                                borderColor={'#fff'}
                                value={this.state.ext}
                                keyboardType={'numeric'}
                            />
                        </View>
                        <View style={styles.formContainer}>
                            <Text style={styles.generalTxt}>Otra Dirección</Text>
                            <TouchableOpacity onPress={this.openSearchModal.bind(this)}>
                                <Hoshi
                                    label={'Dirección'}
                                    labelStyle={{ color: 'white',backgroundColor: 'transparent',fontFamily: 'Champagne & Limousines', }}
                                    inputStyle={{ color: 'white' }}
                                    borderColor={'#fff'}
                                    value={addNew}
                                    editable={false}
                                />
                            </TouchableOpacity>
                            <Hoshi
                                label={'Número Exterior'}
                                labelStyle={{ color: 'white',backgroundColor: 'transparent',fontFamily: 'Champagne & Limousines', }}
                                inputStyle={{ color: 'white' }}
                                borderColor={'#fff'}
                                value={this.state.newExt}
                                keyboardType={'numeric'}
                            />
                            <Hoshi
                                label={'Número Interior'}
                                labelStyle={{ color: 'white',backgroundColor: 'transparent',fontFamily: 'Champagne & Limousines', }}
                                inputStyle={{ color: 'white' }}
                                borderColor={'#fff'}
                                value={this.state.newInt}
                                keyboardType={'numeric'}
                            />
                        </View>
                        <View style={styles.continueBtn}>
                            <Button
                                onPress={this.handleNextScreen.bind(this)}
                                style={styles.searchBtn}
                                textStyle={{fontSize: 18,fontFamily: 'Champagne & Limousines',}}>
                                <Text style={styles.btnTxt}>Iniciar Búsqueda</Text>
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
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20
    },
    continueBtn: {
        flex: 0.3,
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 0,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'flex-end',
    },
    searchBtn: {
        backgroundColor: '#82f212',
        borderColor: '#82f212',
        width: 150,
    },
    btnTxt:{
        fontSize: 18,
        fontFamily: 'Champagne & Limousines',
        color: 'black'
    }
});