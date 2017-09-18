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
import { Hoshi } from 'react-native-textinput-effects';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import Button from 'apsl-react-native-button';
import Icon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';

import MainView from '../../../components/MainView.js';
import BackHeader from '../../../components/BackHeader.js';
import MyText from '../../../components/MyText.js';
import MenuPicker from '../../../components/MenuPicker.js'

const arrowRightIcon = (<Icon name="ios-arrow-round-forward" size={30} color="#414242" />);
const windowsize = Dimensions.get('window');

LocaleConfig.locales['es'] = {
    monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    monthNamesShort: ['Ene.','Feb.','Mar','Abr','Mayo','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
    dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
    dayNamesShort: ['D','L','M','M','J','V','S']
};

LocaleConfig.defaultLocale = 'es';

export default class Cuando extends Component{
    constructor(props){
        super(props);

        this.state = {
            selectedDate: null,
            dateString: null,
            hourMode: false
        };
    }

    backAction(){
        if(this.state.hourMode === true){
            this.setState({hourMode: false});
        }else{
            //Cambio de Modal
            this.props.closeModal();
        }
    }

    handleNext(){
        if(this.state.hourMode === false){
            this.setState({hourMode: true});
        }else{
            //Cambio de Modal
        }
    }

    componentDidMount(){
    }

    /**
     * Funciones de Control de Estados
     */
    handleSelectedDate(day){
        console.log(day);
        this.setState({
            selectedDate: {
                [day.dateString] : {selected: true, marked: true},
            },
            dateString: this.adaptDate(day.day, day.month, day.year)
        });
    }

    /**
     * Funciones Internas
     */
    adaptDate(day, month, year){
        var months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
            'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

        return (day + '/' + months[month-1] + '/' +year);
    }

    render(){
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';

        var todayDate= new Date();

        var modalContent;

        //Revisar En que modal se encuentra
        if(this.state.hourMode){
            //Segunda Modal de Hora
            modalContent =
                <View style={{flex: 3}}>
                    <View style={styles.headerView}>
                        <Text style={styles.generalTxt}>¿A qué hora?</Text>
                            <MyText size={16}>Tu servicio puede iniciar al menos dentro de una hora</MyText>
                    </View>
                    <View style={styles.hourView}>
                        <MyText>Horas deseadas</MyText>
                    </View>
                </View>;
        }else{
            //Primera modal de Fecha
            modalContent =
                <View style={{flex: 3}}>
                    <View style={styles.headerView}>
                        <Text style={styles.generalTxt}>¿Qué día será tu clase?</Text>
                        <View style={styles.selectedView}>
                            <MyText size={20}>
                                {this.state.dateString === null ? 'Selecciona la fecha para tu clase'
                                    : this.state.dateString}
                            </MyText>
                        </View>
                    </View>
                    <View style={styles.calendarView}>
                        <Calendar
                            //minDate={todayDate.getFullYear()+'-'+(todayDate.getMonth()+1)+'-'+todayDate.getDate()}
                            theme={{
                                    calendarBackground: 'transparent',
                                    textSectionTitleColor: '#fff',
                                    selectedDayBackgroundColor: '#0081cb',
                                    selectedDayTextColor: '#fff',
                                    todayTextColor: '#fff',
                                    dayTextColor: '#000',
                                    textDisabledColor: '#c8c8c8',
                                    dotColor: '#00adf5',
                                    selectedDotColor: '#ffffff',
                                    arrowColor: '#fff',
                                    monthTextColor: '#000',
                                    textDayFontFamily: 'Champagne & Limousines',
                                    textMonthFontFamily: 'Champagne & Limousines',
                                    textDayHeaderFontFamily: 'Champagne & Limousines',
                                    textDayFontSize: 14,
                                    textMonthFontSize: 18,
                                    textDayHeaderFontSize: 16
                                  }}
                            markedDates={this.state.selectedDate}
                            onDayPress={(day) => {this.handleSelectedDate(day)}}
                            renderArrow={(direction) => (direction === 'left'?
                                <SimpleLineIcons name="arrow-left" size={15} color={'#fff'} /> :
                                <SimpleLineIcons name="arrow-right" size={15} color={'#fff'} />
                                )}

                        />
                    </View>
                </View>;
        }
        return(
            <MainView style={styles.modal}>
                <KeyboardAwareScrollView>
                    <View style={styles.container}>
                        <BackHeader double={true} onPress={() => this.backAction()}/>
                        {modalContent}
                        <View style={styles.continueBtn}>
                            <Button
                                style={styles.loginBtnStyle}
                                textStyle={{fontSize: 18,fontFamily: 'Champagne & Limousines',}}
                                onPress={this.handleNext.bind(this)}
                            >
                                {arrowRightIcon}
                            </Button>
                        </View>
                    </View>
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
        justifyContent: 'space-between'
    },
    generalTxt: {
        fontSize: 24,
        fontFamily: 'Champagne & Limousines',
        color: '#fff',
        backgroundColor: 'transparent',
        paddingTop: 15,
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
    headerView:{
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15
    },
    calendarView:{
        flex: 3,
        marginTop: 10,
    },
    hourView:{
        flex: 2,
        marginTop: 10
    },
    selectedView:{
        flex: 1,
        height:40,
        backgroundColor: '#0081cb',
        borderRadius: 10,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
