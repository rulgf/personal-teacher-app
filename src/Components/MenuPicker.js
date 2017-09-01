import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Animated,
    Dimensions,
    Modal,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MyText from './MyText.js';

const windowsize = Dimensions.get('window');

export default class MenuPicker extends Component {
    constructor(props){
        super(props);

        this.state= {
            open: this.props.open,
            title: this.props.title,

            data: this.props.data
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            open: nextProps.open,
            data: nextProps.data,
            title: nextProps.title
        })
    }

    closePicker(){
        this.props.close()
    }

    handlePress(currentIndex){
        this.props.onOptionSelect(currentIndex);
        this.closePicker();
    }

    render(){

        if(this.state.open){
            var options = [];
            var data = this.state.data;

            for (var i = 0; i < data.length; i++){
                let currentIndex = i;
                options.push(
                    <TouchableOpacity key={i} onPress={() => this.handlePress(data[currentIndex])}>
                        <View style={styles.optionView}>
                            <Text style={styles.option}>{data[i]}</Text>
                        </View>
                    </TouchableOpacity>
                );
            }
            return(
                <View style={styles.menuContainer}>
                    <TouchableOpacity style={styles.modalView} onPress={this.closePicker.bind(this)}>
                        <View style={styles.menuContent}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>{this.state.title}</Text>
                            </View>
                            <ScrollView style={styles.scrollContainer}>
                                <View style={styles.optionsContainer}>
                                    {options}
                                </View>
                            </ScrollView>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }else{
            return  null;
        }
    }
}

const styles = StyleSheet.create({
    menuContainer:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: { height: windowsize.height},
            android: { height: ExtraDimensions.get('REAL_WINDOW_HEIGHT') - ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT') - ExtraDimensions.get('STATUS_BAR_HEIGHT'), },
        }),
        width: windowsize.width,
        backgroundColor: 'transparent'
    },
    modalView:{
        flex:1,
        backgroundColor: 'rgba(68,62,68,0.6)',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    menuContent:{
        backgroundColor: '#fff',
        width: 280,
        minHeight: 300,
        maxHeight: 350
    },
    titleContainer:{
        flex:0.1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 8
    },
    title:{
        fontFamily: 'Champagne & Limousines',
        fontSize: 20,
        color: 'black',
        backgroundColor: 'transparent',
        marginTop: 5
    },
    scrollContainer:{
        flex: 0.9,
        backgroundColor: 'transparent',
    },
    optionsContainer:{
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignContent: 'center'
    },
    cancelContainer:{
        flex: 0.2,
        backgroundColor: 'transparent'
    },
    optionView:{
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        maxHeight: 40,
        minHeight: 40,
        borderRadius: 5,
        backgroundColor: '#0081cb',
        padding: 10,
        margin: 10

    },
    option:{
        fontFamily: 'Champagne & Limousines',
        fontSize: 18,
        color: 'black',
        backgroundColor: 'transparent',
    },
})