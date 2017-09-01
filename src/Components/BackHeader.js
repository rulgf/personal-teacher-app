import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Button from 'apsl-react-native-button';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default class BackHeader extends Component{
    constructor(props){
        super(props);

        this.state = {
            color: this.props.color || "#fff",
            disabled: false,
            double: this.props.double ? this.props.double : false
        }
    }


    backFunction(){
        if(this.state.double){
            this.props.onPress();
        }else{
            this.setState({disabled: true}, function(){
                this.props.onPress();
            });
        }

    }

    render(){
        const arrowIcon = (<Icon name="arrow-left" size={30} color={this.state.color} />);
        return (
            <Button isDisabled={this.state.disabled} style={styles.returnBtn} onPress={this.backFunction.bind(this)} >{arrowIcon}</Button>
        );
    }
}

const styles = StyleSheet.create({
    returnBtn: {
        width: 50,
        borderWidth: 0,
        backgroundColor: 'transparent',
    },
});