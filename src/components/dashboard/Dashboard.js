import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AuthService from "../../helpers/AuthService";
import {Bar} from "react-chartjs-2"
import {fetchReports} from "../../actions/reports.actions";
import {connect} from "react-redux";

const options ={}
const parsedData = data => ({
    labels: data.categories,
    datasets: [{
        label: 'Number of Attendees',
        data: data.values,
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
})

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


    componentDidMount() {
        this.props.fetchReports()
    }


    render() {
        const {data,loading}  = this.props;
        return (
            <div>
                <hr/>
                <button className="ui labeled icon green right floated button" onClick={()=>this.props.history.push('/events/new')}>
                    <i className="plus icon"/>
                    Add Event
                </button>
               <Bar data={parsedData(data)} options={options}/>
            </div>
        );
    }
}

Dashboard.propTypes = {
    data:PropTypes.object
};
Dashboard.defaultProps = {};

const mapStateToProps = (state)=>({
    loading:state.loading,
    data:state.report
})
const mapDispatchToProps = (dispatch)=>({
    fetchReports:()=>dispatch(fetchReports())
})

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
