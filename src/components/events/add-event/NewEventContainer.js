import React, {Component} from 'react';

import AddEventForm from "./AddEventForm";
import {saveEvent} from "../../../actions/newEvent";
import {connect} from "react-redux";
import {Button, CircularProgress, Snackbar} from "material-ui";
import {Link} from "react-router-dom";
import AuthService from "../../../helpers/AuthService";
import {fetchCategories} from "../../../actions/categories.actions";
import {Segment} from "semantic-ui-react";

class NewEventContainer extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthService();

        this.submit = this.submit.bind(this)
    }

    componentWillMount() {
        if(!this.Auth.loggedIn())
            this.props.history.replace('/login')
        this.props.fetchCategories()
    }


    componentDidMount() {

    }


    submit(event,category){
        this.props.saveEvent(event,category);
    }

    render() {
        const {error,loading,categories} = this.props;

        return (
            <div >
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
                <div className="col-6 offset-3">
                    <Segment raised>
                        <AddEventForm categories={categories} onSaveEvent={(event,category)=>this.submit(event,category)} error={error} />
                    </Segment>
                </div>

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
        saveEvent:(event,category)=>dispatch(saveEvent(event,category)),
        fetchCategories:()=>dispatch(fetchCategories())
    }
};


NewEventContainer.propTypes = {};
NewEventContainer.defaultProps = {};

 export default connect(mapStateToProps,mapDispatchToProps)(NewEventContainer);
