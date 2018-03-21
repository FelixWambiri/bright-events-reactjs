import {SAVE_EVENT_SUCCESS, SHOW_SINGLE_EVENT} from "../constants/action_types";

export default (success=false, action)=>{
    switch (action.type){
        case SAVE_EVENT_SUCCESS:
            return true;
        default:
            return success
    }
}