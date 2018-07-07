import React, {Component} from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import $ from 'jquery'
import MyRouterComponent from './Form';
import Validation from './validationComponent.js';
import UserBlockRouteComponent from './Nav.js';
import AjaxRequest from './Requests.js';
import {editUserUrl, logIn} from '../constants';
import {InfoDiv, PhotoDiv, GenderDiv, Input} from './Tags';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import {addValue} from "../actions";


const myMainComponent = withRouter (class Main extends Component {
    constructor(props) {
        super(props);

        this.onChange = MyRouterComponent.onChange.bind(this);
        this.onPhotoChange = MyRouterComponent.onPhotoChange.bind(this);
        this.onMiddleNameChange = MyRouterComponent.onMiddleNameChange.bind(this);
        this.editElement = this.editElement.bind(this);
        if(!localStorage.getItem('user')){
            this.props.history.push(logIn);
        }


    }


    showInputs (showOne, showTwo, showThree,  showFour, hideOne, hideTwo, hideThree,){
        $(hideOne).addClass('hidden');
        $(hideTwo).addClass('hidden');
        $(hideThree).addClass('hidden');
        $(showOne).removeClass('hidden');
        $(showTwo).removeClass('hidden');
        $(showThree).removeClass('hidden');
        $(showFour).removeClass('hidden');
    }

    successFunc (data, ...args){
        console.log(data);
        if(data==='emailError'){
            $('#email').addClass('is-invalid');
        } else{
            for (let key in data) {
                if(data[key]==='nameValid') {
                    if(!data[key]){
                        console.log(data[key]);
                    }
                } else{
                    let props = args[0];
                    let showInputs = args[1];
                    let user = args[2];
                    let changeState = args[3];
                    showInputs ($('#editInputs'), null, null, null,$('#saveChanges'), $('.hiddenInput'), $('#cancelChanges') );
                    let jsonUser = JSON.stringify(data);
                    localStorage.setItem('user', jsonUser);
                    changeState(user, props);
                }

            }
        }

    }

    editElement (e, user, props){
        UserBlockRouteComponent.changeState(user, props);
        let parent = e.target.parentNode.parentNode;
        let editField=parent.childNodes[parent.childNodes.length-1];
        this.showInputs($('#saveChanges'), $('#cancelChanges'), editField, null, $('#editInputs'), null,  null);
    }

    editInputs(e, user, props){
            UserBlockRouteComponent.changeState(user, props);
        this.showInputs($('#saveChanges'), $('#cancelChanges'), $('.hiddenInput'), $('.middleNameBlock'), null, e.target, null, );
    }

    saveChanges(e){
        let inputs = document.getElementsByClassName('hiddenInput');

        const inValidElements=[];
        for(let i=0; i<inputs.length; i++){


            if((!inputs[i].childNodes[0].value)&&(inputs[i].childNodes[0].id!==('middleName'))&&(inputs[i].childNodes[0].id!==('middleNameBtn'))&&(inputs[i].childNodes[0].id!==('photo'))){
                inputs[i].childNodes[0].classList.add('is-invalid');
                inValidElements.push(inputs[i].childNodes[0]);
            } else if(!$(inputs[i].childNodes[0]).hasClass('is-invalid')) {
                inputs[i].childNodes[0].classList.remove('is-invalid');
            }
        }
        if(!inValidElements.length){
            const userLocal = JSON.parse(localStorage.getItem('user'));

            let user = this.props.user;
            let userFormData = new FormData();
            userFormData.append('name', user.name.value);
            userFormData.append('surName', user.surName.value);
            userFormData.append('email', user.email.value);
            userFormData.append('photo', user.photo.value);
            userFormData.append('gender', user.gender.value);
            userFormData.append('age', user.age.value);
            userFormData.append('middleName', user.middleName.value);
            userFormData.append('id', userLocal._id);
            userFormData.append('token', userLocal.token);

            AjaxRequest.sendRequest(editUserUrl, 'POST', userFormData, false, false, user.token, this.successFunc, this.props, this.showInputs, user, UserBlockRouteComponent.changeState )
        }
    }


    cancelChanges(e){
        this.showInputs ($('#editInputs'), null, null, null,$('#saveChanges'), $('.hiddenInput'), e.target)
    }


    render(){
        const user = JSON.parse(localStorage.getItem('user'));

        const photoArr= user.photo.path.split('\\');
        const photoPath = photoArr[1]+'/'+photoArr[2];



        return (
        <div className ='d-flex userInfo'>

            <PhotoDiv photoPath = {photoPath} function = {(e)=>MyRouterComponent.onPhotoChange(e, Validation.validatePhoto, 'photo', this.props)} editFunc = {(e)=>this.editElement(e, user, this.props)} stateValue={this.props.user.photo.path} feedback='Files formate only JPEG, JPG, PNG (40kb - 5mb)'/>

            <div className = 'infoBlock d-flex flex-column col-sm-7'>

            <InfoDiv class='surNameBlock d-flex' name = 'SurName:' value={user.surName} type='text' id='surName' function = {(e)=>MyRouterComponent.onChange(e, Validation.validateName, 'surName', this.props)} editFunc = {(e)=>this.editElement(e, user, this.props)} stateValue={this.props.user.surName.value} feedback='Only latin letters'/>

        <InfoDiv class='nameBlock d-flex' name = 'Name:' value={user.name} type='text' id='name' function = {(e)=>MyRouterComponent.onChange(e, Validation.validateName, 'name', this.props)}  editFunc = {(e)=>this.editElement(e, user, this.props)} stateValue={this.props.user.name.value} feedback='Only latin letters'/>

        <InfoDiv class='middleNameBlock d-flex' name = 'MiddleName:' value={user.middleName} type='text' id='middleName' function = {(e)=>MyRouterComponent.onMiddleNameChange(e, Validation.validateName, 'middleName', this.props)}  editFunc = {(e)=>this.editElement(e, user, this.props)} stateValue={this.props.user.middleName.value} feedback='Only latin letters'/>

        <InfoDiv class='emailBlock d-flex' name = 'Email:' value={user.email} type='text' id='email' function = {(e)=>MyRouterComponent.onChange(e, Validation.validateEmail, 'email', this.props)}  editFunc = {(e)=>this.editElement(e, user, this.props)} stateValue={this.props.user.email.value} feedback='Please, enter correct email'/>

        <InfoDiv class='ageBlock d-flex' name = 'Age:' value={user.age} type='number' id='age' function = {(e)=>MyRouterComponent.onChange(e, Validation.validateAge, 'age', this.props)}  editFunc = {(e)=>this.editElement(e, user, this.props)} stateValue={this.props.user.age.value} feedback='Please, enter correct age'/>

        <GenderDiv function = {(e)=>MyRouterComponent.onChange(e, Validation.validateGender, 'gender', this.props)} optionValue={this.props.user.gender.value} name = {user.gender}  editFunc = {(e)=>this.editElement(e, user, this.props)}/>

            <p className = 'buttons'>
            <input type ='button' className='btn btn-primary' id='editInputs' value='Edit all' onClick = {(e)=>this.editInputs(e, user, this.props)}></input>
        <input type ='button' className='btn btn-success hidden' id='saveChanges' value='Save' onClick = {(e)=>this.saveChanges(e)}></input>
        <input type ='button' className='btn btn-danger hidden' id='cancelChanges' value='Cancel' onClick = {(e)=>this.cancelChanges(e)}></input>
            </p>

            </div>
            </div>
    )
    }
})

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

export default connect(mapStateToProps, mapDispatchToProps)(myMainComponent)