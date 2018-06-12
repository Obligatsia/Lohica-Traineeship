import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let parent = document.getElementById('root');

ReactDOM.render(
<div className="App">
  <p className="App-intro">
  Hello, World!
</p>
</div>,
  parent
);

