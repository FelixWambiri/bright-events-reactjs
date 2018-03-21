import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AuthService from "../../helpers/AuthService";
import {Bar} from "react-chartjs-2"

const options ={}
const data = {
    labels: ["Weddings", "Graduation", "SendOff"],
    datasets: [{
        label: 'Number of Attendees',
        data: [12, 19, 3],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
    }]
}

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
               <Bar data={data} options={options}/>

            </div>
        );
    }
}

Dashboard.propTypes = {};
Dashboard.defaultProps = {};

export default Dashboard;
