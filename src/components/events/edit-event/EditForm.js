import React, {Component} from 'react';
import {Button} from "material-ui";
import "../../../assets/css/semantic.min.css"
import {reduxForm} from "redux-form";
import Save from 'material-ui-icons/Save';
import {Dropdown} from "semantic-ui-react";
import Dropzone from "react-dropzone";
import {compose} from "recompose"
import dateFormater from "../../../helpers/DateFormatter"
class EditForm extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.state = {options:[],image:null,selected:''}
    }
    onDrop(values){
        this.setState({
                image:values[0]
            })

    }


    componentDidMount() {
        const {categories,event} = this.props;
        const parsedCategories = categories.map((category,i)=>{
                return {key:i,text:category.name,value:category.name}
            }
        );
        this.setState({
            options:parsedCategories,
            selected:event.category
        })
    }


    componentWillReceiveProps(nextProps) {

    }

    submit(values){
        this.props.onSaveEvent(values,{category:this.state.selected,image:this.state.image})
    }

    handleChange(e,{value}){
        this.setState({selected:value})
    }
    addCategory(e,{value}){
        this.setState({options:[...this.state.options,{key:value,text:value,value:value}],selected:value})
    }


    render() {
        const {event,loading,categories} = this.props;
        const {selected,options} = this.state;

        if(loading){
            return (
                <p>Loading....</p>
            )
        }

        return (
            <form className={`ui form`} >
                <h3 className={`ui dividing header`}>Edit {event.name}</h3>
                <div className="field">
                    <input name="name"  value={event.name} type="text" placeholder="Enter Event's Name"/>
                </div>
                <div className="field">
                    <input name="address"  value={event.address} type="text" placeholder="Enter Event's Name"/>
                </div>
                <div className="field">
                    <input name="start_date"  value={dateFormater(event.start_date)} type="date" placeholder="Enter Event's Name"/>
                </div>
                <div className="field">
                    <input name="end_date"  value={dateFormater(event.end_date)} type="date" placeholder="Enter Event's Name"/>
                </div>
                <div className="field">
                    <input name="name"  value={event.price} type="text" placeholder="Enter Event's Name"/>
                </div>
                <Dropdown
                    ref="category"
                    options={options}
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
                <br/>
                <br/>
                <Dropzone
                    accept="image/*"
                    required
                    disableClick={true}
                >
                    <h5>Drop Image Here</h5>
                </Dropzone>

                <div className="centered">
                    <Button type="submit"  variant="raised" size="small" color="primary" className="" >
                        <Save />
                        Save Event
                    </Button>
                </div>
                <br/>
            </form>
        );
    }
}


const EditEventForm= reduxForm({
    form:'event'});
EditForm.propTypes = {
};


export default compose(
    EditEventForm
)(EditForm)
