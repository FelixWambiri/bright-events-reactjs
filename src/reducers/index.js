import {combineReducers} from "redux";
import events from "./events";
import error from "./error"
import loading from "./loading"
import showEvent from "./showEvent"
import drawerOpen from "./../reducers/drawerReducer"
import menuOpen from "./../reducers/menu.toggler.reducer"
import token from "./../reducers/token"
import map from "./../reducers/map.reducer"
import report from "../reducers/reports.reducer"
import {reducer as formReducer} from "redux-form"
import rsvp_loading from "./rsvp_loading";

export default combineReducers({
    events,
    error,
    loading,
    showEvent,
    drawerOpen,
    menuOpen,
    token,
    map,
    rsvp_loading,
    report,
    form:formReducer
})