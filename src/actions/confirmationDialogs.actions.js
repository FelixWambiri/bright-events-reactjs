import {TOGGLE_DIALOG, TOGGLE_DRAWER} from "../constants/action_types";

export const toggleDialog = (open=true)=>({
    type:TOGGLE_DIALOG,
    open:!open
});