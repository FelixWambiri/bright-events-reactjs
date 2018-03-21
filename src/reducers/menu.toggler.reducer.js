import  {TOGGLE_MENU} from "../constants/action_types";

export default (open=false, action)=>{
    switch (action.type){
        case TOGGLE_MENU:
            return {
                open:action.open,
                element:action.element
            };
        default:
            return open;
    }
}