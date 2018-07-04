import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import {Link, withRouter} from 'react-router-dom'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import $ from 'jquery'
const {friends, news, main, search, settings } = require ('../constants');


const {onClickNews, onClickMain, onClickFriends, onClickSettings, onClickSearch} = require('../constants');
const AjaxRequest = require ('../components/Requests.js');

const UserBlockRouteComponent = withRouter(
    class UserBlock extends React.Component{
        successFunc(data, ...args){
            let props = args[0];
            let path = args[1];
            props.history.push(path);
        }
        onClickMain (e, user){
            e.preventDefault();
            AjaxRequest.sendRequest(onClickMain, 'GET', null, null, null, user.token, this.successFunc, this.props, main);
        }

        onClickFriends (e, user){
            e.preventDefault();
            AjaxRequest.sendRequest(onClickFriends, 'GET', null, null, null, user.token, this.successFunc, this.props, friends);
        }
        onClickSearch(e, user){
            e.preventDefault();
            AjaxRequest.sendRequest(onClickSearch, 'GET', null, null, null, user.token, this.successFunc, this.props, search);
        }

        onClickNews(e, user) {
            e.preventDefault();
            AjaxRequest.sendRequest(onClickNews, 'GET', null, null, null, user.token, this.successFunc, this.props, news);
        }

        onClickSettings (e, user){
            e.preventDefault();
            AjaxRequest.sendRequest(onClickSettings, 'GET', null, null, null, user.token, this.successFunc, this.props, settings);
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