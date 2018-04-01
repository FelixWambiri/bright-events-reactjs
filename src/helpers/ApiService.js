import {eventsURL, loginURL} from "../constants/urls";
import fetch from "cross-fetch";
import AuthService from "./AuthService";

export default {
    user: {
        login:(credentials)=>send(credentials,"POST",false,loginURL),
        signup:(data)=>send(data)
    },
    events:{
        save:(data)=>send(data,"POST",true,eventsURL),
        rsvp:(data)=>send(data,"POST",true,eventsURL+`${data.event}/rsvp`),
        reports:()=>send({},"GET",true,eventsURL+'reports')
    }
}


function send(data={},method="POST",auth=false,url) {
    let authService = new AuthService();
    return fetch(url,{
        method: method,
        headers:{
            'Content-Type':"application/json",
            'Authorization':auth?`Bearer ${authService.getToken()}`:null
        },
        body: method=== "POST"?JSON.stringify(data):null
    }).then(status)
}

function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response.json())
    } else {
        return Promise.reject(response.json())
    }
}