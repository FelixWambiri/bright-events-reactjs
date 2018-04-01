import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, withStyles} from "material-ui";
import "../../../assets/css/semantic.min.css"
import {formStyles} from "./styles"
import {Field, reduxForm} from "redux-form";
import EventField from "./EventField";
import Save from 'material-ui-icons/Save';
import validate from "./validationRules";
import renderSelectField from "./SelectField";

class AddEventForm extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this)
    }

    submit(event){
        event.preventDefault()
    }
    render() {

        const {classes,handleSubmit} = this.props;
        return (
            <form className={`ui form ${classes.formContainer}`} onSubmit={handleSubmit}>
                <h3 className={`ui dividing header ${classes.header}`}>Create New Event</h3>
                    <Field name="name" component={EventField} type="text" placeholder="Enter Event's Name"/>
                <br/>
                        <Field name="address" component={EventField} type="text" placeholder="Enter Event Address (Location)"/>
                    <br/>
                            <Field name="description" component={EventField} maxlenght={200} type="text" placeholder="Tell Us More about your event "/>
                <br/>
                            <Field name="start_date" component={EventField} type="date" />
                        <br/>
                                <Field name="end_date" component={EventField} type="date" />

                            <br/>
                                    <Field name="price" component={EventField} type="text" placeholder="How much is it going to cost us?"/>
                                <br/>

                <Field
                    name="category_id"
                    component={renderSelectField}
                    label="Select Category"
                    defaultValue
                >
                    <option value="0">Please Select a Category</option>
                    <option value="1">Niskdfls</option>
                    <option value="1">Niskdfls</option>
                    <option value="1">Niskdfls</option>
                </Field>
                                    <br/>
                                        

                                        <div className="centered">
                                            <Button type="submit"  variant="raised" size="small" color="primary" className={classes.saveButton} >
                                                <Save />
                                                Save Event
                                            </Button>
                                        </div>
                                        <br/>
            </form>
        );
    }
}


const EventWithStyle = withStyles(formStyles)(AddEventForm);
const EventForm= reduxForm({
    form:'event',
    validate})(EventWithStyle);
AddEventForm.propTypes = {
    categories:PropTypes.array.isRequired,
};
AddEventForm.defaultProps = {
    categories:[],
};

export default EventForm
