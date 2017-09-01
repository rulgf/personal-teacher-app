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
import Switch from 'react-native-switch-pro';
import Autocomplete from 'react-native-autocomplete-input';

import MainView from '../../../Components/MainView.js';
import BackHeader from '../../../Components/BackHeader.js';
import MyText from '../../../Components/MyText.js';
import MenuPicker from '../../../Components/MenuPicker.js'

const arrowRightIcon = (<Icon name="ios-arrow-round-forward" size={30} color="#414242" />);
const windowsize = Dimensions.get('window');

export default class Clase extends Component{

    constructor(props){
        super(props)

        this.state = {
            motivo:'',
            bilingue: false,

            subject: '',
            age: '',
            level: '',

            picker: false,
            contentPicker: [],
            titlePicker: ''
        }
    }

    backAction(){
        this.props.onChange(this.state.subject, this.state.level, this.state.age, this.state.picker);
        this.props.closeModal();
    }

    /**
     * Funciones del Componente MenuPicker
     */

    openNivelPicker(){
        this.setState({
            contentPicker: ['Primaria', 'Secundaria', 'Preparatoria', 'Profesional'],
            titlePicker: 'Nivel Escolar'
        },function(){
            this.setState({picker: true})
        });
    }

    openAgePicker(){
        this.setState({
            contentPicker: ['1', '2', '3', '4', '5', '6'],
            titlePicker: 'Año Escolar'
        },function(){
            this.setState({picker: true})
        });
    }

    closePicker(){
        this.setState({picker: false})
    }

    /**
     * Funciones para la control de estados
     */
    handleBilingue(value){
        console.log(value);
        this.setState({bilingue: value});
    }

    handlePickerOption(value){
        console.log(value);
        if(this.state.titlePicker === 'Nivel Escolar'){
            this.setState({level: value});
        }else{
            this.setState({age: value})
        }
    }

    /**
     * Funciones para realizar la búsqueda necesaria en los textos
     */

    findsubject(selectedSubject) {
        if (selectedSubject === '') {
            return [];
        }

        //CAMBIAR subjects A LAS DE LA BASE DE DATOS CON LAS MATERIAS DISPONIBLES
        const subjects  = [
            {
                "title": "Matemáticas",
            },
            {
                "title": "Español",
            },
            {
                "title": "Química",
            },
            {
                "title": "Física",
            },
            {
                "title": "Inglés",
            },
            {
                "title": "Historia",
            }
        ];
        const regex = new RegExp(`${selectedSubject.trim()}`, 'i');
        return subjects.filter(subject => subject.title.search(regex) >= 0);
    }

    render(){

        const { subject } = this.state;
        const subjects = this.findsubject(subject);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

        return(
            <MainView style={styles.modal}>
                <KeyboardAwareScrollView>
                    <View style={styles.container}>
                        <BackHeader onPress={() => this.backAction()}/>
                        <View style={styles.formContainer}>
                            <Text style={styles.generalTxt}>¿Qué clase necesitas?</Text>
                            <View style={styles.input}>
                                <View style={styles.auto}>
                                    <Autocomplete
                                        containerStyle={styles.autocompleteContainer}
                                        listContainerStyle={styles.listContainerStyle}
                                        listStyle={styles.listContainerStyle}
                                        inputContainerStyle={styles.inputContainerStyle}
                                        data={subjects.length === 1 && comp(subject, subjects[0].title) ? [] : subjects}
                                        defaultValue={subject}
                                        renderTextInput={()=> (
                                            <Hoshi
                                                label={'Materia'}
                                                labelStyle={{ color: 'white',backgroundColor: 'transparent',fontFamily: 'Champagne & Limousines', }}
                                                inputStyle={{ color: 'white' }}
                                                borderColor={'#fff'}
                                                onChangeText={text => this.setState({ subject: text })}
                                                value={this.state.subject != '' ? this.state.subject : null}
                                            />
                                        )}
                                        renderItem={({ title}) => (
                                            <TouchableOpacity onPress={() => this.setState({ subject: title })}>
                                              <Text style={styles.itemText}>
                                                {title}
                                              </Text>
                                            </TouchableOpacity>
                                          )}
                                    />
                                </View>
                            </View>
                            <View style={[styles.input, styles.picker]}>
                                <TouchableOpacity style={{flex:1, maxHeight: 70}}
                                                  onPress={this.openNivelPicker.bind(this)}>
                                    <Hoshi
                                        label={'Nivel Escolar'}
                                        labelStyle={{ color: 'white',backgroundColor: 'transparent',fontFamily: 'Champagne & Limousines', }}
                                        inputStyle={{ color: 'white' }}
                                        borderColor={'#fff'}
                                        editable={false}
                                        value={this.state.level}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.input}>
                                <TouchableOpacity style={{flex:1, maxHeight: 70}}
                                                  onPress={this.openAgePicker.bind(this)}>
                                    <Hoshi
                                        label={'Año Escolar'}
                                        labelStyle={{ color: 'white',backgroundColor: 'transparent',fontFamily: 'Champagne & Limousines', }}
                                        inputStyle={{ color: 'white' }}
                                        borderColor={'#fff'}
                                        editable={false}
                                        value={this.state.age}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.switch}>
                                <MyText size={18}>Bilingüe</MyText>
                                <Switch
                                    onSyncPress={this.handleBilingue.bind(this)}
                                    value={this.state.bilingue}
                                />
                            </View>
                            <View style={styles.motiveView}>
                                <MyText size={18}>Motivo de tu clase</MyText>
                                <TextInput
                                    style={styles.motiveTxt}
                                    multiline={true}
                                    placeholder="Ej. Tengo examen, necesito regulación, me interesa mejorar en esta materia."
                                    onChangeText={(text) => this.setState({motivo: text})}
                                    numberOfLines = {4}
                                    value={this.state.motivo}
                                />
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
        )
    }
}

const styles = StyleSheet.create({
    modal: {

    },
    container: {
        flex: 1,
        ...Platform.select({
            ios: { height: windowsize.height-30},
            android: { height: ExtraDimensions.get('REAL_WINDOW_HEIGHT') - ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT') - ExtraDimensions.get('STATUS_BAR_HEIGHT'), },
        }),
    },
    generalTxt:{
        fontSize: 20,
        fontFamily: 'Champagne & Limousines',
        color: '#fff',
        backgroundColor: 'transparent',
        paddingTop: 15,
    },
    formContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20
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
    switch:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
        paddingLeft: 15
    },
    input:{
        height: 64
    },
    auto:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1
    },
    motiveView:{
        paddingTop: 10
    },
    motiveTxt:{
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
        fontSize : 18,
        backgroundColor: "#fff",
        padding: 10
    },
    autocompleteContainer: {
        flex: 1,
        borderWidth:0,
        borderColor: 'transparent'
    },
    listContainerStyle:{
        flex: 1,
        zIndex: 99,
        minWidth: windowsize.width - 40,
        maxWidth: windowsize.width - 40,
        margin: 0
    },
    inputContainerStyle:{
        flex: 1,
        borderWidth:0,
        borderColor: 'transparent'
    },
    picker:{
        borderBottomWidth: 2,
        borderBottomColor: '#b9c1ca',
    }
});