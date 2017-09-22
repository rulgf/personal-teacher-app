// @flow
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Login from '../../Views/Login/Login';
import * as loginActions from '../../actions/login';


function mapStateToProps(state) {
  return ({
    user: state.login.user,
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(loginActions, dispatch);
}

const loginComponent = reduxForm({
  form: 'login',
})(Login);

export default connect(mapStateToProps, mapDispatchToProps)(loginComponent);
