import {eventsURL, loginURL} from "../constants/urls";
import fetch from "cross-fetch";
import AuthService from "./AuthService";

export default {
    user: {
        login:(credentials)=>send(credentials,loginURL),
        signup:(data)=>send(data)
    },
    events:{
        save:(data)=>send(data,true,eventsURL)
    }
}


function send(data,auth=false,url) {
    let authService = new AuthService()
    return fetch(url,{
        method: 'POST',
        headers:{
            'Content-Type':"application/json",
            'Authorization':auth?`Bearer ${authService.getToken()}`:null
        },
        body: JSON.stringify(data)
    }).then(status)
}

function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response.json())
    } else {
        return Promise.reject(response.json())
    }
}