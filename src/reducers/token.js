import {LOGIN_SUCCESS} from "../constants/action_types";

export default  (event="", action)=> {
    switch (action.type){
        case LOGIN_SUCCESS:
            return action.token;
        default:
            return event;
    }
}