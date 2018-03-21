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
        if (!values.price){
        errors.price = "Price is required dude"
        }
        if (!values.description){
        errors.description = "Description required dude"
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