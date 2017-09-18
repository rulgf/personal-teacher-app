import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    ScrollView,
    Dimensions,
    Platform
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Hoshi } from 'react-native-textinput-effects';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import Button from 'apsl-react-native-button';
import SnackBar from 'react-native-snackbar-dialog';

import MainView from '../../components/MainView.js';
import MyText from '../../components/MyText.js';
import MyButton from '../../components/MyButton.js';
import LoginFb from '../../components/LoginFb.js';

import * as firebase from 'firebase';

import ClassCard from '../../components/ClassCard.js';

export default class Messages extends Component {

    static navigationOptions = {
        title: 'Favoritos',
    };

    constructor(props){
        super(props);

        this.state = {
            messages: ["hola"]
        }
    }

    /**
     * Funciones de Navegación
     */
    handleNavigation(){

    }

    render(){
        if(this.state.messages.length === 0){
            return(
                <MainView>
                    <View style={styles.noContent}>
                        <View style={styles.noTitle}>
                            <MyText size={25}>No tienes conversaciones</MyText>
                        </View>
                        <View style={styles.noBody}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="ios-search" size={80} color={'#fff'}/>
                            </View>
                        </View>
                        <View style={styles.noButton}>
                            <MyText size={22}>Contrata tu primera clase</MyText>
                            <View style={styles.iniciaContainer}>
                                <MyButton onPress={() => this.handleNavigation.bind(this)}>Inicia tu búsqueda</MyButton>
                            </View>
                        </View>
                    </View>
                </MainView>
            );
        }else{
            return(
                <MainView>
                    <View style={styles.header}>
                        <MyText size={22}>Tus conversaciones</MyText>
                    </View>
                    <View style={styles.content}>
                        <ScrollView>

                        </ScrollView>
                    </View>
                </MainView>
            );
        }
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    header:{
        backgroundColor: 'transparent',
        paddingLeft: 15,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center'
    },
    content:{
        flex: 1,
        backgroundColor:'transparent'
    },
    //Estilos cuando no hay mensajes
    noContent:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        paddingLeft: 15,
        paddingRight: 15
    },
    noTitle:{
        paddingBottom: 50,
    },
    noBody:{
        paddingBottom: 50,
    },
    noButton:{
        alignContent: 'center',
        alignItems: 'center'
    },
    iconContainer:{
        width: 100,
        height: 100,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#fff',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iniciaContainer:{
        width: 150,
        marginTop: 20
    }
});
