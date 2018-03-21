import {SHOW_SINGLE_EVENT} from "../constants/action_types";

export default (state={}, action)=>{
    switch (action.type){
        case SHOW_SINGLE_EVENT:
            return Object.assign({},state,action.event)
        default:
            return state
    }
}