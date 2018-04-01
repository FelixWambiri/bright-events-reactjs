import history from "../helpers/history";
import ApiService from "../helpers/ApiService";
import {requestFailed, requestStarted} from "./api.actions";
import { FETCH_REPORTS_SUCCESS} from "../constants/action_types";

const reportsFetchSuccess = data=>({
    type:FETCH_REPORTS_SUCCESS,
    data
})



export const fetchReports = ()=> {
    return dispatch => {
        dispatch(requestStarted());
        ApiService.events.reports()
            .then(response=>{
                dispatch(reportsFetchSuccess(response));
                history.replace('/dashboard')
            })
            .catch(response=>{
                console.log("the error response is ", response)
                response.then(error=>dispatch(requestFailed(error.message)))
                history.replace('/dashboard')
            })
    }
}