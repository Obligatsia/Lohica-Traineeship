import React, {Component} from 'react'
import { connect } from 'react-redux'
import { addValue } from '../actions/index'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Redirect } from 'react-router'
import {withRouter} from 'react-router-dom'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
const ValidationMethods = require ('../components/validationComponent.js');


const Validation = new ValidationMethods();

const myRouterComponent = withRouter (class Form extends Component {

    render(){
            let nameField;
            let surNameField;
            let emailField;
            let photoField;
            let genderField;
            let ageField;
            let middleNameField;
            let submitBtn;
        let imgFile;
        let newUser;

        let onNameChange= (e)=>{
                let val = e.target.value;
                let valid = Validation.validateName(nameField.value);
                this.props.dispatch(addValue('name', val, valid));
            if(valid){
                e.target.classList.remove('is-invalid');
                e.target.classList.add('is-valid');
            } else{
                e.target.classList.add('is-invalid');
                e.target.classList.remove('is-valid');
            }
            }
            let onSurNameChange= (e)=>{
                let val = e.target.value;
                let valid = Validation.validateName(surNameField.value);
                this.props.dispatch(addValue('surName', val, valid));
                if(valid){
                    e.target.classList.remove('is-invalid');
                    e.target.classList.add('is-valid');
                } else{
                    e.target.classList.add('is-invalid');
                    e.target.classList.remove('is-valid');
                }
            }
            let onEmailChange= (e)=>{
                let val = e.target.value;
                let valid = Validation.validateEmail(emailField.value);
                this.props.dispatch(addValue('email', val, valid));
                if(valid){
                    e.target.classList.remove('is-invalid');
                    e.target.classList.add('is-valid');
                } else{
                    e.target.classList.add('is-invalid');
                    e.target.classList.remove('is-valid');
                }
            }
            let onPhotoChange= (e)=>{
                let val = e.target.value;
                imgFile = e.target.files[0];
                let valid = Validation.validatePhoto(imgFile.name, imgFile.size);
                this.props.dispatch(addValue('photo', e.target.files[0], valid));
                if(valid){
                    e.target.classList.remove('is-invalid');
                    e.target.classList.add('is-valid');
                } else{
                    e.target.classList.add('is-invalid');
                    e.target.classList.remove('is-valid');
                }
            }
            let onGenderChange= (e)=>{
                let val = e.target.value;
                let valid = true;
                this.props.dispatch(addValue('gender', val, valid));
            }
            let onAgeChange= (e)=>{
                let val = e.target.value;
                let valid = Validation.validateAge(ageField.value);
                this.props.dispatch(addValue('age', val, valid));
                if(valid){
                    e.target.classList.remove('is-invalid');
                    e.target.classList.add('is-valid');
                } else{
                    e.target.classList.add('is-invalid');
                    e.target.classList.remove('is-valid');
                }
            }
            let onMiddleNameChange= (e)=>{
                let val = e.target.value;
                let valid = Validation.validateName(middleNameField.value);
                this.props.dispatch(addValue('middleName', val, valid));
                if(valid){
                    e.target.classList.remove('is-invalid');
                    e.target.classList.add('is-valid');
                } else{
                    e.target.classList.add('is-invalid');
                    e.target.classList.remove('is-valid');
                }
            }
        let form = document.getElementById('registerForm');

        let onSubmitForm = (e)=>{
            let valid=[];



            for (let name in this.props.user){
                for(let isValid in this.props.user[name]){
                    let valueValidated = this.props.user[name].isValid;
                    if(!valueValidated){
                        valid.push(this.props.user[name]);
                    }
                }
            }
            if(valid.length===0){
                document.getElementById('btnGroup').classList.remove('errorMsg');
                let user = this.props.user;
                let self = this;

                let userFormData = new FormData();
                userFormData.append('name', user.name.value);
                userFormData.append('surName', user.surName.value);
                userFormData.append('email', user.email.value);
                userFormData.append('photo', user.photo.value);
                userFormData.append('gender', user.gender.value);
                userFormData.append('age', user.age.value);
                userFormData.append('middleName', user.middleName.value);

                let sendUser = new XMLHttpRequest();
                sendUser.open('POST', 'http://localhost:8000/addUser', true);


                sendUser.onreadystatechange = function () {
                    if (sendUser.readyState === 4) {
                        if (sendUser.status !== 200) {
                            console.log(sendUser.status + ': ' + sendUser.statusText);
                        } else {
                            let resText =sendUser.responseText;
                            if(resText ==='emailError'){
                                document.getElementById('btnGroup').classList.remove('errorMsg');
                                document.getElementById('btnGroup').classList.add('emailErrorMsg');
                            } else {
                                resText = JSON.parse(resText);
                                for (var key in resText) {
                                    if(key==='password'){
                                        newUser = resText;
                                        self.props.history.push('/welcomePage', newUser);


                                    } else if(resText[key]==='nameValid') {
                                        if(!resText[key]){
                                            let form = document.getElementById('registerForm');
                                            for(let i=0; i<form.elements.length; i++){
                                                if(key===form.elements[i].id){
                                                    form.elements[i].classList.add('is-invalid');
                                                    form.elements[i].classList.remove('is-valid');
                                                } else {
                                                    form.elements[i].classList.remove('is-invalid');
                                                    form.elements[i].classList.add('is-valid');
                                                }
                                            }

                                        }
                                    }
                                }
                            };

                        }
                    }
                };
                sendUser.send(userFormData);

            } else{
                let form = document.getElementById('registerForm');
                document.getElementById('btnGroup').classList.add('errorMsg');
                for(let i=0; i<form.elements.length-2; i++){
                    if(!form.elements[i].value){
                        form.elements[i].classList.add('is-invalid');
                    } else form.elements[i].classList.remove('is-invalid');
                }
            }
        };
            return (
                <div>
                <form  className = 'row d-flex flex-column col-sm-3' id='registerForm'>
        <div className='form-group'>
                <label htmlFor ='name'>Enter your Name</label>
            <input  ref={node => nameField = node} className = 'form-control' type ='text' placeholder='John' id='name' onChange ={onNameChange}></input>
                <div className="invalid-feedback">Only latin letters</div>
            <small id="nameHelp" className="form-text text-muted">latin letters, length 1-32</small>
            </div>

            <div className='form-group'>
                <label htmlFor ='surname' >Enter your Surname</label>
            <input  ref={node => surNameField = node}  className = 'form-control' type ='text' placeholder='Smith' id='surname' onChange ={onSurNameChange} ></input>
                <div className="invalid-feedback">Only latin letters</div>
            <small id="surNameHelp" className="form-text text-muted">latin letters, length 1-32</small>
            </div>

            <div className='form-group'>
                <label htmlFor ='email'>Enter your e-mail</label>
            <input  ref={node => emailField = node} className = 'form-control' type ='text' placeholder='johnsmith@gmail.com' id='email' onChange ={onEmailChange}></input>
                <div className="invalid-feedback">Please, enter correct email</div>
            <small id="emailHelp" className="form-text text-muted">f.e. 'johnsmith@gmail.com'</small>
            </div>

            <div className='form-group'>
                <label htmlFor ='photo'>Choose photo</label>
            <input  ref={node => photoField = node} className = 'form-control' type ='file' id='photo' onChange ={onPhotoChange} name = 'photo'></input>
                <div className="invalid-feedback">Files formate only JPEG, JPG, PNG (40kb - 5mb)</div>
            <small id="emailHelp" className="form-text text-muted">size between 40kb and 5mb</small>
            </div>

            <div className='form-group'>
                <label htmlFor='gender'>Select your gender</label>
            <select  ref={node => genderField = node} className = 'form-control' id='gender' onChange ={onGenderChange}>
                <option value = 'male'>Male</option>
                <option value = 'female'>Female</option>
                </select>
                </div>
                <div className='form-group'>
                <label htmlFor ='age' >Select your age</label>
            <input  ref={node => ageField = node} className = 'form-control' type ='number' id='age'  placeholder = '18' onChange ={onAgeChange}></input>
                <div className="invalid-feedback">Please, enter correct age</div>
            </div>

            <div className='form-group'>
                <label htmlFor ='middleName' id='optional' >Enter your Middle Name</label>
            <input  ref={node => middleNameField = node} className = 'form-control' type ='text' placeholder='Brown' id='middleName' onChange ={onMiddleNameChange}></input>
                <div className="invalid-feedback">Only latin letters</div>
            <small id="middleNameHelp" className="form-text text-muted">latin letters, length 1-32</small>
            </div>

            <div className='form-group' id='btnGroup'>
                <input type ='button' ref={node => submitBtn = node} className='btn btn-primary' id='submitBtn' onClick = {onSubmitForm} value='Save'></input>
            </div>
            </form>
            </div>
        )
        }
    })

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

export default connect(mapStateToProps, mapDispatchToProps)(myRouterComponent)
