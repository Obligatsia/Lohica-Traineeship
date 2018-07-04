import React, {Component} from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import $ from 'jquery'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import {addValue} from "../actions";
const {sendAuthUserUrl, main} = require('../constants');
const AjaxRequest = require ('../components/Requests.js');


const LogInRouterComponent = withRouter(
    class LogInForm extends Component {
        toggleClasses(btnGroup, classOne, classTwo, classThree, classFour){
        $(btnGroup).removeClass(classOne);
        $(btnGroup).addClass(classTwo);
        $(btnGroup).removeClass(classThree);
        $(btnGroup).removeClass(classFour);
    }

    saveToLocalStorage (user){
            let jsonUser = JSON.stringify(user);
            localStorage.setItem('user', jsonUser);
    }

        successFunc(newData, ...args){
            let btnGroup = args[0];
            let props = args[1];
            let toggleClasses = args[2];
            let saveToLocalStorage = args[3];

            props.dispatch(addValue('token', newData.token, true));
            if(newData==='invalidPsd'){
                toggleClasses(btnGroup, 'errorMsg', 'invalidPsdMsg', 'invalidEmailMsg', null )
            } else if(newData==='invalidEmail') {
                toggleClasses(btnGroup, 'errorMsg', 'invalidEmailMsg', 'invalidPsdMsg', null )
            } else{
                newData.user.token = newData.token;
                saveToLocalStorage(newData.user);
                toggleClasses(btnGroup, 'errorMsg', null, 'invalidEmailMsg', 'invalidPsdMsg')
                props.history.push(main);
            }
        }

        onChange(e, field, name){
            let val = e.target.value;
            let valid;
            this.props.dispatch(addValue(name, val, valid));
        }

        onClick (e, emailField, psdField, user){
                if(!emailField.value||!psdField.value){
                    this.toggleClasses($('#btnGroup'), 'invalidPsdMsg', 'errorMsg', 'invalidEmailMsg', null )
                } else{
                    $('#btnGroup').removeClass('errorMsg');
                    let authorizedUser = {email: user.email.value, password: user.password.value};
                    let jsonAuthUser = JSON.stringify(authorizedUser);
                    AjaxRequest.sendRequest(sendAuthUserUrl, 'POST', jsonAuthUser, 'application/json; charset=utf-8', true, user.token, this.successFunc, $('#btnGroup'), this.props, this.toggleClasses, this.saveToLocalStorage);
                }
        }

        render(){
            let emailField;
            let psdField;
            const user = this.props.user;
            let form = document.getElementById('logInForm');

            return(
                <div>
                <form  className = 'row d-flex flex-column col-sm-3' id='logInForm'>
                <div className='form-group'>
                <label htmlFor ='email'>Enter your e-mail</label>
            <input  ref={node => emailField = node} className = 'form-control' type ='text' placeholder='email here' id='email' onChange ={(e)=>{this.onChange(e, emailField, 'email')}}></input>
                <div className="invalid-feedback">Please, enter correct email</div>
            </div>
            <div className='form-group'>
                <label htmlFor ='psd'>Enter your password</label>
            <input  ref={node => psdField = node} className = 'form-control' type ='password' placeholder='password here' id='psd' onChange ={(e)=>{this.onChange(e, psdField, 'password')}}></input>
                <div className="invalid-feedback">Please, enter correct password</div>
            </div>
            <div className='form-group' id='btnGroup'>
                <input type ='button' className='btn btn-primary' onClick ={(e)=>{this.onClick(e,emailField, psdField, user)}} value='Log In'></input>
                </div>
                </form>
                </div>
        )
        }
    }
)

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInRouterComponent)
