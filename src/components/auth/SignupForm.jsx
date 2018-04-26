import React from 'react';
import { Link } from 'react-router-dom';

const SignupForm = (props) => {
  let emailInput,
    nameInput,
    passwordInput;
  const { doSignup, loading,history, error } = props;
  const submit = (e) => {
    e.preventDefault();
    doSignup(emailInput.value, nameInput.value, passwordInput.value).then(() => {
      if (error === undefined) {} else {
        history.push('/login');
      }
    });
  };

  return (
    <div className="col-md-4 offset-md-4 col-sm-12 col-xs-12">
      <div className="ui raised centered segment column">
        <h3 className="ui centered header">Login</h3>
        <hr />
        <form onSubmit={submit}>
          <div className="ui fluid input ">
            <input
              required
              ref={email => emailInput = email}
              type="text"
              name="email"
              placeholder="Your Email Address"
            />
          </div>
          <br />
          <div className="ui fluid input ">
            <input
              required
              ref={name => nameInput = name}
              type="text"
              placeholder="Full Name"
            />
          </div>
          <br />
          <div className="ui fluid input ">
            <input
              required
              ref={password => passwordInput = password}
              type="password"
              placeholder="Strong Password "
              name="password"
            />
          </div>
          <br />
          <div className="field">
            <button className="ui fluid primary button">
              {loading && <i className="notched circle loading icon" />}
                            Create An Account
            </button>
          </div>
          <br />
          {error &&
            <div className="ui bottom attached red centered message">
              {error}
            </div>
                    }


          <div className="ui bottom attached warning message">
                        Already signed up? <Link to="/login">Login here</Link> instead.
          </div>

        </form>
      </div>
    </div>

  );
};

export default SignupForm;
