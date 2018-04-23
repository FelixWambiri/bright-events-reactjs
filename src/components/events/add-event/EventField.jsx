import React from 'react';
import { withStyles } from 'material-ui';
import { formStyles } from './styles';

const EventField = (props) => {
  const {
    classes, input, type, defaultValue, placeholder, maxlength, meta: { touched, dirty, error },
  } = props;
  console.log({ ...input });
  return (
    <div className={`field ${touched ? error ? 'error' : '' : ''}`}>
      <input required {...input} type={type} placeholder={placeholder} maxLength={maxlength} />
      {touched &&
        ((error && <span className={classes.errorMessage}>{error}</span>))}
    </div>
  );
};
export default withStyles(formStyles)(EventField);
