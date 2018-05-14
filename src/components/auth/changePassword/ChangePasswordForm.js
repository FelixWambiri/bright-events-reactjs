import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui';

let passwordInput;
let passwordConfirmation;
class ChangePasswordForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    const { changePassword, resetToken } = this.props;
    changePassword({password:passwordInput.value,password_confirmation:passwordConfirmation.value},resetToken);
  }

  componentDidMount() {
    const { token } = this.props.match.params;
    this.props.verifyResetToken(token);
  }
  render() {
    const { error, loading, resetError } = this.props;
    if (loading) {
      return (
        <div className="col-4 offset-4 ">
          <CircularProgress />
        </div>
      );
    }
    if (resetError) {
      return (<div className="col-md-4 offset-md-4 col-sm-12 col-xs-12">
        <div className="ui raised centered segment column ">
          <div className="ui red message">
            {resetError}
          </div>
        </div>
              </div>);
    }
    if (!loading && !(resetError)) {
      return (
        <div className="col-md-4 offset-md-4 col-sm-12 col-xs-12">
          <div className="ui raised centered segment column ">
            <h3 className="ui centered header">Reset Password</h3>
            <hr />
            <form onSubmit={this.submit}>
              <div className="ui fluid input ">
                <input
                  required
                  ref={password => passwordInput = password}
                  type="password"
                  name="password"
                  placeholder="Type you new password"
                />
              </div>
              <br />
              <div className="ui fluid input ">
                <input
                  required
                  ref={passwordConf => passwordConfirmation = passwordConf}
                  type="password"
                  name="passwordConfirmation"
                  placeholder="Confirm you new password"
                />
              </div>
              <br />
              <button className="ui fluid primary button">
                {loading && <i className="notched circle loading icon" />}
                            Update Your Password
              </button>

              {error &&
                <div className="ui bottom attached red message">
                  {error}
                </div>
                        }
            </form>
          </div>
        </div>

      );
    }
  }
}

ChangePasswordForm.propTypes = {};

export default ChangePasswordForm;
