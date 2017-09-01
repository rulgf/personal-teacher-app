import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    Image,
    TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MyText from './MyText.js';

import * as firebase from 'firebase';

export default class Conversation extends Component{
    constructor(props){
        super(props);

        this.state = {
            title: this.props.title,
            unread: this.props.unread,
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles}>

                </View>
                <View>

                </View>
                <View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#0081cb',
        borderRadius: 5,
    },
    nameContainer:{

    }
});