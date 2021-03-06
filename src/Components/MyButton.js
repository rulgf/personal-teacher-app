import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Button from 'apsl-react-native-button';

export default class MyButton extends Component{
    constructor(props){
        super(props);

        this.state = {
            disabled : this.props.disabled || false
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            disabled: nextProps.disabled
        });
    }

    render(){
        return (
            <Button
                style={styles.BtnStyle}
                textStyle={{fontSize: 18,fontFamily: 'Champagne & Limousines'}}
                onPress={this.props.onPress()}
                isDisabled={this.state.disabled}
            >
                {this.props.children}
            </Button>
        );
    }
}

const styles = StyleSheet.create({
    BtnStyle: {
        backgroundColor: '#94D500',
        borderColor: '#94D500',
    }
});