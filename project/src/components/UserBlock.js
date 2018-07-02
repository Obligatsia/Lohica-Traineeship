import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import {Link, withRouter} from 'react-router-dom'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import $ from 'jquery'

const {onClickNews, onClickMain, onClickFriends, onClickSettings, onClickSearch} = require('../constants');

const UserBlockRouteComponent = withRouter(
    class UserBlock extends React.Component{
        render(){
            const user = this.props.user;

            let onClickMain = (e)=>{
                e.preventDefault();
                $.ajax({
                    url: onClickMain,
                    type: 'GET',
                    headers: {"Authorization": user.token.value},
                    success: ((data)=>{
                    }),
                    error:((data)=>{
                    })
                });
            }

            let onClickFriends = (e)=>{
                e.preventDefault();
                $.ajax({
                    url: onClickFriends,
                    type: 'GET',
                    headers: {"Authorization": user.token.value},
                    success: ((data)=>{
                    }),
                    error:((data)=>{
                    })
                });
            }

            let onClickSearch = (e)=>{
                e.preventDefault();
                $.ajax({
                    url: onClickSearch,
                    type: 'GET',
                    headers: {"Authorization": user.token.value},
                    success: ((data)=>{
                    }),
                    error:((data)=>{
                    })
                });
            }

            let onClickNews = (e)=>{
                e.preventDefault();
                $.ajax({
                    url: onClickNews,
                    type: 'GET',
                    headers: {"Authorization": user.token.value},
                    success: ((data)=>{
                    }),
                    error:((data)=>{
                    })
                });
            }

            let onClickSettings = (e)=>{
                e.preventDefault();
                $.ajax({
                    url: onClickSettings,
                    type: 'GET',
                    headers: {"Authorization": user.token.value},
                    success: ((data)=>{
                    }),
                    error:((data)=>{
                    })
                });
            }

            return(
                <nav className="nav flex-column col-sm-3 ">
                <a className="nav-link active" href="#" onClick ={onClickMain}>My account</a>
                <a className="nav-link" href="#" onClick ={onClickFriends}>Friends</a>
                <a className="nav-link" href="#" onClick ={onClickSearch}>Search people</a>
                <a className="nav-link" href="#" onClick ={onClickNews}>News feed</a>
                <a className="nav-link" href="#" onClick ={onClickSettings}>Settings</a>
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