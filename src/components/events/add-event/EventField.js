import React from "react";
import {withStyles} from "material-ui";
import {formStyles} from "./styles";

const EventField = ({classes,input,type,placeholder,maxlength,meta:{touched,dirty,error}})=> {
    return (
        <div className={`field ${touched?error?'error':'':''}`}>
            <input {...input} type={type} placeholder={placeholder} maxlength={maxlength}/>
            {touched &&
            ((error && <span className={classes.errorMessage}>{error}</span>))}
        </div>
    )
}
export default withStyles(formStyles)(EventField)