import {SAVE_EVENT_FAILED, SAVE_EVENT_REQUEST, SAVE_EVENT_SUCCESS} from "../constants/action_types";
import fetch from "cross-fetch";
import {BASE_URL} from "../constants/urls";
import AuthService from "../helpers/AuthService";

export const savingEvent = ()=>({
    type:SAVE_EVENT_REQUEST
});
export const savedEvent = ()=>({
    type:SAVE_EVENT_SUCCESS
});
export const saveFailed = error=>({
    type:SAVE_EVENT_FAILED,
    error
});

export const saveEvent = (event,history) => {
    const auth = new AuthService();

    const new_event = Object.assign({},event,{category_id:"1"});
    return dispatch =>{
        dispatch(savingEvent())
        return fetch(BASE_URL+'/events/', {
            body: JSON.stringify(new_event),
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.getToken()}`
            },
            method: 'POST',
        }).then((response)=>{
            const error = JSON.parse(response._bodyText)
            if (response.ok) {
                dispatch(savedEvent());
                // history.push('/')
            } else if (response.status === 400 || response.status === 401 || response.status === 403) {
                dispatch(saveFailed(error.message))
            } else {
                dispatch(saveFailed("Unknown Error Occured"))
            }
            // console.log("the status === ", response.status)
            // if(response.status !== 200 || response.status !== 201){
            //     console.log("the error is ")
            //
            //     dispatch(saveFailed(error.message))
            //     return;
            // }

        })
            .catch(error=>dispatch(saveFailed(error.message)))
    }
}
