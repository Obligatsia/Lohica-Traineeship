import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import {withRouter} from 'react-router-dom'

import { welcomeUser } from '../actions/index'
import form from './Form.js'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';


const myRouterGreetingComponent = withRouter (class Greeting extends Component {

    render(){
        var user = this.props.location.state;


        return (
            <div className = 'greetingMsg'>
        <p>Welcome, {user.name} {user.surName}!</p>
        <p>Your password is <span>{user.password}</span></p>
        </div>
    )
    }


})

function mapStateToProps(state) {
    return {
        welcome: state.welcome
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(myRouterGreetingComponent)