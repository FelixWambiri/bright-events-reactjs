import React, {Component} from 'react';
import EditForm from "./EditForm";
import {connect} from "react-redux";
import {fetchSingleEvent} from "../../../actions/events";
import {fetchCategories} from "../../../actions/categories.actions";
import AuthService from "../../../helpers/AuthService";
import {Segment} from "semantic-ui-react";
import {CircularProgress} from "material-ui";

class EditEvent extends Component {

    constructor(props) {
        super(props);
        this.Auth = new AuthService()
    }
    componentWillMount() {
        if(!this.Auth.loggedIn()){
            this.props.history.replace('/login')
        }
        const {match} = this.props;
        this.props.fetchEvent(match.params.id);
        this.props.fetchCategories()
    }

    render() {
        const {event,loading,categories } = this.props;

        if (loading) {
            return (
                <div className="col-4 offset-4">
                    <CircularProgress/>
                </div>

            )
        }
        return (
            <div className="col-6 offset-3">
                {
                    categories.length > 0 && !loading &&
                    <Segment raised>
                        <EditForm event={event} categories={categories} />
                    </Segment>
                }

            </div>
        );
    }
}

EditEvent.propTypes = {};
const mapStateToProps = state=>({
    event:state.showEvent,
    loading:state.loading,
    categories:state.categories
});
const mapDispatchToProps = dispatch=>({
    fetchEvent:(id)=>dispatch(fetchSingleEvent(id,false)),
    fetchCategories:()=>dispatch(fetchCategories())
});
export default connect(mapStateToProps,mapDispatchToProps)(EditEvent);
