import { REQUEST_SIGNUP,SIGNUP_SUCCESS} from "../constants/action_types";
import {requestFailed} from "./api.actions";

const loginURL = "http://localhost:5000/api/v1/auth/register";

export const requestSignup = ()=>({
    type:REQUEST_SIGNUP
});
export const signupSuccess = (token)=>({
    type:SIGNUP_SUCCESS,
    token
});



export const doSignup = (email,name,password,)=>{
    return dispatch =>{
        dispatch(requestSignup());
        return fetch(loginURL,{
            method: 'POST',
            headers:{
                'Content-Type':"application/json"
            },
            body: JSON.stringify({
                email,
                name,
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
            })

    }
}