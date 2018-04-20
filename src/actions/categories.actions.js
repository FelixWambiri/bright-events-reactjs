import ApiService from "../helpers/ApiService";
import {requestFailed, requestStarted} from "./api.actions";
import {CATEGORIES_FETCHED} from "../constants/action_types";

const categoriesFetched = categories=>({
    type:CATEGORIES_FETCHED,
    categories
});
export const fetchCategories = ()=> {
    return dispatch => {
        dispatch(requestStarted());
        ApiService.categories.fetch()
            .then(response=>{
                 dispatch(categoriesFetched(response.categories));
            })
            .catch(response=>{
                try{
                    dispatch(requestFailed(response.message))
                }
                catch(error){
                    dispatch(requestFailed(error));
                }
            })
    }
};

