import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import StatusBarBackground from './StatusBarBackground.js';

export default class MainView extends Component {
    constructor() {
        super();

        console.ignoredYellowBox = [
            'Setting a timer'
        ];
    }

    render() {
        return (
            <View style={styles.mainView}>
                <LinearGradient colors={['#005CB8', '#0070CD', '#0081CB']} style={styles.linearGradient}>
                    <StatusBarBackground style={{backgroundColor:'powderblue'}}/>
                    {this.props.children}
                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    linearGradient: {
        flex: 1,
    },
});