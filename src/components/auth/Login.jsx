import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid, withStyles } from 'material-ui';
import '../../assets/css/bootstrap-grid.css';
import { connect } from 'react-redux';
import { doLogin } from '../../actions/login.actions';

import AuthService from '../../helpers/AuthService';
import authStyles from './authStyles';

class Login extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    if (this.Auth.loggedIn()) { this.props.history.replace('/dashboard'); }
  }


  handleChange(e) {
    e.preventDefault();
    const { username, password } = this.refs;
    this.props.doLogin(username.value, password.value);
  }

  render() {
    const { loading, error, classes } = this.props;
    return (
      <div className="col-md-4 offset-md-4 col-sm-12 col-xs-12">
        <div className={`ui raised centered segment column ${classes.authBox}`}>
          <h3 className="ui centered header">Login</h3>
          <hr />
          <form onSubmit={this.handleChange}>
            <div className="ui fluid input ">
              <input
                required
                ref="username"
                type="text"
                name="username"
                placeholder="Email address"
              />
            </div>
            <br />
            <div className="ui fluid input ">
              <input
                required
                ref="password"
                type="password"
                placeholder="Strong Password "
                name="password"
              />
            </div>
            <br />
            <div className="field">
              <button className="ui fluid primary button">
                {loading && <i className="notched circle loading icon" />}
                            Login
              </button>
            </div>
            <br />
            {error &&
            <div className="ui bottom attached red message">
              {error}
            </div>
                    }
            <div className="ui bottom attached warning message">
                        Don't Have An Account? <Link to="/register">Sign up</Link>
            </div>

          </form>
        </div>
      </div>
    // <Grid>
    //   <div className="three column row">
    //
    //   </div>
    // </Grid>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  error: state.error,
});
const mapDispatchToProps = dispatch => ({
  doLogin: (username, password) => dispatch(doLogin(username, password)),
});

const WithStyles = withStyles(authStyles)(Login);

Login.propTypes = {
  history: PropTypes.object,
  doLogin: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.object,
  classes: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(WithStyles);
