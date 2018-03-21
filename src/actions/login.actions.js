import {LOGIN_SUCCESS, REQUEST_FAILED, REQUEST_LOGIN} from "../constants/action_types";
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
    error
});
export const doLogin = (username,password)=> {
    return dispatch => {
        dispatch(requestLogin())
        return fetch(loginURL,{
            method: 'POST',
            headers:{
                'Content-Type':"application/json"
            },
            body: JSON.stringify({
                email:username,
                password
            })
        })
            .then(res=>{
                if (res.ok){
                    return res.json()
                }else{
                    return res.json().then(err=>{
                        dispatch(requestFailed(err.message))
                    })
                }
            }).then(data=>{
                if(data !== undefined){
                    localStorage.setItem("token",data.token)
                    dispatch(loginSuccess(data.token));
                }
            })
    }
}