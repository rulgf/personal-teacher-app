import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

export default class MyText extends Component{
    constructor(props){
        super(props);

        this.state = {
            fontsize: this.props.size || 18
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({fontsize: nextProps.size});
    }

    render(){
        var styles = StyleSheet.create({
            txt : {
                fontSize: this.state.fontsize,
                backgroundColor: 'transparent',
                fontFamily: 'Champagne & Limousines',
                color: 'white'
            }
        });

        return(
            <Text style={styles.txt}> {this.props.children} </Text>
        );
    }
}