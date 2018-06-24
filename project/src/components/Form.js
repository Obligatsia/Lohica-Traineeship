import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import {$, jQuery} from '../../node_modules/jquery/dist/jquery.min';
import { addValue } from '../actions/index'
import { bindActionCreators } from 'redux';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
const ValidationMethods = require ('../components/validationComponent.js');


const Validation = new ValidationMethods();

class Form extends Component {
    constructor(props) {
        super(props);
    }

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

        let onNameChange= (e)=>{
                let val = e.target.value;
                let valid = Validation.validateName(nameField.value);
                this.props.dispatch(addValue('name', val, valid));
            }
            let onSurNameChange= (e)=>{
                let val = e.target.value;
                let valid = Validation.validateName(surNameField.value);
                this.props.dispatch(addValue('surName', val, valid));
            }
            let onEmailChange= (e)=>{
                let val = e.target.value;
                let valid = Validation.validateEmail(emailField.value);
                this.props.dispatch(addValue('email', val, valid));
            }
            let onPhotoChange= (e)=>{
                let val = e.target.value;
                imgFile = e.target.files[0];
                let valid = Validation.validatePhoto(photoField.value);
                this.props.dispatch(addValue('photo', e.target.files[0], valid));
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
            }
            let onMiddleNameChange= (e)=>{
                let val = e.target.value;
                let valid = Validation.validateName(middleNameField.value);
                this.props.dispatch(addValue('middleName', val, valid));
            }


        let onSubmitForm = ()=>{
            let valid;
            for (let name in this.props.user){
                for(let isValid in this.props.user[name]){
                    let valueValidated = this.props.user[name].isValid;
                    if(!valueValidated){
                        return valid = 0;
                    } else{
                        valid=1;
                    }
                }
            }
            if(valid && nameField.value && surNameField.value && emailField.value && photoField.value && genderField.value && ageField.value){




                document.getElementById('btnGroup').classList.remove('errorMsg');
                let user = this.props.user;

                let sendUser = new XMLHttpRequest();

                let userItem = JSON.stringify(user);
                sendUser.open('POST', 'http://localhost:8000/addUser', true);
                // sendUser.setRequestHeader('Content-Type', 'multipart/form-data');

                sendUser.setRequestHeader('Content-Type', 'application/json');
                sendUser.setRequestHeader('Content-Disposition', 'attachment; filename=user.photo.value.name ');

                sendUser.onreadystatechange = function () {
                    if (sendUser.readyState === 4) {
                        if (sendUser.status != 200) {
                            console.log(sendUser.status + ': ' + sendUser.statusText);
                        } else {

                            let newUser = JSON.parse(sendUser.responseText);
                            console.log(newUser);

                        }
                    }
                };

                sendUser.send(userItem);





            } else{
                document.getElementById('btnGroup').classList.add('errorMsg');
            }
        };
            const nameClassValid = this.props.user.name.isValid ? 'form-control is-valid' : 'form-control is-invalid';
            const surNameClassValid = this.props.user.surName.isValid ? 'form-control is-valid' : 'form-control is-invalid';
            const emailClassValid = this.props.user.email.isValid ? 'form-control is-valid' : 'form-control is-invalid';
            const photoClassValid = this.props.user.photo.isValid ? 'form-control is-valid' : 'form-control is-invalid';
            const genderClassValid = this.props.user.gender.isValid  ? 'form-control is-valid' : 'form-control is-invalid';
            const ageClassValid = this.props.user.age.isValid  ? 'form-control is-valid' : 'form-control is-invalid';
            const middleNameClassValid = this.props.user.middleName.isValid  ? 'form-control is-valid' : 'form-control is-invalid';
            return (
                <div>
                <form method='post' action = '/addUser' className = 'row d-flex flex-column col-sm-3' id='registerForm'>
        <div className='form-group'>
                <label htmlFor ='name'>Enter your Name</label>
            <input  ref={node => nameField = node} className = {nameClassValid} type ='text' placeholder='John' id='name' onChange ={onNameChange}></input>
                <div className="invalid-feedback">Only latin letters</div>
            <small id="nameHelp" className="form-text text-muted">latin letters, length 1-32</small>
            </div>

            <div className='form-group'>
                <label htmlFor ='surname' >Enter your Surname</label>
            <input  ref={node => surNameField = node}  className = {surNameClassValid} type ='text' placeholder='Smith' id='surname' onChange ={onSurNameChange} ></input>
                <div className="invalid-feedback">Only latin letters</div>
            <small id="surNameHelp" className="form-text text-muted">latin letters, length 1-32</small>
            </div>

            <div className='form-group'>
                <label htmlFor ='email'>Enter your e-mail</label>
            <input  ref={node => emailField = node} className = {emailClassValid} type ='text' placeholder='johnsmith@gmail.com' id='email' onChange ={onEmailChange}></input>
                <div className="invalid-feedback">Please, enter correct email</div>
            <small id="emailHelp" className="form-text text-muted">f.e. 'johnsmith@gmail.com'</small>
            </div>

            <div className='form-group'>
                <label htmlFor ='photo'>Choose photo</label>
            <input  ref={node => photoField = node} className = {photoClassValid} type ='file' id='photo' onChange ={onPhotoChange} name = 'photo'></input>
                <div className="invalid-feedback">Files formate only JPEG, JPG, PNG</div>
            <small id="emailHelp" className="form-text text-muted">size between 40kb and 5mb</small>
            </div>

            <div className='form-group'>
                <label htmlFor='gender'>Select your gender</label>
            <select  ref={node => genderField = node} className = {genderClassValid} id='gender' onChange ={onGenderChange}>
                <option value = 'male'>Male</option>
                <option value = 'female'>Female</option>
                </select>
                </div>
                <div className='form-group'>
                <label htmlFor ='age' >Select your age</label>
            <input  ref={node => ageField = node} className = {ageClassValid} type ='number' id='age'  placeholder = '18' onChange ={onAgeChange}></input>
                <div className="invalid-feedback">Please, enter correct age</div>
            </div>

            <div className='form-group'>
                <label htmlFor ='middleName' id='optional' >Enter your Middle Name</label>
            <input  ref={node => middleNameField = node} className = {middleNameClassValid} type ='text' placeholder='Brown' id='middleName' onChange ={onMiddleNameChange}></input>
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
    }

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

export default connect(mapStateToProps, mapDispatchToProps)(Form)