import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    ScrollView,
    Dimensions,
    Platform,
    TextInput,
    TouchableOpacity,
    Picker
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Hoshi } from 'react-native-textinput-effects';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import Button from 'apsl-react-native-button';
import Icon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Switch from 'react-native-switch-pro';
import Autocomplete from 'react-native-autocomplete-input';

import MainView from '../../../Components/MainView.js';
import BackHeader from '../../../Components/BackHeader.js';
import MyText from '../../../Components/MyText.js';
import MenuPicker from '../../../Components/MenuPicker.js'

const arrowRightIcon = (<Icon name="ios-arrow-round-forward" size={30} color="#414242" />);
const windowsize = Dimensions.get('window');

export default class ParaQuien extends Component{
    constructor(props){
        super(props);

        this.state = {
            who: '',
            otherName: '',
            otherRelation: '',

            contentPicker: {},
            titlePicker: ''
        };
    }

    backAction(){
        this.props.closeModal();
        this.props.onChange(this.state.who);
    }

    /**
     * Funciones de Control de Estados
     */
    handlePickerOption(value){
        console.log(value);
        if(this.state.titlePicker === 'Guardados'){
            this.setState({who: value});
        }else{
            this.setState({otherRelation: value})
        }
    }

    closePicker(){
        this.setState({picker: false});
    }

    /**
     * Funciones Internas
     */
    getSavedUsers(){

    }


    render(){
        return(
            <MainView style={styles.modal}>
                <KeyboardAwareScrollView>
                    <View style={styles.container}>
                        <BackHeader onPress={() => this.backAction()}/>
                        <View style={styles.formContainer}>
                            <Text style={styles.generalTxt}>¿Para quién?</Text>
                            <View style={styles.input}>
                                <View style={styles.savedView}>
                                    <MyText size={20}>Selecciona un usuario de tu lista</MyText>
                                </View>
                                <TouchableOpacity style={{flex: 1, marginTop: 30, minHeight: 50}}>
                                    <View style={styles.selectBox}>
                                        <MyText>{this.state.who != '' ? this.state.who : 'Mis usuarios'}</MyText>
                                        <SimpleLineIcons name="arrow-down" size={20} color={'#fff'} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.formContainer}>
                            <Text style={styles.generalTxt}>Otro</Text>
                            <View style={styles.input}>
                                <View>
                                    <Hoshi
                                        label={'Nombre'}
                                        labelStyle={{ color: 'white',backgroundColor: 'transparent',fontFamily: 'Champagne & Limousines', }}
                                        inputStyle={{ color: 'white' }}
                                        borderColor={'#fff'}
                                        value={this.state.subject != '' ? this.state.otherName : null}
                                    />
                                </View>
                                <TouchableOpacity style={{flex: 1, marginTop: 30, minHeight: 50}}>
                                    <View style={styles.selectBox}>
                                        <MyText>{this.state.who != '' ? this.state.who : 'Parentezco'}</MyText>
                                        <SimpleLineIcons name="arrow-down" size={20} color={'#fff'} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.continueBtn}>
                            <Button
                                style={styles.loginBtnStyle}
                                textStyle={{fontSize: 18,fontFamily: 'Champagne & Limousines',}}
                            >
                                {arrowRightIcon}
                            </Button>
                        </View>
                    </View>
                    <MenuPicker
                        data={this.state.contentPicker}
                        title={this.state.titlePicker}
                        open={this.state.picker}
                        close={this.closePicker.bind(this)}
                        onOptionSelect={this.handlePickerOption.bind(this)}
                    />
                </KeyboardAwareScrollView>
            </MainView>
        );
    }
}

const styles = StyleSheet.create({
    modal: {},
    container: {
        flex: 1,
        ...Platform.select({
            ios: {height: windowsize.height - 30},
            android: {height: ExtraDimensions.get('REAL_WINDOW_HEIGHT') - ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT') - ExtraDimensions.get('STATUS_BAR_HEIGHT'),},
        }),
    },
    generalTxt: {
        fontSize: 24,
        fontFamily: 'Champagne & Limousines',
        color: '#fff',
        backgroundColor: 'transparent',
        paddingTop: 15,
    },
    formContainer: {
        flexGrow: 1,
        paddingLeft: 20,
        paddingRight: 20,
    },
    loginBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    loginBtnStyle: {
        backgroundColor: '#82f212',
        borderColor: '#82f212',
        width: 50
    },
    continueBtn: {
        flex: 1,
        paddingRight: 20,
        paddingLeft: 20,
        flexDirection: 'column',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
    },
    switch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
        paddingLeft: 15
    },
    input: {
        flex: 1
    },
    auto: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1
    },
    motiveView: {
        paddingTop: 10
    },
    motiveTxt: {
        backgroundColor: '#0081cb',
        borderColor: 'transparent',
        borderWidth: 0,
        marginTop: 5,
        borderRadius: 5,
        color: '#fff'
    },
    itemText: {
        fontSize: 15,
        margin: 2,
        fontFamily: 'Champagne & Limousines',
        fontSize: 18,
        backgroundColor: "#fff",
        padding: 10
    },
    autocompleteContainer: {
        flex: 1,
        borderWidth: 0,
        borderColor: 'transparent'
    },
    listContainerStyle: {
        flex: 1,
        zIndex: 99,
        minWidth: windowsize.width - 40,
        maxWidth: windowsize.width - 40,
        margin: 0
    },
    inputContainerStyle: {
        flex: 1,
        borderWidth: 0,
        borderColor: 'transparent'
    },
    picker: {
        borderBottomWidth: 2,
        borderBottomColor: '#b9c1ca',
    },
    savedView:{
        flex: 1,
        justifyContent: 'center',
        marginTop: 30,
        alignItems: 'center',
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        padding: 15
    },
    selectBox:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#0081cb',
        padding: 10,
        height: 50,
        borderRadius: 10
    }
});