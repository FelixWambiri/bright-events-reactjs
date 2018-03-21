import {combineReducers} from "redux";
import events from "./events";
import error from "./error"
import loading from "./loading"
import showEvent from "./showEvent"
import drawerOpen from "./../reducers/drawerReducer"
import menuOpen from "./../reducers/menu.toggler.reducer"
import token from "./../reducers/token"

import {reducer as formReducer} from "redux-form"

export default combineReducers({
    events,
    error,
    loading,
    showEvent,
    drawerOpen,
    menuOpen,
    token,
    form:formReducer
})