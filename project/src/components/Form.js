import React, {Component} from 'react'
import { connect } from 'react-redux'
import { addValue } from '../actions/index'
import {withRouter} from 'react-router-dom'
import $ from 'jquery'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
const Validation = require ('../components/validationComponent.js');
const {addUserUrl} = require('../constants');

const myRouterComponent = withRouter (class Form extends Component {

    render(){
            let nameField;
            let surNameField;
            let emailField;
            let ageField;
            let middleNameField;
        let imgFile;

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
                let valid;
                if(val){
                    valid = Validation.validateName(middleNameField.value);
                } else{
                    valid = true;
                }
                console.log(valid);
                this.props.dispatch(addValue('middleName', val, valid));
                if(!val||valid){
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
            if(!valid.length){
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


                $.ajax({
                    url: addUserUrl,
                    method: 'POST',
                    data: userFormData,
                    contentType: false,
                    processData: false,
                    success: function(data){
                        if(data ==='emailError'){
                            $('#btnGroup').removeClass('errorMsg');
                            $('#btnGroup').addClass('emailErrorMsg');
                        } else {
                            let resText = data;
                            for (let key in resText) {
                                if(key==='password'){
                                    self.props.dispatch(addValue('password', resText.password, true));
                                    self.props.history.push('/welcomePage');
                                } else if(resText[key]==='nameValid') {
                                    if(!resText[key]){
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
                        }
                    },
                    error: ((data)=>{
                        console.log(data.status + ': ' + data.statusText);
                    })
                });
            } else{
                let form = document.getElementById('registerForm');
                $('#btnGroup').addClass('errorMsg');
                for(let i=0; i<form.elements.length-2; i++){
                    if(!form.elements[i].value){
                        form.elements[i].classList.add('is-invalid');
                    }
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
            <input  className = 'form-control' type ='file' id='photo' onChange ={onPhotoChange} name = 'photo'></input>
                <div className="invalid-feedback">Files formate only JPEG, JPG, PNG (40kb - 5mb)</div>
            <small id="emailHelp" className="form-text text-muted">size between 40kb and 5mb</small>
            </div>

            <div className='form-group'>
                <label htmlFor='gender'>Select your gender</label>
            <select  className = 'form-control' id='gender' onChange ={onGenderChange}>
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
                <input type ='button' className='btn btn-primary' onClick = {onSubmitForm} value='Save'></input>
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
