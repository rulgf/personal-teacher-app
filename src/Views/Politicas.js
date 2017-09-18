import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, ScrollView, Dimensions,Platform} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import Button from 'apsl-react-native-button';
import { NavigationActions } from 'react-navigation'

import MainView from '../components/MainView.js';
import BackHeader from '../components/BackHeader.js';
import MyText from '../components/MyText.js'

const windowsize = Dimensions.get('window');

export default class Politicas extends Component{
    static navigationOptions = {
        title: 'Pólitica de Privacidad',
    };

    backAction(){
        const backAction = NavigationActions.back({});
        this.props.navigation.dispatch(backAction);
    }

    render(){
        return(
            <MainView>
                <View style={styles.container}>
                    <BackHeader color="#414242" onPress={() => this.backAction()}/>
                    <Text style={styles.txt} >Antes de iniciar</Text>
                    <View style={styles.info}>
                        <Text style={styles.txtInfo}>Póliticas de Privacidad</Text>
                        <Text style={styles.txtInfo}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                        Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
                        dis parturi- ent montes, nascetur ridiculus mus.
                        Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
                        Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec,
                        vulputate eget, arcu. In enim justo,</Text>
                    </View>
                </View>
            </MainView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAEAEA',
    },
    txt: {
        fontSize: 24,
        fontFamily: 'Champagne & Limousines',
        color: '#414242',
        backgroundColor: 'transparent',
        paddingLeft: 30,
    },
    info: {
        flex:1,
    },
    txtInfo: {
        fontSize: 20,
        fontFamily: 'Champagne & Limousines',
        color: '#414242',
        backgroundColor: 'transparent',
        paddingLeft: 50,
        paddingRight: 30,
        paddingTop: 15,
    }
});
