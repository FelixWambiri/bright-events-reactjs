import {TOGGLE_DRAWER} from "../constants/action_types";

export const toggleDrawer = (open=true)=>({
    type:TOGGLE_DRAWER,
    open:!open
});