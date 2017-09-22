import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyText from './MyText';

/*
 Importación de modales
 */
import Clase from '../Views/Principal/Search/Clase';
import ParaQuien from '../Views/Principal/Search/ParaQuien';
import Cuando from '../Views/Principal/Search/Cuando';
import Donde from '../Views/Principal/Search/Donde';

export default class CollapsableMenu extends Component {
  constructor(props) {
    super(props);

    this.icons = {
      up: <Icon name="arrow-up" size={30} color={'#fff'} onPress={this.toogle.bind(this)} />,
      down: <Icon name="arrow-down" size={30} color={'#fff'} onPress={this.toogle.bind(this)} />,
    };

    this.state = {
      expanded: false,
      animation: new Animated.Value(60),

      modal: '',
      modalVisible: false,

      // Estados de despliegue
      claseText: '',
      paraQuienText: '',
      cuandoText: '',
      dondeText: '',

      // Estados para la búsqueda final
      subject: '',
      level: '',
      age: '',
      language: null,

      name: '',

      day: null,
      initialHour: null,
      finalHour: null,

      address: null,
      ext: null,
      int: null,
    };
  }

  // Funciones para cambio de estados
  handleClass(subject, level, age, language) {
    this.setState({ subject, level, age, language, claseText: subject });
  }

  handleName(name) {
    this.setState({ name, paraQuienText: name });
  }

  handleDate(day, initial, final) {
    this.setState({ day, initialHour: initial, finalHour: final, cuandoText: day });
  }

  handleAddress(address, ext, int) {
    this.setState({ address, ext, int, dondeText: address });
  }

  toogle() {
    // Step 1
    const initialValue = this.state.expanded
      ? 310
      : 58;
    const finalValue = this.state.expanded
      ? 58
      : 310;

    this.setState({
      expanded: !this.state.expanded, // Step 2
    });

    this.props.resize();

    this.state.animation.setValue(initialValue); // Step 3
    Animated.spring( // Step 4
      this.state.animation, { toValue: finalValue }).start();
  }

  handleOpenModal(modal) {
    if (modal === 'clase') {
      this.setState({
        modal: 'clase',
      }, function () {
        this.setState({ modalVisible: true });
      });
    } else if (modal === 'paraQuien') {
      this.setState({
        modal: 'paraQuien',
      }, function () {
        this.setState({ modalVisible: true });
      });
    } else if (modal === 'cuando') {
      this.setState({
        modal: 'cuando',
      }, function () {
        this.setState({ modalVisible: true });
      });
    } else if (modal === 'donde') {
      this.setState({
        modal: 'donde',
      }, function () {
        this.setState({ modalVisible: true });
      });
    }
  }

  handleCloseModal() {
    this.setState({ modalVisible: false });
  }

  render() {
    let icon = this.icons.down;

    if (this.state.expanded) {
      icon = this.icons.up;
    }

    let modalView = null;

    if (this.state.modal === 'clase') {
      modalView = <Clase closeModal={this.handleCloseModal.bind(this)} onChange={this.handleClass.bind(this)} />;
    } else if (this.state.modal === 'paraQuien') {
      modalView = <ParaQuien closeModal={this.handleCloseModal.bind(this)} onChange={this.handleName.bind(this)} />;
    } else if (this.state.modal === 'cuando') {
      modalView = <Cuando closeModal={this.handleCloseModal.bind(this)} onChange={this.handleDate.bind(this)} />;
    } else if (this.state.modal === 'donde') {
      modalView = <Donde closeModal={this.handleCloseModal.bind(this)} onChange={this.handleAddress.bind(this)} />;
    }

    return (
      <Animated.View style={[
        styles.menuView, {
          maxHeight: this.state.animation,
        },
      ]}
      >
        <View style={styles.headerView}>
          {icon}
          <Image source={require('../img/menu-logo.png')} />
        </View>
        <View style={[
          styles.expandableView, this.state.expanded
            ? {
              minHeight: 250,
            }
            : {
              minHeight: 0,
            },
        ]}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              maxHeight: 70,
            }} onPress={() => this.handleOpenModal('clase')}
          >
            <View style={styles.menuOption}>
              <Ionicons name="ios-book-outline" style={styles.optionIcon} size={25} color={'#fff'} />
              <MyText size={18}>{this.state.claseText != ''
                ? this.state.claseText
                : '¿Qué clase necesitas?'}</MyText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              maxHeight: 70,
            }} onPress={() => this.handleOpenModal('paraQuien')}
          >
            <View style={styles.menuOption}>
              <Ionicons name="ios-people-outline" style={styles.optionIcon} size={25} color={'#fff'} />
              <MyText size={18}>{this.state.paraQuienText != ''
                ? this.state.claseText
                : '¿Para quién?'}</MyText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              maxHeight: 70,
            }} onPress={() => this.handleOpenModal('cuando')}
          >
            <View style={styles.menuOption}>
              <Ionicons name="ios-calendar-outline" style={styles.optionIcon} size={25} color={'#fff'} />
              <MyText size={18}>{this.state.cuandoText != ''
                ? this.state.claseText
                : '¿Cuando y a qué hora?'}</MyText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              maxHeight: 70,
            }} onPress={() => this.handleOpenModal('donde')}
          >
            <View style={styles.menuOption}>
              <Ionicons name="ios-pin-outline" style={styles.optionIcon} size={25} color={'#fff'} />
              <MyText size={18}>{this.state.dondeText != ''
                ? this.state.claseText
                : '¿Dónde?'}</MyText>
            </View>
          </TouchableOpacity>
        </View>
        <Modal
          animationType={'slide'} transparent={false}
          visible={this.state.modalVisible} onRequestClose={() => {
            console.log('Modal has been closed.');
          }}
        >
          {modalView}
        </Modal>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  menuView: {
    flex: 1,
    backgroundColor: '#005CB8',
    padding: 12,
    minHeight: 58,
  },
  headerView: {
    minHeight: 40,
    maxHeight: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    paddingBottom: 5,
    borderBottomColor: '#fff',
    borderBottomWidth: 0.8,
  },
  expandableView: {
    paddingTop: 10,
    flex: 1,
    minHeight: 250,
    maxHeight: 250,
    backgroundColor: 'transparent',
  },
  menuOption: {
    flexDirection: 'row',
    borderRadius: 4,
    backgroundColor: '#0081cb',
    height: 50,
    alignItems: 'center',
    paddingLeft: 10,
  },
  optionIcon: {
    paddingRight: 10,
  },
});
