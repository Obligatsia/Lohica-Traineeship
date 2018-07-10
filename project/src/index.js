import React from 'react';
import {render} from 'react-dom';
import { Route} from 'react-router'
import { BrowserRouter} from 'react-router-dom';

import {createStore} from 'redux';
import { Provider } from 'react-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import './index.css';
import rootReducer from './reducers/index';
import App from './components/App.js';
import WelcomePage from './components/pages/WelcomePage.js';
import LogInPage from './components/pages/LogInPage.js';
import MainPage from './components/pages/MainPage.js';
import FriendsPage from './components/pages/FriendsPage.js';
import SearchPage from './components/pages/SearchPage.js';
import NewsPage from './components/pages/NewsPage.js';
import SettingsPage from './components/pages/SettingsPage.js';
import {PrivateRoute, UnregisterRoute} from './components/protectRoute'
const store = createStore(rootReducer);

const parent = document.getElementById('main');



render(
<Provider store={store}>

    <BrowserRouter>
    <div>
    <UnregisterRoute path="/register" component={App} />
<UnregisterRoute path="/welcomePage" component={WelcomePage} />
<Route path="/logIn" component={LogInPage} />
<PrivateRoute path='/main' component={MainPage} />
<PrivateRoute path="/news" component={NewsPage} />
<PrivateRoute path="/friends" component={FriendsPage} />
<PrivateRoute path="/settings" component={SettingsPage} />
<PrivateRoute path="/search" component={SearchPage} />
</div>
</BrowserRouter>

  </Provider>,
  parent
)

export default store;

