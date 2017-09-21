import {StyleSheet, Dimensions,Platform} from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';

const windowsize = Dimensions.get('window');

export const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        ...Platform.select({
            ios: { height: windowsize.height-30},
            android: { height: ExtraDimensions.get('REAL_WINDOW_HEIGHT') - ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT') - ExtraDimensions.get('STATUS_BAR_HEIGHT'), },
        }),
    },
    fbContainer:{
        alignItems: 'center',
        flexGrow: 1.2,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    fbLogo: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        maxHeight: 80,
        backgroundColor: 'transparent'
    },
    fbText: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingBottom:5,
    },
    logo: {
        flex: 1
    },
    formContainer: {
        flexGrow: 1,
        paddingLeft: 20,
        paddingRight: 20
    },
    registerContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 40,
        paddingRight: 40,
    },
    footContainer: {
        flexGrow: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
        flexWrap:'wrap'
    },
    footTxt:{
        fontSize: 10,
        fontFamily: 'Champagne & Limousines',
        color: '#fff',
        backgroundColor: 'transparent',
    },
    footTxtLink:{
        fontSize: 10,
        fontFamily: 'Champagne & Limousines',
        color: '#fff',
        backgroundColor: 'transparent',
        textDecorationLine: 'underline'
    },
    forget:{
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginTop: 15,
        marginBottom: 15
    },
    forgetTxt:{
        fontSize: 18,
        fontFamily: 'Champagne & Limousines',
        color: '#fff',
        backgroundColor: 'transparent',
        textDecorationLine: 'underline'
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
    },
    createTxt: {
        color: '#fff',
        backgroundColor: 'transparent'
    },
    whiteTxt: {
        fontSize: 18,
        fontFamily: 'Champagne & Limousines',
        color: '#fff',
        backgroundColor: 'transparent'
    },
    txtPad: {
        fontSize: 18,
        fontFamily: 'Champagne & Limousines',
        paddingBottom: 10,
        color: '#fff',
        backgroundColor: 'transparent'
    },
});
