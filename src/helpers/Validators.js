import validator from "react-validation"
import {Message} from "semantic-ui-react";
import React from "react";

const required = (value)=>{
    if(!value.toString().trim().length){
        return <span />
    }
}
