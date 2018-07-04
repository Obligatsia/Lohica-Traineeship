import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import {Link, withRouter} from 'react-router-dom'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import $ from 'jquery'

const {onClickNews, onClickMain, onClickFriends, onClickSettings, onClickSearch} = require('../constants');
const SendRequest = require ('../components/Requests.js');

const UserBlockRouteComponent = withRouter(
    class UserBlock extends React.Component{
        onClickMain (e, user){
            e.preventDefault();
            SendRequest.sendForMain(onClickMain, 'GET', user, this.props);
        }

        onClickFriends (e, user){
            e.preventDefault();
            SendRequest.sendForFriends(onClickFriends, 'GET', user, this.props);
        }

        onClickSearch(e, user){
            e.preventDefault();
            SendRequest.sendForSearch(onClickSearch, 'GET', user, this.props);
        }

        onClickNews(e, user) {
            e.preventDefault();
            SendRequest.sendForNews(onClickNews, 'GET', user, this.props);
        }

        onClickSettings (e, user){
            e.preventDefault();
            SendRequest.sendForSettings(onClickSettings, 'GET', user, this.props);
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