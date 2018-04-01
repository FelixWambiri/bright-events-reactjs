import moment from "moment";

const validate = values => {
    const errors = {}
    console.log("values", values.name)
        if (!values.name) {
            errors.name = 'Event Name Is Required'
        } else if (values.name.length < 2) {
            errors.name = 'Must be at least 2 characters long'
        }
        if (!values.address) {
            errors.address = 'Address Is Required'
        }
        if (!values.start_date) {
            errors.start_date = 'Start date Is Required'
        }


        if (!values.end_date) {
            errors.end_date = 'End Date Is Required'
        }

    if (values.start_date){
        var start = moment(values.start_date);
        var end = moment(values.end_date);
        var now = moment();

        if (now > start) {
            errors.start_date = "You Must Select a Future Date"
        } else {
            if(end< start){
                errors.end_date = "end date can not be less than start date"
            }
        }
    }
        if (!values.price){
        errors.price = "Price is required dude"
        }
        if (!values.description){
        errors.description = "Description required dude"
        }else if (values.description.length > 200){
        errors.description = "Maximum length for your description is 200 characters"
        }

        if (!values.category){
        errors.category = "Category is Required required dude"
        }
        if (!values.email) {
            errors.email = 'Email Address Is Required'
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email address'
        }
        return errors
}

export default validate;