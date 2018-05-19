import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './store/store';
import AppContainer from "./components/App/AppContainer";

ReactDOM.render(<Provider store={store}><AppContainer /></Provider>, document.getElementById('root'));
registerServiceWorker();
