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

const store = createStore(rootReducer);

const parent = document.getElementById('main');



render(
<Provider store={store}>

    <BrowserRouter>
    <div>
    <Route path="/register" component={App} />
<Route path="/welcomePage" component={WelcomePage} />
<Route path="/logIn" component={LogInPage} />
<Route path="/main" component={MainPage}  />

<Route path="/news" component={NewsPage} />
<Route path="/friends" component={FriendsPage} />
<Route path="/settings" component={SettingsPage} />
<Route path="/search" component={SearchPage} />
</div>
</BrowserRouter>

  </Provider>,
  parent
)

export default store;

