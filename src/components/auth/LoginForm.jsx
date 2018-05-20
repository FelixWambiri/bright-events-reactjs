import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  const {
    classes, doLogin, history, error, loading, isLoggedIn,
  } = props;

  if (isLoggedIn()) {
    history.push('/dashboard');
  }
  let usernameInput;
  let passwordInput;
  const submit = (e) => {
    e.preventDefault();
    doLogin(usernameInput.value, passwordInput.value);
  };

  return (
    <div className="col-md-4 offset-md-4 col-sm-12 col-xs-12">
      <div className={`ui raised centered segment column ${classes.authBox}`}>
        <h3 className="ui centered header">Login</h3>
        <hr />
        <form onSubmit={submit}>
          <div className="ui fluid input ">
            <input
              required
              ref={username => usernameInput = username}
              type="email"
              name="username"
              placeholder="Email address"
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
            <Link to="/reset-password"> Reset Password </Link>
          </div>
          <div className="ui bottom attached warning message">
                    Don't Have An Account? <Link to="/register">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
