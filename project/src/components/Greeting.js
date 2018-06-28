import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import {Link, withRouter} from 'react-router-dom'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import $ from 'jquery'


const myRouterGreetingComponent = withRouter (class Greeting extends Component {

    render(){
        var user = this.props.location.state;


        const onLinkClick = ((e)=>{
            e.preventDefault();
            this.props.history.push('/logIn', user);
        })

        return (
            <div className = 'greetingMsg'>
        <p>Welcome, {user.name} {user.surName}!</p>
        <p>Your password is <span>{user.password}</span></p>
            <p>You can <a href = '#' onClick ={onLinkClick} id='logInLink'>Log in</a> now.</p>
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