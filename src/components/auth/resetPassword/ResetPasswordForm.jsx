import React, { Component } from 'react';

let emailInput;
class ResetPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }



    submit(e) {
    e.preventDefault();
    const { sendMail } = this.props;
    sendMail(emailInput.value);
  }
  render() {
    console.log('the props are ', this.props.error);
    const { error, loading } = this.props;
    return (
      <div className="col-md-4 offset-md-4 col-sm-12 col-xs-12">
        <div className="ui raised centered segment column ">
          <h3 className="ui centered header">Reset Password</h3>
          <hr />
          <form onSubmit={this.submit}>
            <div className="ui fluid input ">
              <input
                required
                ref={username => emailInput = username}
                type="text"
                name="username"
                placeholder="Email address"
              />
            </div>
            <br />
            <button className="ui fluid primary button">
              {loading && <i className="notched circle loading icon" />}
                  Get Reset Link
            </button>
              <br/>
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

ResetPasswordForm.propTypes = {};

export default ResetPasswordForm;
