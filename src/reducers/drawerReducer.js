import {TOGGLE_DRAWER} from "../constants/action_types";

export default (open=false, action)=>{
    switch (action.type){
        case TOGGLE_DRAWER:
            return action.open;
        default:
            return open;
    }
}