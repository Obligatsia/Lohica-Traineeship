import React, {Component} from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import{logIn} from '../constants';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';

const myRouterGreetingComponent = withRouter (class Greeting extends Component {

    onClick(e){
        e.preventDefault();
        this.props.history.push(logIn);
    }

    render(){
        const user = this.props.user;
        return (
            <div className = 'greetingMsg'>
        <p>Welcome, {user.name.value} {user.surName.value}!</p>
        <p>Your password is <span>{user.password.value}</span></p>
            <p>You can <a href = '#' onClick ={(e)=>{this.onClick(e)}} id='logInLink'>Log in</a> now.</p>
        </div>
    )
    }
})

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(myRouterGreetingComponent)