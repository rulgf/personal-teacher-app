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
    TouchableOpacity,
    BackHandler,
    ToastAndroid
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
import CollapsableMenu from '../../Components/CollapsableMenu.js';
import TabBar from '../../Components/TabBar.js';

import ParaTi from './Recomendations/ParaTi.js';
import Novedades from './Recomendations/Novedades.js';

import * as firebase from 'firebase';

const windowsize = Dimensions.get('window');

const MAX_HEADHEIGHT = 430;
const MIN_HEADHEIGHT = 118;

export default class Home extends Component {

    static navigationOptions = {
        title: 'Home'
    };

    constructor(props){
        super(props);

        this.state = {
            view: 0,
            contentHeight: MIN_HEADHEIGHT,
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        return true;
    }

    handleView(index){
        this.setState({view: index})
    }

    handleContentView(){
        if(this.state.contentHeight === MIN_HEADHEIGHT){
            this.setState({contentHeight: MAX_HEADHEIGHT - 70});
        }else{
            this.setState({contentHeight: MIN_HEADHEIGHT});
        }
    }

    render(){
        var view = <ParaTi/>;
        if(this.state.view === 0){
            view = <ParaTi/>;
        }else if(this.state.view === 1){
            view = <Novedades/>;
        }else if(this.state.view === 2){
            view = <ParaTi/>;
        }
        return(
            <View style={styles.container}>
                <ScrollView style={{marginTop: this.state.contentHeight}}>
                    {view}
                </ScrollView>
                <View style={styles.header}>
                    <CollapsableMenu resize={this.handleContentView.bind(this)}/>
                    <TabBar onPress={this.handleView.bind(this)}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff'
    },
    menu:{
        flex:0.3
    },
    content:{
        flex:0.7
    },
    header: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        overflow: 'hidden',
        minHeight: MAX_HEADHEIGHT,
        maxHeight: MAX_HEADHEIGHT,
        flex:1
    },
    viewSize: {
        marginTop: 60,
        flex: 1,
    }
});

/*
 <TabBar onPress={this.handleView.bind(this)}/>
 */