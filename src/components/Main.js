import React from "react";
import {Route, Switch} from "react-router";
import Home from "./Home";
import Show from "./events/show/Show";
import AddEventForm from "./events/add-event/AddEventForm";
import NotFound from "./error-pages/not-found/NotFound";
import NewEventContainer from "./events/add-event/NewEventContainer";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Dashboard from "./dashboard/Dashboard";

const Main = ()=>(
    <main>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route  path="/login" component={Login} />
            <Route  path="/events/show/:id" component={Show} />
            <Route  path="/events/new" component={NewEventContainer} />
            <Route  path="/login" component={Login} />
            <Route  path="/register" component={Signup} />
            <Route  path="/dashboard" component={Dashboard} />
            <Route component={NotFound}/>
        </Switch>
    </main>
)

export default Main