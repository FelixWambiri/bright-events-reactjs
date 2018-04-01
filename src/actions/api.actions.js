import {REQUEST_FAILED, REQUEST_STARTED} from "../constants/action_types";

export const requestStarted = ()=>({
    type:REQUEST_STARTED
});

export const requestFailed = (error)=>({
    type:REQUEST_FAILED,
    error
});
