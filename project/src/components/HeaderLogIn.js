import React from 'react'
import  '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import img from '../img/logo.png';
import { Link} from 'react-router-dom';
import {logIn} from '../constants';
import {withRouter} from 'react-router-dom'

const myRouterHeaderLogInComponent = withRouter (class HeaderLogIn extends React.Component{
    onClick(e){
        e.preventDefault();
        this.props.history.push(logIn);
    }
  render(){
    return <header>
    <nav className="navbar navbar-light bg-faded">
      <a className="navbar-brand">
      <img src={img} width="40" height="30" className ="d-inline-block align-top" alt=""></img>
      Social Network
      </a>
      <ul>
      <li ><a href='#' onClick ={(e)=>{this.onClick(e)}}>Log in</a></li>
      </ul>
      </nav>
    </header>
  }
});

export default myRouterHeaderLogInComponent;