import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Warning extends Component {
    render() {
        const {message} = this.props;
        return (
            <div className="ui icon message">
                <i className="circle warning icon"/>
                <div className="content">
                    <p>{message}</p>
                </div>
            </div>
        );
    }
}

Warning.propTypes = {
    message:PropTypes.string.isRequired
};

export default Warning;
