import {CATEGORIES_FETCHED} from "../constants/action_types";

export default (categories=[], action)=>{
    switch (action.type){
        case CATEGORIES_FETCHED:
            return action.categories;
        default:
            return categories;
    }
}