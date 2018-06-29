import React from 'react'
import  '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import img from '../img/logo.png';
import { Link} from 'react-router-dom';

export default class HeaderLogOut extends React.Component{
    render(){
        return <header>
        <nav className="navbar navbar-light bg-faded">
            <a className="navbar-brand">
            <img src={img} width="40" height="30" className ="d-inline-block align-top" alt=""></img>
        Social Network
        </a>
        <ul>
        <li><Link to='/logIn'>Log out</Link></li>
        </ul>
        </nav>
        </header>
    }
};