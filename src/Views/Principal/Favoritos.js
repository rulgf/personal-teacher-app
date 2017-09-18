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

export default class Favoritos extends Component {

    static navigationOptions = {
        title: 'Favoritos',
    };

    constructor(props){
        super(props);

        this.state = {
            favoritos: []
        }
    }

    /**
     * Funciones de Navegación
     */
    handleNavigation(){

    }

    render(){
        if(this.state.favoritos.length === 0){
            return(
                <MainView>
                    <View style={styles.noContent}>
                        <View style={styles.noTitle}>
                            <MyText size={25}>Aún no tienes</MyText>
                            <MyText size={25}>materias de tú interes</MyText>
                        </View>
                        <View style={styles.noBody}>
                            <MyText size={16}>Si ves alguna materia que te gusté,</MyText>
                            <MyText size={16}>pulsa en el icono del corazón para guardarla</MyText>
                        </View>
                        <View style={styles.noButton}>
                            <MyButton onPress={() => this.handleNavigation.bind(this)}>Comienza tu búsqueda</MyButton>
                        </View>
                    </View>
                </MainView>
            );
        }else{
            return(
                <View style={styles.container}>
                    <View style={styles.header}>
                        <MyText size={18}>Mis Favoritos</MyText>
                    </View>
                    <View style={styles.content}>
                        <ScrollView>
                            <ClassCard
                                title={'Lectura Rápida'}
                                description={'Aprenderas a leer de una manera rápida entendiendo perfectamente. ¡Contrata Ya!'}
                                image={'lectura.jpg'}
                            />
                            <ClassCard
                                title={'Inglés'}
                                description={'Domina el Ingles y expande tus fronteras'}
                                image={'english.jpg'}
                            />
                        </ScrollView>
                    </View>
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    header:{
        backgroundColor: '#005CB8',
        paddingLeft: 15,
        paddingTop: 10,
        paddingBottom: 10
    },
    content:{
        flex: 1,
        backgroundColor:'#fff'
    },
    noContent:{
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15
    },
    noTitle:{
        paddingBottom: 20,
    },
    noBody:{
        paddingBottom: 50,
    },
    noButton:{

    }
});
