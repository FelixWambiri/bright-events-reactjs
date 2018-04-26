import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { doSignup } from '../../actions/signup.actions';
import SignupForm from "./SignupForm";
const mapStateToProps = state => ({
  loading: state.loading,
  error: state.error,
});
const mapDispatchToProps = dispatch => ({
  doSignup: (email, name, password) => dispatch(doSignup(email, name, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
