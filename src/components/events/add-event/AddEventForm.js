import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, withStyles} from "material-ui";
import "../../../assets/css/semantic.min.css"
import {formStyles} from "./styles"
import {Field, reduxForm} from "redux-form";
import EventField from "./EventField";
import Save from 'material-ui-icons/Save';
import validate from "./validationRules";
import {Dropdown} from "semantic-ui-react";
import Dropzone from "react-dropzone";

const options=[]

class AddEventForm extends Component {
    state={options,image:null};
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.addCategory = this.addCategory.bind(this)
    }
    onDrop(values){
        this.setState({image:values[0]})

    }
    componentDidMount() {
        const categories = this.props.categories.map((category,i)=>{
            return {key:i,text:category.name,value:category.name}
            }
        )
        this.setState({options:categories})
    }


    submit(values,dispatch,props){
        this.props.onSaveEvent(values,{category:this.state.selected,image:this.state.image})
    }

    handleChange(e,{value}){
        this.setState({selected:value})
    }
    addCategory(e,{value}){
        this.setState({options:[...this.state.options,{key:value,text:value,value:value}],selected:value})
    }

    render() {
        const {selected} = this.state;
        const {classes,handleSubmit} = this.props;
        return (
            <form className={`ui form ${classes.formContainer}`} onSubmit={handleSubmit(this.submit)}>


                <h3 className={`ui dividing header ${classes.header}`}>Create New Event</h3>
                    <Field name="name" component={EventField} type="text" placeholder="Event name"/>
                <br/>
                        <Field name="address" component={EventField} type="text" placeholder="Event address (Location)"/>
                    <br/>
                            <Field name="description" component={EventField} maxLenght={200} type="text" placeholder="Tell us more about your event "/>
                <br/>
                            <Field name="start_date" component={EventField} type="date" />
                        <br/>
                                <Field name="end_date" component={EventField} type="date" />

                            <br/>
                                    <Field name="price" component={EventField} type="text" placeholder="Price"/>
                                <br/>

                <Dropzone
                    onDrop={this.onDrop.bind(this)}
                    accept="image/*"
                    disableClick={true}
                    required
                >
                    Drop Event Image
                </Dropzone>



                <Dropdown
                    ref="category"
                    options={this.state.options}
                    placeholder='Choose Category'
                    search
                    selection
                    fluid
                    allowAdditions
                    additionLabel="New Category"
                    value={selected}
                    onAddItem={this.addCategory}
                    onChange={this.handleChange}
                />
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

export default EventForm
