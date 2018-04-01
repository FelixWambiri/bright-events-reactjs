import React, {Component} from 'react';

import AddEventForm from "./AddEventForm";
import {saveEvent} from "../../../actions/new_event";
import {connect} from "react-redux";
import {Button, CircularProgress, Snackbar} from "material-ui";
import {Link} from "react-router-dom";
import AuthService from "../../../helpers/AuthService";

class NewEventContainer extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthService();

        this.submit = this.submit.bind(this)
    }

    componentWillMount() {
        if(!this.Auth.loggedIn())
            this.props.history.replace('/login')
    }



    submit(event){
        this.props.saveEvent(event);
    }

    render() {
        const {error,loading} = this.props;
        if (loading) {
            return (
                <div className="col-4 offset-4">
                    <CircularProgress/>
                </div>

            )
        }
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
                        <Button component={Link} to="/" key="retry" color="secondary" size="small">
                            Home
                        </Button>
                    ]}
                />
                <AddEventForm onSubmit={(event)=>this.submit(event)} error={error} />

            </div>
        );
    }
}

const mapStateToProps = state=>
{
    return{
        categories:state.categories,
        error:state.error,
        loading:state.loading,
        success:state.success
    }
};

const mapDispatchToProps = dispatch => {
    return {
        saveEvent:(event,history)=>dispatch(saveEvent(event,history))
    }
};


NewEventContainer.propTypes = {};
NewEventContainer.defaultProps = {};

 export default connect(mapStateToProps,mapDispatchToProps)(NewEventContainer);
