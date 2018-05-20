import {FETCH_REPORTS_SUCCESS} from "../constants/action_types";

export default (data={}, action)=>{
    switch (action.type){
        case FETCH_REPORTS_SUCCESS:
            return action.data;
        default:
            return data
    }
}