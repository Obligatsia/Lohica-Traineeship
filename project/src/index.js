import React from 'react';
import ReactDOM from 'react-dom';

import {createStore} from 'redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import FormContent from './components/formComponent.js';
//import FormErrors from './components/formComponent.js';
import HeaderContent from './components/headerComponent.js';

let parent = document.getElementById('main');
let main = (
  <div>
    <HeaderContent />
    <FormContent />
  </div>
)

ReactDOM.render(
  main, parent
)

