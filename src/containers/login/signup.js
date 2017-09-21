import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from '../../Views/Login/Login'
import * as loginActions from '../../actions/login';

function mapStateToProps(state){
  return({
    newUser: state.newUser.user
  });
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(loginActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
