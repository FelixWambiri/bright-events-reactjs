import {TOGGLE_DIALOG} from "../constants/action_types";

export default (open=false, action)=>{
    switch (action.type){
        case TOGGLE_DIALOG:
            return action.open;
        default:
            return open;
    }
}