import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Animated,
    BackAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MyText from './MyText.js';

import StatusBarBackground from './StatusBarBackground.js';

export default class TabBar extends Component {
    constructor(props){
        super(props);
        this.state={
            index: 0
        };
    }

    handleIndexParati(){
        this.setState({index: 0});
        this.props.onPress(0);
    }

    handleIndexNovedades(){
        this.setState({index: 1});
        this.props.onPress(1);
    }

    handleIndexPromociones(){
        this.setState({index: 2});
        this.props.onPress(2);
    }

    render(){
        return(
            <View style={styles.tabBarView}>
                <TouchableOpacity onPress={this.handleIndexParati.bind(this)}>
                    <View style={[styles.tabView, this.state.index === 0 ? styles.activeTab : null]}>
                        <MyText size={16}>Para ti</MyText>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.handleIndexNovedades.bind(this)}>
                    <View style={[styles.tabView, this.state.index === 1 ? styles.activeTab : null]}>
                        <MyText size={16}>Novedades</MyText>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.handleIndexPromociones.bind(this)}>
                    <View style={[styles.tabView, this.state.index === 2 ? styles.activeTab : null]}>
                        <MyText size={16}>Promociones</MyText>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabBarView: {
        flex:1,
        backgroundColor: "#005CB8",
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        minHeight: 60,
        maxHeight: 60,
    },
    tabView:{
        flex:1,
        padding: 12,
        backgroundColor: "transparent",
        justifyContent: 'center',
    },
    activeTab: {
        borderBottomColor: '#94D500',
        borderBottomWidth: 2,
    }

});