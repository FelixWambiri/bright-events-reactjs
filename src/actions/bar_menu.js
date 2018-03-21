import {TOGGLE_DRAWER, TOGGLE_MENU} from "../constants/action_types";

export const toggleMenu = (open=true,element)=>({
    type:TOGGLE_MENU,
    open:!open,
    element
});