import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AuthService from "../../helpers/AuthService";
import {Bar} from "react-chartjs-2"
import {fetchReports} from "../../actions/reports.actions";
import {connect} from "react-redux";
import {Button, CircularProgress, Snackbar} from "material-ui";
import ThemePicker from "../themePicker/ThemePicker";
import {changeTheme} from "../../actions/theme.picker.actions"
import ThemePickerService from "../../helpers/ThemePickerService";

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
        this.themeService = new ThemePickerService()
    }


    componentWillMount() {
        if(!this.Auth.loggedIn()){
           this.props.history.replace('/login')
            this.props.changeTheme(this.themeService.getCurrent())
        }
    }


    componentDidMount() {
        this.props.fetchReports()
    }


    render() {
        const {data,loading,error,theme}  = this.props;
        if (loading) {
            return (
                <div className="col-4 offset-4">
                    <CircularProgress/>
                </div>

            )
        }
        if (error){
            return (
                <div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        open={!!error.length}
                        autoHideDuration={6000}
                        message={ <span>{error}</span>}
                        action={[
                            <Button key="retry" color="secondary" size="small" onClick={()=>this.props.fetchReports()}>
                                Retry
                            </Button>
                        ]}
                    />
                </div>
            )
        }
        return (
            <div>
                <ThemePicker onChangeTheme={this.props.changeTheme}/>
                <hr/>
                <button className="ui labeled icon right floated button" style={theme.button} onClick={()=>this.props.history.push('/events/new')}>
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
    data:state.report,
    error:state.error,
    theme:state.theme.style
})
const mapDispatchToProps = (dispatch)=>({
    fetchReports:()=>dispatch(fetchReports()),
    changeTheme:(color)=>dispatch(changeTheme(color))
})

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
