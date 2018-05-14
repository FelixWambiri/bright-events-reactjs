import React, {Component} from 'react';
import PropTypes from 'prop-types';

class EmailSent extends Component {
    render() {
        return (
            <div className="col-md-4 offset-md-4 col-sm-12 col-xs-12">
                <div className="ui raised centered segment column ">
                    <h3 className="ui centered header">Password Reset Link Sent</h3>
                    <hr />
                    <p>We've sent the link to your email.</p>
                    <p>Please check your email to update your password</p>
                </div>
            </div>
        );
    }
}

EmailSent.propTypes = {};

export default EmailSent;
