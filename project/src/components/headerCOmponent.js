const React = require ('react');
const ReactDOM = require ('react-dom');
require  ('../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require ('../css/style.css');
const img = require ('../img/logo.png');

module.exports = class HeaderContent extends React.Component{
  render(){
    return <header>
    <nav className="navbar navbar-light bg-faded">
      <a className="navbar-brand" href="#">
      <img src={img} width="40" height="30" className ="d-inline-block align-top" alt=""></img>
      Social Network
      </a>
      </nav>


    </header>
  }
};