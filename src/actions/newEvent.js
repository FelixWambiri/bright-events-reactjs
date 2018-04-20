import {REQUEST_STARTED,SAVE_EVENT_SUCCESS
} from "../constants/action_types";

import ApiService from "../helpers/ApiService";
import history from "../helpers/history";
import {requestFailed} from "./api.actions";

export const savingEvent = () => ({
    type:REQUEST_STARTED
});
export const savedEvent = ()=>({
    type:SAVE_EVENT_SUCCESS
});

export const saveEvent = (event,category) => {
    const new_event = Object.assign({},event,{category});
    return dispatch =>{
        dispatch(savingEvent());
        ApiService.events.save(new_event)
            .then(()=>{
                dispatch(savedEvent());
                history.replace('/')
            })
            .catch(response=>{
                console.log("the response is ", response);
                try{
                    response.then(error=>dispatch(requestFailed(error.message)));
                }
                catch(error){
                    console.log("the error si ", error);
                    dispatch(requestFailed("Can Not Connect To The Server"))
                }
                // response.then(error=>dispatch(requestFailed(error.message)));
                history.replace('/events/new')
            });
    };
};
