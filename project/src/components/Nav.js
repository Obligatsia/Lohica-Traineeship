import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import {Link, withRouter} from 'react-router-dom'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import $ from 'jquery'
import {addValue} from "../actions";
const {friends, news, main, search, settings } = require ('../constants');


const {onClickNews, onClickMain, onClickFriends, onClickSettings, onClickSearch} = require('../constants');
const AjaxRequest = require ('../components/Requests.js');


const UserBlockRouteComponent = withRouter(
    class UserBlock extends React.Component{
         static async changeState(user, props){
            props.dispatch(addValue('name', user.name, true));
            props.dispatch(addValue('surName', user.surName, true));
            props.dispatch(addValue('email', user.email, true));
            props.dispatch(addValue('photo', user.photo, true));
            props.dispatch(addValue('middleName', user.middleName, true));
            props.dispatch(addValue('age', user.age, true));
            props.dispatch(addValue('gender', user.gender, true));
        }

         successFunc(data, ...args){
            let props = args[0];
            let path = args[1];
            let user = args[2];
            let changeState = args[3];
            changeState(user, props).then(props.history.push(path));
        }
        onClickMain (e, user){
            e.preventDefault();
            AjaxRequest.sendRequest(onClickMain, 'GET', null, null, null, user.token, this.successFunc, this.props, main, user, UserBlockRouteComponent.changeState);
        }

        onClickFriends (e, user){
            e.preventDefault();
            AjaxRequest.sendRequest(onClickFriends, 'GET', null, null, null, user.token, this.successFunc, this.props, friends, user, UserBlockRouteComponent.changeState);
        }
        onClickSearch(e, user){
            e.preventDefault();
            AjaxRequest.sendRequest(onClickSearch, 'GET', null, null, null, user.token, this.successFunc, this.props, search, user, UserBlockRouteComponent.changeState);
        }

        onClickNews(e, user) {
            e.preventDefault();
            AjaxRequest.sendRequest(onClickNews, 'GET', null, null, null, user.token, this.successFunc, this.props, news, user, UserBlockRouteComponent.changeState);
        }

        onClickSettings (e, user){
            e.preventDefault();
            AjaxRequest.sendRequest(onClickSettings, 'GET', null, null, null, user.token, this.successFunc, this.props, settings, user, UserBlockRouteComponent.changeState);
        }
        render(){
            const user = JSON.parse(localStorage.getItem('user'));

            return(
                <nav className="nav flex-column col-sm-3 ">
                <a className="nav-link active" href="#" onClick ={(e)=>{this.onClickMain(e, user)}}>My account</a>
            <a className="nav-link" href="#" onClick ={(e)=>{this.onClickFriends(e, user)}}>Friends</a>
            <a className="nav-link" href="#" onClick ={(e)=>{this.onClickSearch(e, user)}}>Search people</a>
            <a className="nav-link" href="#" onClick ={(e)=>{this.onClickNews(e, user)}}>News feed</a>
            <a className="nav-link" href="#" onClick ={(e)=>{this.onClickSettings(e, user)}}>Settings</a>
            </nav>
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