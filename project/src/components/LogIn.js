import React, {Component} from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import {addValue} from "../actions";

const LogInRouterComponent = withRouter(
    class LogInForm extends Component {
        render(){
            let emailField;
            let psdField;
            let logInBtn;

            let onEmailChange= (e)=>{
                let val = e.target.value;
                let valid;
                this.props.dispatch(addValue('email', val, valid));
            }

            let onPsdChange= (e)=>{
                let val = e.target.value;
                let valid;
                this.props.dispatch(addValue('psd', val, valid));
            }

            let form = document.getElementById('logInForm');
            let onLogIn = (e)=>{
                const self = this;

                let user = this.props.user;
                let userInfo = {
                    name: this.props.user.name.value,
                    surName: this.props.user.surName.value,
                    email: this.props.user.email.value,
                    photo: this.props.user.photo.value,
                    gender: this.props.user.gender.value,
                    age: this.props.user.age.value,
                    middleName: this.props.user.middleName.value,
                    password: this.props.user.psd.value,
                };

                if(!emailField.value||!psdField.value){
                    document.getElementById('btnGroup').classList.add('errorMsg');
                    document.getElementById('btnGroup').classList.remove('invalidPsdMsg');
                    document.getElementById('btnGroup').classList.remove('invalidEmailMsg');
                } else{
                    document.getElementById('btnGroup').classList.remove('errorMsg');

                    let authorizedUser = {email: user.email.value, password: user.psd.value};
                    let jsonAuthUser = JSON.stringify(authorizedUser);

                    let sendAuthorizedUser = new XMLHttpRequest();
                    sendAuthorizedUser.open('POST', 'http://localhost:8000/sendAuthorizedUser', true);
                    sendAuthorizedUser.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                    // sendAuthorizedUser.setRequestHeader('Authorization', 'bearer ' + getToken())

                    sendAuthorizedUser.onreadystatechange = function () {
                        if (sendAuthorizedUser.readyState === 4) {
                            if (sendAuthorizedUser.status !== 200) {
                                console.log(sendAuthorizedUser.status + ': ' + sendAuthorizedUser.statusText);
                            } else {
                                let resText =sendAuthorizedUser.responseText;

                                if(resText==='invalidPsd'){
                                    document.getElementById('btnGroup').classList.remove('errorMsg');
                                    document.getElementById('btnGroup').classList.add('invalidPsdMsg');
                                    document.getElementById('btnGroup').classList.remove('invalidEmailMsg');

                                } else if(resText==='invalidEmail') {
                                    document.getElementById('btnGroup').classList.remove('errorMsg');
                                    document.getElementById('btnGroup').classList.remove('invalidPsdMsg');
                                    document.getElementById('btnGroup').classList.add('invalidEmailMsg');
                                } else{
                                    document.getElementById('btnGroup').classList.remove('errorMsg');
                                    document.getElementById('btnGroup').classList.remove('invalidPsdMsg');
                                    document.getElementById('btnGroup').classList.remove('invalidEmailMsg');
                                    console.log(resText);
                                    self.props.history.push('/userPage', userInfo);

                                }
                            }
                        }
                    };
                    sendAuthorizedUser.send(jsonAuthUser);
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
