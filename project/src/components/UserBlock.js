import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import {Link, withRouter} from 'react-router-dom'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';

const UserBlockRouteComponent = withRouter(
    class UserBlock extends React.Component{
        render(){

            const user = this.props.user;
            console.log(user);
            return(
                <div>hi, {user.name.value}</div>
        )
        }
    }
)

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

export default connect(mapStateToProps, mapDispatchToProps)(UserBlockRouteComponent)