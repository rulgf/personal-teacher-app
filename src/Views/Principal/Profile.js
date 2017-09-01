import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    ScrollView,
    Dimensions,
    Platform,
    Alert,
    TouchableOpacity
} from 'react-native';
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

import Auth from '../../Models/Auth.js';

import * as firebase from 'firebase';

export default class Profile extends Component {

    static navigationOptions = {
        title: 'Perfil'
    };

    constructor(props){
        super(props);

        this.state = {
            name: '',
            photo: null,

            user: {}
        }
    }

    componentWillMount(){
        this.getCurrentuser();
    }

    getCurrentuser(){
        Auth.getCurrentUser().then((result) => {
            this.setState({
                user: result,
                name: result.name + ' ' + result.lastnames
            })
        });
    }

    async handleLogout(){
        try {
            await firebase.auth().signOut();
            const { navigate } = this.props.navigation;
            navigate('Home');
        } catch (error) {
            console.log(error);
        }
    }

    render(){
        return(
            <MainView>
                <View style={styles.headerContent}>
                    <View style={styles.nameView}>
                        <MyText size={20}>{this.state.name}</MyText>
                        <TouchableOpacity>
                            <MyText size={16}>Editar tu foto del perfil</MyText>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.photoView}>
                        <MyText>Photo</MyText>
                    </View>
                </View>
                <ScrollView style={styles.optionsContent}>
                    <TouchableOpacity>
                        <View style={styles.optionView}>
                            <MyText size={18}>Invita a un amigo</MyText>
                            <FontAwesomeIcon name="circle-thin" size={26} color='#fff'/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.optionView}>
                            <MyText size={18}>Mis Clases</MyText>
                            <FontAwesomeIcon name="circle-thin" size={26} color='#fff'/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.optionView}>
                            <MyText size={18}>Ajustes</MyText>
                            <FontAwesomeIcon name="circle-thin" size={26} color='#fff'/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.optionView}>
                            <MyText size={18}>Danos tu opinión</MyText>
                            <FontAwesomeIcon name="circle-thin" size={26} color='#fff'/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.optionView}>
                            <MyText size={18}>Ayuda</MyText>
                            <FontAwesomeIcon name="circle-thin" size={26} color='#fff'/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.handleLogout.bind(this)}>
                        <View style={styles.optionView}>
                            <MyText size={18}>Cerrar Sesión</MyText>
                            <FontAwesomeIcon name="circle-thin" size={26} color='#fff'/>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </MainView>
        );
    }
}
const styles = StyleSheet.create({
    headerContent:{
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    nameView:{
        padding: 20,
        flex: 1,
        justifyContent: 'center'
    },
    photoView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionsContent:{
        flex: 0.8,
        padding: 15
    },
    optionView:{
        flex: 1,
        height: 50,
        backgroundColor: '#0081cb',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        marginTop: 15
    }
});