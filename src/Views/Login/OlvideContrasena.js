import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, ScrollView, Dimensions,Platform} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Hoshi } from 'react-native-textinput-effects';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import Button from 'apsl-react-native-button';
import { NavigationActions } from 'react-navigation'

import MainView from '../../components/MainView.js';
import BackHeader from '../../components/BackHeader.js';

const windowsize = Dimensions.get('window');

export default class OlvideContrasena extends Component{
    static navigationOptions = {
        title: 'Recuperar contraseña',
    };

    backAction(){
        const backAction = NavigationActions.back({});
        this.props.navigation.dispatch(backAction);
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
                        <Text style={styles.generalTxt}>¿Cuál es tu correo?</Text>
                        <Hoshi
                            label={'Correo Electrónico'}
                            labelStyle={{ color: 'white',backgroundColor: 'transparent',fontFamily: 'Champagne & Limousines', }}
                            inputStyle={{ color: 'white' }}
                            borderColor={'#fff'}
                            keyboard={'email-address'}
                            autoCapitalize={'none'}
                        />
                        <Text style={styles.generalTxt}>En unos breves momentos recibiras un email.</Text>
                        <View style={styles.loginBtn}>
                            <Button style={styles.loginBtnStyle} textStyle={{fontSize: 18,fontFamily: 'Champagne & Limousines',}}>
                                Recuperar Contraseña
                            </Button>
                        </View>
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
    formContainer: {
        flexGrow: 1,
        paddingLeft: 20,
        paddingRight: 20
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
});
