import React, {Component} from 'react'
import { connect } from 'react-redux'
import { addValue } from '../actions/index'
import {withRouter} from 'react-router-dom'
import $ from 'jquery'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import {logIn} from "../constants";
const Validation = require ('./validationComponent.js');
const AjaxRequest = require ('./Requests.js');
const {addUserUrl, welcomePage, main} = require('../constants');
const {Input, FormGroup, SelectTag} =require ('./Tags');



const myRouterComponent = withRouter (class Form extends Component {
    constructor(props) {
        super(props);
        this.onChange = myRouterComponent.onChange.bind(this);
        this.onPhotoChange = myRouterComponent.onPhotoChange.bind(this);
        this.onMiddleNameChange = myRouterComponent.onMiddleNameChange.bind(this);
    }

    successFunc (data, ...args ){
        let btnGroup=args[0];
        let form=args[1];
        let props=args[2];
            if(data ==='emailError'){
                $(btnGroup).removeClass('errorMsg');
                $(btnGroup).addClass('emailErrorMsg');
            } else {
                $(btnGroup).removeClass('emailErrorMsg');
                for (let key in data) {
                    if(key==='password'){
                        props.dispatch(addValue('password', data.password, true));
                        props.history.push(welcomePage);
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


    static classToggle (valid, target){
        if(valid){
            target.classList.remove('is-invalid');
            target.classList.add('is-valid');
        } else{
            target.classList.add('is-invalid');
            target.classList.remove('is-valid');
        }
    }

    static onChange(e, validMethod, name, props){
        let val = e.target.value;
        let valid=validMethod(val);
        props.dispatch(addValue(name, val, valid));
        myRouterComponent.classToggle(valid, e.target);
    }

    static onPhotoChange (e, validMethod, name, props){
            let img = e.target.files[0];
            let valid = validMethod(img);
            props.dispatch(addValue(name, e.target.files[0], valid));
            myRouterComponent.classToggle(valid, e.target);
    }

    static onMiddleNameChange (e, validMethod, name, props){
        let val = e.target.value;
        let valid=val?validMethod(val):true;
        props.dispatch(addValue(name, val, valid));
        myRouterComponent.classToggle ((!val||valid), e.target);
    }

    onSubmitForm (e, form){
        let inValidElements=[];
        for (let name in this.props.user){
            for(let isValid in this.props.user[name]){
                let valueValidated = this.props.user[name].isValid;
                if(!valueValidated){
                    inValidElements.push(this.props.user[name]);
                }
            }
        }
        if(!inValidElements.length){
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

            AjaxRequest.sendRequest(addUserUrl, 'POST', userFormData, false, false, user.token, this.successFunc, $('#btnGroup'), form, this.props)
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
        const user = JSON.parse(localStorage.getItem('user'));

            let form = document.getElementById('registerForm');
    return (
                <div>
                <form  className = 'row d-flex flex-column col-sm-3' id='registerForm'>
            <FormGroup id='name' task='Enter your Name' type='text' placeholder='Ivan' func={(e)=>myRouterComponent.onChange(e, Validation.validateName, 'name', this.props)} feedback='Only latin letters' helpId='nameHelp' helpText='latin letters, length 1-32'/>

            <FormGroup id='surname' task='Enter your Surname' type='text' placeholder='Smith' func={(e)=>myRouterComponent.onChange(e, Validation.validateName, 'surName', this.props)} feedback='Only latin letters' helpId='surNameHelp' helpText='latin letters, length 1-32'/>

            <FormGroup id='email' task='Enter your e-mail' type='text' placeholder='johnsmith@gmail.com' func={(e)=>myRouterComponent.onChange(e, Validation.validateEmail, 'email', this.props)} feedback='Please, enter correct email' helpId='emailHelp' helpText='f.e. johnsmith@gmail.com'/>

            <FormGroup id='photo' task='Choose photo' type='file' func={(e)=>myRouterComponent.onPhotoChange(e, Validation.validatePhoto, 'photo', this.props)} feedback='Files formate only JPEG, JPG, PNG (40kb - 5mb)' helpId='photoHelp' helpText='size between 40kb and 5mb'/>

            <SelectTag func={(e)=>myRouterComponent.onChange(e, Validation.validateGender, 'gender', this.props)}/>

        <FormGroup id='age' task='Select your age' type='number' placeholder='18' func={(e)=>myRouterComponent.onChange(e, Validation.validateAge, 'age', this.props)} feedback='Please, enter correct age' />

            <FormGroup id='middleName' labelId='optional' task='Enter your Middle Name' type='text' placeholder='Brown' func={(e)=>myRouterComponent.onMiddleNameChange(e, Validation.validateName, 'middleName', this.props)} feedback='Only latin letters' helpId='surNameHelp' helpText='latin letters, length 1-32'/>

            <div className='form-group' id='btnGroup'>
                <input type ='button' className='btn btn-primary' onClick = {(e)=>this.onSubmitForm(e, form)} value='Save'></input>
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
