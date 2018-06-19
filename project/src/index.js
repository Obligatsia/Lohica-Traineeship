import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
// import configureStore from './store/createStore.js';
import rootReducer from './reducers/index';
import App from './components/App.js';


const store = createStore(rootReducer);
store.subscribe(() =>
    console.log(store.getState())
)

let parent = document.getElementById('main');

render(
<Provider store={store}>
 <App />
  </Provider>,
  parent
)




