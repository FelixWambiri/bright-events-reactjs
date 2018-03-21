import {LOGIN_SUCCESS, REQUEST_FAILED, REQUEST_LOGIN} from "../constants/action_types";
import ApiService from "../helpers/ApiService";
import history from "./../helpers/history"

const loginURL = "http://localhost:5000/api/v1/auth/login";
const requestLogin = ()=>({
    type:REQUEST_LOGIN
});
const loginSuccess = (token)=>({
    type:LOGIN_SUCCESS,
    token
});

const requestFailed = (error)=>({
    type:REQUEST_FAILED,
    error:error
});
export const doLogin = (email,password)=> {
    return dispatch => {
        dispatch(requestLogin());
       ApiService.user.login({email,password})
           .then(response=>{
               const token = response.token
               dispatch(loginSuccess(token))
               localStorage.setItem("token",token)
               history.replace('/dashboard')
           })
           .catch(response=>{
               response.then(error=>dispatch(requestFailed(error.message)))
               history.replace('/login')
           })
    }
}