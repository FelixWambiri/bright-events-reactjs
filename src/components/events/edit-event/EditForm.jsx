import React, { Component } from 'react';
import { Button } from 'material-ui';
import '../../../assets/css/semantic.min.css';
import { reduxForm } from 'redux-form';
import Save from 'material-ui-icons/Save';
import { Dropdown } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import { compose } from 'recompose';
import validate from '../../../helpers/validationRules';
import dateFormater from '../../../helpers/DateFormatter';
import { connect } from 'react-redux';
import { updateEvent } from '../../../actions/events';

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.fieldChanged = this.fieldChanged.bind(this);
    this.state = {
      options: [],
      image: null,
      selected: '',
      form: {
        name: '',
        address: '',
        start_date: '',
        end_date: '',
        description: '',
        price: '',
        image: '',
      },
    };
  }
  onDrop(values) {
    this.setState({
      image: values[0],
    });
  }


  componentDidMount() {
    const { categories, event } = this.props;
    const parsedCategories = categories.map((category, i) => ({ key: i, text: category.name, value: category.name }));

    this.setState({
      options: parsedCategories,
      selected: event.category,
      form: {
        name: event.name,
        address: event.address,
        start_date: event.start_date,
        end_date: event.end_date,
        description: event.description,
        price: event.price,
        image: event.image,
      },
    });
  }


  componentWillReceiveProps(nextProps) {

  }

  submit(values) {
    values.preventDefault();
    const updated_event = Object.assign({}, this.state.form, { category: this.state.selected, image: this.state.image, id: this.props.event.id });
    this.props.updateEvent(updated_event);
  }

  handleChange(e, { value }) {
    this.setState({ selected: value });
  }
  addCategory(e, { value }) {
    this.setState({ options: [...this.state.options, { key: value, text: value, value }], selected: value });
  }

  fieldChanged(e) {
    const { name, value } = e.target;
    console.log(`${name} : ${value}`);
    this.setState({
      form: { ...this.state.form, [name]: value },

    });
  }


  render() {
    const { event, loading } = this.props;
    const { selected, options } = this.state;

    if (loading) {
      return (
        <p>Loading....</p>
      );
    }

    return (
      <form className="ui form" onSubmit={this.submit}>
        <h3 className="ui dividing header">Edit {event.name}</h3>
        <div className="field">
          <input name="name" onChange={this.fieldChanged} defaultValue={event.name} type="text" placeholder="Enter Event's Name" />
        </div>
        <div className="field">
          <input name="address" onChange={this.fieldChanged} defaultValue={event.address} type="text" placeholder="Enter Event's Address" />
        </div>
        <div className="field">
          <textarea required onChange={this.fieldChanged} name="description" cols="30" rows="10">
            {event.description}
          </textarea>
        </div>
        <div className="field">
          <input name="start_date" onChange={this.fieldChanged} defaultValue={dateFormater(event.start_date)} type="date" placeholder="Enter Event's Start Date" />
        </div>
        <div className="field">
          <input name="end_date" onChange={this.fieldChanged} defaultValue={dateFormater(event.end_date)} type="date" placeholder="Enter Event's End Date" />
        </div>
        <div className="field">
          <input name="price" onChange={this.fieldChanged} defaultValue={event.price} type="text" placeholder="Enter Price" />
        </div>
        <Dropdown
          ref="category"
          options={options}
          placeholder="Choose Category"
          search
          selection
          fluid
          allowAdditions
          additionLabel="New Category"
          value={selected}
          onAddItem={this.addCategory}
          onChange={this.handleChange}
        />
        <br />
        <br />
        <br />
        <Dropzone
          accept="image/*"
          required
          disableClick
        >
          <h5>Drop Image Here</h5>
        </Dropzone>

        <div className="centered">
          <Button type="submit" variant="raised" size="small" color="primary" className="" >
            <Save />
                        Save Event
          </Button>
        </div>
        <br />
      </form>
    );
  }
}

const EditEventForm = reduxForm({ form: 'editForm' }, validate);
EditForm.propTypes = {
};
const mapStateToProps = state => ({ formState: state.form.editForm });
const mapDispatchToProps = dispatch => ({
  updateEvent: event => dispatch(updateEvent(event)),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(EditForm);
