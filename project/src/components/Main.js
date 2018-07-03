import React, {Component} from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import $ from 'jquery'
import MyRouterComponent from './Form';
import Validation from './validationComponent.js';
import SendRequest from './Requests.js';
import {editUserUrl} from '../constants';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import {addValue} from "../actions";


const myMainComponent = withRouter (class Main extends Component {
    successFunc (data, btnGroup, form, props){
        console.log(data);
    }


    editInputs(e){
        $(e.target).addClass('hidden');
        $('#saveChanges').removeClass('hidden');
        $('#cancelChanges').removeClass('hidden');
        $('.hiddenInput').removeClass('hidden');
    }

    onChange(e, field, validMethod, name){
        let val = e.target.value;
        let valid=(validMethod===true)?true: validMethod(field.value);
        this.props.dispatch(addValue(name, val, valid));
        MyRouterComponent.classToggle(valid, e.target);
    }
    onPhotoChange (e, validMethod, name){
        let img = e.target.files[0];
        let valid = validMethod(img);;
        this.props.dispatch(addValue(name, e.target.files[0], valid));
        MyRouterComponent.classToggle(valid, e.target);
    }

    onMiddleNameChange (e, field, validMethod, name){
        let val = e.target.value;
        let valid=val?validMethod(field.value):true;
        this.props.dispatch(addValue(name, val, valid));
        MyRouterComponent.classToggle ((!val||valid), e.target)
    }

    saveChanges(e){
        let inputs = document.getElementsByClassName('hiddenInput');
        const inValidElements=[];
        for(let i=0; i<inputs.length; i++){
            let name = inputs[i].childNodes[0].name;
            if((!inputs[i].childNodes[0].value)&&(inputs[i].childNodes[0].name!=='middleName')){
                inputs[i].childNodes[0].classList.add('is-invalid');
                inValidElements.push(inputs[i].childNodes[0]);
            } else if(!$(inputs[i].childNodes[0]).hasClass('is-invalid')) {
                inputs[i].childNodes[0].classList.remove('is-invalid');
            }
        }
        if(!inValidElements.length){
            let user = this.props.user;
            let userFormData = new FormData();
            userFormData.append('name', user.name.value);
            userFormData.append('surName', user.surName.value);
            userFormData.append('email', user.email.value);
            userFormData.append('photo', user.photo.value);
            userFormData.append('gender', user.gender.value);
            userFormData.append('age', user.age.value);
            userFormData.append('middleName', user.middleName.value);

            SendRequest.sendForEdition(editUserUrl, 'POST', userFormData, this.successFunc, this.props)
        }
    }


    cancelChanges(e){
        $('#editInputs').removeClass('hidden');
        $('#saveChanges').addClass('hidden');
        $(e.target).addClass('hidden');
        $('.hiddenInput').addClass('hidden');
    }


    render(){
        const user = JSON.parse(localStorage.getItem('user'));

        const photoArr= user.photo.path.split('\\');
        const photoPath = photoArr[1]+'/'+photoArr[2];
        let nameField;
        let surNameField;
        let emailField;
        let ageField;
        let genderField;
        let middleNameField;

        return (
        <div className ='d-flex userInfo'>

            <div className = 'photoBlock d-flex flex-column col-sm-4'>
            <div className = 'col-sm-12'>
            <p><img src={photoPath} ></img></p>
            <p className = 'hidden hiddenInput'>
            <input onChange={(e)=>this.onPhotoChange(e, Validation.validatePhoto, 'photo')} className = 'form-control' type ='file' name = 'photo'>
            </input> </p>
            </div>
            </div>


            <div className = 'infoBlock d-flex flex-column col-sm-6'>
            <div className = 'surNameBlock d-flex'>
            <p>Surname:</p>
            <p>{user.surName}</p>
            <p className = 'hidden hiddenInput'>
            <input onChange={(e)=>this.onChange(e, surNameField, Validation.validateName, 'surName')} ref={node => surNameField = node} className = 'form-control' type ='text' name = 'surName' placeholder='surName'></input>
            </p>
            </div>

            <div className = 'nameBlock d-flex'>
            <p>Name: </p>
            <p>{user.name}</p>
            <p className = 'hidden hiddenInput'>
            <input onChange={(e)=>this.onChange(e, nameField, Validation.validateName, 'name')} ref={node => nameField = node} className = 'form-control' type ='text' name = 'name' placeholder='name'></input>
            </p>
            </div>

            <div className = 'middleNameBlock d-flex'>
            <p>Middlename:</p>
        <p>{user.middleName}</p>
        <p className = 'hidden hiddenInput'>
            <input onChange={(e)=>this.onMiddleNameChange(e, middleNameField, Validation.validateName, 'middleName')} ref={node => middleNameField = node} className = 'form-control' type ='text' name = 'middleName' placeholder='middleName'></input>
            </p>
            </div>

            <div className = 'emailBlock d-flex'>
            <p>Email:</p>
        <p>{user.email}</p>
        <p className = 'hidden hiddenInput'>
            <input onChange={(e)=>this.onChange(e, emailField, Validation.validateEmail, 'email')} ref={node => emailField = node} className = 'form-control' type ='text' name = 'email' placeholder='email'></input>
            </p>
            </div>

            <div className = 'ageBlock d-flex'>
            <p>Age:</p>
        <p>{user.age}</p>
        <p className = 'hidden hiddenInput'>
            <input onChange={(e)=>this.onChange(e, ageField, Validation.validateAge, 'age')} ref={node => ageField = node} className = 'form-control' type ='number' name = 'age' placeholder='age'></input>
            </p>
            </div>

            <div className = 'genderBlock d-flex'>
            <p>Gender:</p>
        <p>{user.gender}</p>
        <p className = 'hidden hiddenInput'>
            <select onChange={(e)=>this.onChange(e, genderField, true, 'gender')} ref={node => genderField = node} className = 'form-control'>
    <option value = 'male'>Male</option>
            <option value = 'female'>Female</option>
            </select>
            </p>
            </div>

            <p className = 'buttons'>
            <input type ='button' className='btn btn-primary' id='editInputs' value='Edit' onClick = {(e)=>this.editInputs(e)}></input>
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