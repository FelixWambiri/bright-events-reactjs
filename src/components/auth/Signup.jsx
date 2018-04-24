import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { doSignup } from '../../actions/signup.actions';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, name, password } = this.refs;
    this.props.doSignup(email.value, name.value, password.value).then(() => {
      const { error } = this.props;
      if (error === undefined) {

      } else {
        this.props.history.push('/login');
      }
    });
  }
  render() {
    const { loading, error } = this.props;
    return (
        <div className="col-md-4 offset-md-4 col-sm-12 col-xs-12">
          <div className="ui raised centered segment column">
            <h3 className="ui centered header">Login</h3>
            <hr />
            <form onSubmit={this.handleSubmit}>
              <div className="ui fluid input ">
                <input
                  required
                  ref="email"
                  type="text"
                  name="email"
                  placeholder="Your Email Address"
                />
              </div>
              <br />
              <div className="ui fluid input ">
                <input
                  required
                  ref="name"
                  type="text"
                  placeholder="Full Name"
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
  }
}


const mapStateToProps = state => ({
  loading: state.loading,
  error: state.error,
});
const mapDispatchToProps = dispatch => ({
  doSignup: (email, name, password) => dispatch(doSignup(email, name, password)),
});


Signup.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  doSignup: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
