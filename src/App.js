import React, { Component } from 'react';
import './App.css';
import Header from "./components/nav/Header";
import Main from "./components/Main";
import {BrowserRouter as Router} from "react-router-dom"
class App extends Component {
  render() {
    return (
        <div className="container">
            <Router>
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
