import React, { Component } from 'react';
import { compose } from 'recompose';
import { withStyles } from 'material-ui';
import { connect } from 'react-redux';
import { doLogin } from '../../actions/login.actions';
import '../../assets/css/bootstrap-grid.css';

import AuthService from '../../helpers/AuthService';
import authStyles from './authStyles';
import LoginForm from './LoginForm';

class Login extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    if (this.Auth.loggedIn()) { this.props.history.replace('/dashboard'); }
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  error: state.error,
});
const mapDispatchToProps = dispatch => ({
  doLogin: (username, password) => dispatch(doLogin(username, password)),
  isLoggedIn: () => new AuthService().loggedIn(),
});
export default compose(
  withStyles(authStyles),
  connect(mapStateToProps, mapDispatchToProps),
)(LoginForm);
