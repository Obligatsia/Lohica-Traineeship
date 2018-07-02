import React, {Component} from 'react'
import { connect } from 'react-redux'
import { addValue } from '../actions/index'
import {withRouter} from 'react-router-dom'
import $ from 'jquery'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
const Validation = require ('../components/validationComponent.js');
const SendRequest = require ('../components/Requests.js');
const {addUserUrl} = require('../constants');

const myRouterComponent = withRouter (class Form extends Component {

    successFunc (data, btnGroup, form, props){
            if(data ==='emailError'){
                $(btnGroup).removeClass('errorMsg');
                $(btnGroup).addClass('emailErrorMsg');
            } else {
                $(btnGroup).removeClass('emailErrorMsg');
                for (let key in data) {
                    if(key==='password'){
                        props.dispatch(addValue('password', data.password, true));
                        props.history.push('/welcomePage');
                    } else if(data[key]==='nameValid') {
                        if(!data[key]){
                            for(let i=0; i<form.elements.length; i++){
                                this.classToggle((key===form.elements[i].id), form.elements[i]);
                            }
                        }
                    }
                }
            }
    }

    classToggle =(valid, target)=>{
        if(valid){
            target.classList.remove('is-invalid');
            target.classList.add('is-valid');
        } else{
            target.classList.add('is-invalid');
            target.classList.remove('is-valid');
        }
    }

    onChange= (e, field, validMethod, name)=>{
        let val = e.target.value;
        let valid = validMethod(field.value);
        this.props.dispatch(addValue(name, val, valid));
        this.classToggle(valid, e.target);
    }

    onPhotoChange= (e, validMethod, name, img)=>{
            img = e.target.files[0];
            let valid;
            if(e.target.value){
                valid = validMethod(img.name, img.size);
            } else{
                valid = false;
            }
            this.props.dispatch(addValue(name, e.target.files[0], valid));
            this.classToggle(valid, e.target);
    }

    onMiddleNameChange= (e, field, validMethod, name)=>{
        let val = e.target.value;
        let valid;
        valid=val?validMethod(field.value):true;
        this.props.dispatch(addValue(name, val, valid));
        if(!val||valid){
            e.target.classList.remove('is-invalid');
            e.target.classList.add('is-valid');
        } else{
            e.target.classList.add('is-invalid');
            e.target.classList.remove('is-valid');
        }
    }

    onSubmit = (e, form)=>{
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

            let userFormData = new FormData();
            userFormData.append('name', user.name.value);
            userFormData.append('surName', user.surName.value);
            userFormData.append('email', user.email.value);
            userFormData.append('photo', user.photo.value);
            userFormData.append('gender', user.gender.value);
            userFormData.append('age', user.age.value);
            userFormData.append('middleName', user.middleName.value);

            SendRequest.sendForRegistration(addUserUrl, 'POST', userFormData, this.successFunc, $('#btnGroup'), form, this.props)
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

    render(){
            let nameField;
            let surNameField;
            let emailField;
            let ageField;
            let genderField;
            let middleNameField;
            let imgFile;
            let form = document.getElementById('registerForm');

            return (
                <div>
                <form  className = 'row d-flex flex-column col-sm-3' id='registerForm'>
        <div className='form-group'>
                <label htmlFor ='name'>Enter your Name</label>
            <input onChange={(e)=>this.onChange(e, nameField, Validation.validateName, 'name')} ref={node => nameField = node} className = 'form-control' type ='text' placeholder='John' id='name' ></input>
            <div className="invalid-feedback">Only latin letters</div>
            <small id="nameHelp" className="form-text text-muted">latin letters, length 1-32</small>
            </div>

            <div className='form-group'>
                <label htmlFor ='surname' >Enter your Surname</label>
            <input  ref={node => surNameField = node}  className = 'form-control' type ='text' placeholder='Smith' id='surname' onChange={(e)=>this.onChange(e, surNameField, Validation.validateName, 'surName')}></input>
                <div className="invalid-feedback">Only latin letters</div>
            <small id="surNameHelp" className="form-text text-muted">latin letters, length 1-32</small>
            </div>

            <div className='form-group'>
                <label htmlFor ='email'>Enter your e-mail</label>
            <input  ref={node => emailField = node} className = 'form-control' type ='text' placeholder='johnsmith@gmail.com' id='email' onChange={(e)=>this.onChange(e, emailField, Validation.validateEmail, 'email')}></input>
                <div className="invalid-feedback">Please, enter correct email</div>
            <small id="emailHelp" className="form-text text-muted">f.e. 'johnsmith@gmail.com'</small>
            </div>

            <div className='form-group'>
                <label htmlFor ='photo'>Choose photo</label>
            <input  className = 'form-control' type ='file' id='photo' onChange={(e)=>this.onPhotoChange(e, Validation.validatePhoto, 'photo', imgFile)} name = 'photo'></input>
                <div className="invalid-feedback">Files formate only JPEG, JPG, PNG (40kb - 5mb)</div>
            <small id="photoHelp" className="form-text text-muted">size between 40kb and 5mb</small>
            </div>

            <div className='form-group'>
                <label htmlFor='gender'>Select your gender</label>
            <select  className = 'form-control' id='gender' onChange={(e)=>this.onChange(e, genderField, true, 'gender')}>
                <option value = 'male'>Male</option>
                <option value = 'female'>Female</option>
                </select>
                </div>
                <div className='form-group'>
                <label htmlFor ='age' >Select your age</label>
            <input  ref={node => ageField = node} className = 'form-control' type ='number' id='age'  placeholder = '18'

        onChange={(e)=>this.onChange(e, ageField, Validation.validateAge, 'age')}

    ></input>
                <div className="invalid-feedback">Please, enter correct age</div>
            </div>

            <div className='form-group'>
                <label htmlFor ='middleName' id='optional' >Enter your Middle Name</label>
            <input  ref={node => middleNameField = node} className = 'form-control' type ='text' placeholder='Brown' id='middleName' onChange={(e)=>this.onMiddleNameChange(e, middleNameField, Validation.validateName, 'middleName')}></input>
                <div className="invalid-feedback">Only latin letters</div>
            <small id="middleNameHelp" className="form-text text-muted">latin letters, length 1-32</small>
            </div>

            <div className='form-group' id='btnGroup'>
                <input type ='button' className='btn btn-primary' onClick = {(e)=>this.onSubmit(form)} value='Save'></input>
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
