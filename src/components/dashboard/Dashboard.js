import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AuthService from "../../helpers/AuthService";
import {Redirect} from "react-router-dom";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.Auth = new AuthService()
    }


    componentWillMount() {
        if(!this.Auth.loggedIn()){
           this.props.history.replace('/login')
        }
    }

    render() {
        return (
            <div>
                <div className="container ">
                    <h5 className="centered">My Events Report</h5>
                    <canvas id="eventsChart"/>
                </div>

            </div>
        );
    }
}

Dashboard.propTypes = {};
Dashboard.defaultProps = {};

export default Dashboard;
