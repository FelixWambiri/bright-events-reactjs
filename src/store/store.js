import {createStore, applyMiddleware} from "redux";
import reducers from "./../reducers"
import logger from "../middlewares/logger";
import thunk from "redux-thunk";
export default createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),applyMiddleware(thunk,logger))
