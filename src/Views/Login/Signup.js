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

const arrowRightIcon = (<Icon name="ios-arrow-round-forward" size={30} color="#414242" />);
const windowsize = Dimensions.get('window');

export default class Signup extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: null,
            lastnames: null,
            birthday: null,

            showDatePicker: false
        };
    };

    static navigationOptions = {
        title: 'Registro',
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
        if(this.state.name !=null && this.state.lastnames != null && this.state.birthday != null){
            //Validación de campos
            const { navigate } = this.props.navigation;
            navigate('SignupSession', {
                name: this.state.name,
                lastnames: this.state.lastnames,
                birthday: this.state.birthday
            });
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

    async openDatePicker(){
        if(Platform.OS === 'ios'){
            this.setState({showDatePicker: !this.state.showDatePicker});
        }else{
            try {
                var date = "";
                if(this.state.birthday != null){
                    date = this.state.birthday;
                }else{
                    date = new Date();
                }
                const {action, year, month, day} = await DatePickerAndroid.open({
                    // Use `new Date()` for current date.
                    date: date,
                    minDate: new Date(1940, 0, 1),
                    maxDate: new Date(),
                    mode: 'spinner'

                });
                if (action !== DatePickerAndroid.dismissedAction) {
                    // Selected year, month (0-11), day
                    this.setState({birthday: new Date(year, month, day)});
                }
            } catch (message) {
                console.log('Cannot open date picker Android', message);
            }
        }
    }

    /**
     * Funciones de control de estados
     */
    handleName(text){
        this.setState({name: text});
    }

    handleLastNames(text){
        this.setState({lastnames: text});
    }

    handleCloseDate(){
        this.setState({showDatePicker: false});
    }

    /**
     * Funciones Extras
     */
    formatDate(date) {
        if(date != null){
            var monthNames = [
                "Enero", "Febrero", "Marzo",
                "Abril", "Mayo", "Junio", "Julio",
                "Agosto", "Septiembre", "Octubre",
                "Noviembre", "Diciembre"
            ];

            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();

            return day + '/' + monthNames[monthIndex] + '/' + year;
        }else {
            return "";
        }
    }

    render(){
        const { navigate } = this.props.navigation;
        const backAction = NavigationActions.back({});

        var birthday = this.state.birthday;
        var birthdayStr = this.formatDate(birthday);
        if (birthday === null) {
            birthday = new Date()
        }
        var showDatePicker = this.state.showDatePicker ?
            <View style={styles.dateModalContainer}>
                <TouchableOpacity style={styles.dateModalView} onPress={() => this.handleCloseDate()}/>
                <View style={styles.datePickerView}>
                    <DatePickerIOS
                        style={{ height: 150 }}
                        date={birthday} onDateChange={(date)=>this.setState({birthday: date})}
                        mode="date"/>
                </View>
            </View> : <View />;
        return(
            <MainView>
                <KeyboardAwareScrollView>
                    <View style={styles.container}>
                        <BackHeader onPress={() => this.backAction()}/>
                        <View style={styles.formContainer}>
                            <Text style={styles.generalTxt}>Regístrate</Text>
                            <Hoshi
                                label={'Nombre'}
                                labelStyle={{ color: 'white',backgroundColor: 'transparent',fontFamily: 'Champagne & Limousines', }}
                                inputStyle={{ color: 'white' }}
                                borderColor={'#fff'}
                                onChangeText={this.handleName.bind(this)}
                            />
                            <Hoshi
                                label={'Apellidos'}
                                labelStyle={{ color: 'white',backgroundColor: 'transparent',fontFamily: 'Champagne & Limousines', }}
                                inputStyle={{ color: 'white' }}
                                borderColor={'#fff'}
                                onChangeText={this.handleLastNames.bind(this)}
                            />
                            <TouchableOpacity style={{flex:1, maxHeight: 70}}
                                              onPress={this.openDatePicker.bind(this)}>
                                <Hoshi
                                    label={'Fecha de cumpleaños'}
                                    labelStyle={{ color: 'white',backgroundColor: 'transparent',fontFamily: 'Champagne & Limousines', }}
                                    inputStyle={{ color: 'white' }}
                                    borderColor={'#fff'}
                                    value={birthdayStr}
                                    editable={false}
                                />
                            </TouchableOpacity>
                        </View>
                        {showDatePicker}
                        <View style={styles.continueBtn}>
                            <Button
                                onPress={this.handleNextScreen.bind(this)}
                                style={styles.loginBtnStyle}
                                textStyle={{fontSize: 18,fontFamily: 'Champagne & Limousines',}}
                            >
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
        flexGrow: 0.7,
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
    dateModalContainer: {
        position: 'absolute',
        ...Platform.select({
            ios: { height: windowsize.height},
            android: { height: ExtraDimensions.get('REAL_WINDOW_HEIGHT') - ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT') - ExtraDimensions.get('STATUS_BAR_HEIGHT'), },
        }),
        width: windowsize.width,
        backgroundColor: 'transparent'
    },
    dateModalView: {
        flex: 1,
        backgroundColor: 'rgba(68,62,68,0.6)'
    },
    datePickerView:{
        flex: 1,
        backgroundColor: '#fff',
        maxHeight: 280
    }
});
