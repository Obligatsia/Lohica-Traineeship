import React from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { BrowserRouter, Link} from 'react-router-dom';

import {createStore} from 'redux';
import { Provider } from 'react-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import './index.css';
import rootReducer from './reducers/index';
import App from './components/App.js';
import WelcomePage from './components/WelcomePage.js';
import logIn from './components/LogIn.js';
import logOut from './components/LogOut.js';


const store = createStore(rootReducer);

const parent = document.getElementById('main');


render(
<Provider store={store}>

    <BrowserRouter>
    <div>
    <Route path="/register" component={App} />
<Route path="/welcomePage" component={WelcomePage} />
<Route path="/logIn" component={logIn} />
<Route path="/logOut" component={logOut} />
</div>
</BrowserRouter>

  </Provider>,
  parent
)

export default store;

