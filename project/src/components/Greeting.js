import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import { welcomeUser } from '../actions/index'
import form from './Form.js'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';


class Greeting extends Component {

    render(){
        console.log(form)
        return (
            <div>
        <p>`Hello, `</p>
        </div>
    )
    }


}

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
export default connect(mapStateToProps, mapDispatchToProps)(Greeting)