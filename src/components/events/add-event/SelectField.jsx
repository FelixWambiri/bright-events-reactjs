import React from 'react';
import { formStyles } from './styles';
import { withStyles } from 'material-ui';

const renderSelectField = ({
  input,
  classes,
  label,
  meta: { touched, error },
  children,
}) => (

  <div>
    <select
      className="ui fluid search selection dropdown "
      {...input}
      onChange={(event, index, value) => input.onChange(value)}
      children={children}
    />
    {touched &&
                                   ((error && <span className={classes.errorMessage}>{error}</span>))}
  </div>

);
export default withStyles(formStyles)(renderSelectField);
