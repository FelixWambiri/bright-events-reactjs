import React, { Component } from 'react';
import './App.css';
import Header from './components/nav/Header';
import Main from './components/main/Main';
import { Router } from 'react-router-dom';
import history from './helpers/history';
import {clearError} from "./actions/api.actions";

class App extends Component {
  constructor(props) {
    super(props);
    console.log('thi is', props);
  }
  componentDidMount() {
    const { dispatch } = this.props;

  }
  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Header />
            <Main />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
