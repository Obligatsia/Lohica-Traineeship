'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

let parent = document.getElementById('main');

class Form extends React.Component {
  render(){
    return(<h2>Render</h2>);
  }
}

ReactDOM.render(
  <Form />,
  document.getElementById('main')
)

