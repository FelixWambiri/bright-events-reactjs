import  {FETCH_MAP_SUCCESS} from "../constants/action_types";

export default (coordinates={}, action)=>{
    switch (action.type){
        case FETCH_MAP_SUCCESS:
            return {
                coordinates:action.coordinates
            };
        default:
            return coordinates;
    }
}