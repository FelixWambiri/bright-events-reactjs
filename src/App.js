import React, { Component } from 'react';
import './App.css';
import Header from "./components/nav/Header";
import Main from "./components/main/Main";
import { Router} from "react-router-dom"
import history from "./helpers/history"
class App extends Component {
  render() {
    return (
        <div>
            <Router history={history}>
                <div>
                    <Header/>
                    <Main/>
                </div>
            </Router>
        </div>
    );
  }
}

export default App;
