import React, {Component} from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import $ from 'jquery'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import {addValue} from "../actions";
const {sendAuthUserUrl} = require('../constants');


const LogInRouterComponent = withRouter(
    class LogInForm extends Component {
        render(){
            let emailField;
            let psdField;
            let logInBtn;

            var user = this.props.location.state;
            var userToChange = this.props.user;

            let onEmailChange= (e)=>{
                let val = e.target.value;
                let valid;
                this.props.dispatch(addValue('email', val, valid));
            }

            let onPsdChange= (e)=>{
                let val = e.target.value;
                let valid;
                this.props.dispatch(addValue('password', val, valid));
            }

            let form = document.getElementById('logInForm');
            let onLogIn = (e)=>{
                const self = this;

                let userInfo = {
                    name: user.name,
                    surName: user.surName,
                    email: user.email,
                    photo: user.photo,
                    gender: user.gender,
                    age: user.age,
                    middleName: user.middleName,
                    password:user.password,
                };

                if(!emailField.value||!psdField.value){
                    document.getElementById('btnGroup').classList.add('errorMsg');
                    document.getElementById('btnGroup').classList.remove('invalidPsdMsg');
                    document.getElementById('btnGroup').classList.remove('invalidEmailMsg');
                } else{
                    document.getElementById('btnGroup').classList.remove('errorMsg');

                    let authorizedUser = {email: userToChange.email.value, password: userToChange.password.value};
                    let jsonAuthUser = JSON.stringify(authorizedUser);
                    console.log(jsonAuthUser);
                    $.ajax({
                        url: sendAuthUserUrl,
                        method: 'POST',
                        data: jsonAuthUser,
                        contentType: 'application/json; charset=utf-8',
                        success: function(data){
                            console.log(data);

                            if(data==='invalidPsd'){
                                document.getElementById('btnGroup').classList.remove('errorMsg');
                                document.getElementById('btnGroup').classList.add('invalidPsdMsg');
                                document.getElementById('btnGroup').classList.remove('invalidEmailMsg');

                            } else if(data==='invalidEmail') {
                                document.getElementById('btnGroup').classList.remove('errorMsg');
                                document.getElementById('btnGroup').classList.remove('invalidPsdMsg');
                                document.getElementById('btnGroup').classList.add('invalidEmailMsg');
                            } else{
                                document.getElementById('btnGroup').classList.remove('errorMsg');
                                document.getElementById('btnGroup').classList.remove('invalidPsdMsg');
                                document.getElementById('btnGroup').classList.remove('invalidEmailMsg');
                                self.props.history.push('/userPage', userInfo);
                            }
                        },
                        // beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + tokenString ) },
                        error: ((data)=>{
                            console.log(data.status + ': ' + data.statusText);
                        })
                    })
                }
            };

            return(
                <div>
                <form  className = 'row d-flex flex-column col-sm-3' id='logInForm'>
                <div className='form-group'>
                <label htmlFor ='email'>Enter your e-mail</label>
            <input  ref={node => emailField = node} className = 'form-control' type ='text' placeholder='email here' id='email' onChange ={onEmailChange}></input>
                <div className="invalid-feedback">Please, enter correct email</div>
            </div>
            <div className='form-group'>
                <label htmlFor ='psd'>Enter your password</label>
            <input  ref={node => psdField = node} className = 'form-control' type ='password' placeholder='password here' id='psd' onChange ={onPsdChange}></input>
                <div className="invalid-feedback">Please, enter correct password</div>
            </div>
            <div className='form-group' id='btnGroup'>
                <input type ='button' ref={node => logInBtn = node} className='btn btn-primary' id='logInBtn' onClick = {onLogIn} value='Log In'></input>
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
