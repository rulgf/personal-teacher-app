import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, ScrollView, Alert, TextInput} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Hoshi} from 'react-native-textinput-effects';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from 'apsl-react-native-button';
import SnackBar from 'react-native-snackbar-dialog';
//REDUX Form
import {Field} from 'redux-form';
//StyleSheet
import {loginStyles} from '../../styles/login/login'

import MainView from '../../components/MainView';
import MyText from '../../components/MyText';
import MyButton from '../../components/MyButton';
import LoginFb from '../../components/LoginFb';

import * as firebase from 'firebase';

const fbIcon = (<FontAwesomeIcon name="facebook-official" size={30} color="#fff"/>);

//Redux Form
const renderInput = ({ input: { onChange, ...restInput }, ...otherProps}) => {
  //return <TextInput style={styles.input} onChangeText={onChange} {...restInput}  />
  return <Hoshi
      labelStyle={{
        color: 'white',
        backgroundColor: 'transparent',
        fontFamily: 'Champagne & Limousines'
      }}
      inputStyle={{
        color: 'white'
      }}
      borderColor={'#fff'}
      onChangeText={onChange}
      {...restInput}
      {...otherProps}
    />
}

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null
    };
  };

  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps) {
    var logError = nextProps.user.logError
    if(logError != ''){
      this.showSnack(logError)
    }
  }

  /**
     * Funciones para controlar navegaciones
     */

  //Navegación a creación de cuenta
  handleCreate() {
    //Función para redirigir a la vista de crear cuenta
    const {navigate} = this.props.navigation;
    navigate('Signup');
  }
  /**
     * Funciones internas de la vista
     */

  //función para mostrar el Snack
  showSnack(message) {
    SnackBar.show(message, {
      backgroundColor: 'white',
      textColor: 'black',
      duration: 5000
    })
  }

  //Redux - form Submit
  login = (values) => {
    this.props.submitLogin({userName: values.email, password: values.password});
  }

  render() {
    const {navigate} = this.props.navigation;
    const {
      handleSubmit
    } = this.props;
    return (
      <MainView>
        <KeyboardAwareScrollView>
          <View style={loginStyles.container}>
            <View style={loginStyles.fbContainer}>
              <View style={loginStyles.fbText}>
                <MyText>Iniciar Sesión con Facebook</MyText>
              </View>
              <LoginFb/>
            </View>
            <View style={loginStyles.formContainer}>
              <Field
                name="email"
                component={renderInput}
                label={'Correo Electrónico'}
                keyboardType={'email-address'}
                autoCapitalize={'none'}
              />
              <Field
                name="password"
                component={renderInput}
                label={'Contraseña'}
                secureTextEntry={true}
                autoCapitalize={'none'}
              />
              <View style={loginStyles.forget}>
                <Text style={loginStyles.forgetTxt} onPress={() => navigate('OlvideContrasena')}>Olvide mi contraseña</Text>
              </View>
              <View style={loginStyles.loginBtn}>
                <MyButton onPress={() => handleSubmit(this.login)}>Iniciar</MyButton>
              </View>
            </View>
            <View style={loginStyles.registerContainer}>
              <Text style={loginStyles.txtPad}>¿Aún no estás registrado?</Text>
              <MyButton onPress={() => this.handleCreate.bind(this)}>Crear Cuenta</MyButton>
            </View>
            <View style={loginStyles.footContainer}>
              <Text style={loginStyles.footTxtLink} onPress={() => navigate('Terminos')}>TÉRMINOS Y CONDICIONES</Text>
              <Text style={loginStyles.footTxt}>
                Y
              </Text>
              <Text style={loginStyles.footTxtLink} onPress={() => navigate('Politicas')}>PÓLTITICA DE PRIVACIDAD</Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </MainView>
    )
  }
}
