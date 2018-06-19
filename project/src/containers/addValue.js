import React from 'react'
import { connect } from 'react-redux'
import { addName } from './../actions'
import { addSurName } from './../actions'
import  '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
const ValidationMethods = require ('../components/validationComponent.js');

const Validation = new ValidationMethods();


const AddValue = ({ dispatch }) => {
  let nameField = {value: '', isValid: false};
  let surNameField={value: '', isValid: false};
  let emailField;
  let photoField;
  let genderField;
  let ageField;
  let middleNameField;
    let onNameChange= (e)=>{
        let val = e.target.value;
        let valid = Validation.validateName(nameField.value);
        dispatch(addName(val, valid));

    }
    let onSurNameChange= (e)=>{
        let val = e.target.value;
        let valid = Validation.validateName(surNameField.value);
        dispatch(addSurName(val, valid));
    }
    let onEmailChange= (e)=>{
        let val = e.target.value;
        let valid = Validation.validateEmail(emailField.value);
        dispatch(addSurName(val, valid));
    }
    let onPhotoChange= (e)=>{
        let val = e.target.value;
        let valid = Validation.validatePhoto(photoField.value);
        dispatch(addSurName(val, valid));
    }
    let onGenderChange= (e)=>{
        let val = e.target.value;
        let valid = Validation.validateGender(genderField.value);
        dispatch(addSurName(val, valid));
    }
    let onAgeChange= (e)=>{
        let val = e.target.value;
        let valid = Validation.validateAge(ageField.value);
        dispatch(addSurName(val, valid));
    }
    let onMiddleNameChange= (e)=>{
        let val = e.target.value;
        let valid = Validation.validateName(middleNameField.value);
        dispatch(addSurName(val, valid));
    }

    const nameClassValid = nameField.isValid ? 'form-control is-valid' : 'form-control is-invalid';
    // const surNameClassValid = this.state.surName.isValid ? 'form-control is-valid' : 'form-control is-invalid';
    // const emailClassValid = this.state.email.isValid ? 'form-control is-valid' : 'form-control is-invalid';
    // const photoClassValid = this.state.photo.isValid ? 'form-control is-valid' : 'form-control is-invalid';
    // const genderClassValid = this.state.gender.isValid ? 'form-control is-valid' : 'form-control is-invalid';
    // const ageClassValid = this.state.age.isValid ? 'form-control is-valid' : 'form-control is-invalid';
    // const middleNameClassValid = this.state.middleName.isValid ? 'form-control is-valid' : 'form-control is-invalid';
  return (

    <div>
    <form className = 'row d-flex flex-column col-sm-3' id='registerForm' onSubmit={e => {
    e.preventDefault()
    if (!nameField.value.trim()&&!surNameField.value.trim()&&!emailField.value.trim()&&!photoField.value.trim()&&!genderField.value.trim()&&!ageField.value.trim()) {
      return
    }
    // dispatch(addValue(nameField.value, surNameField.value, emailField.value, photoField.value, genderField.value, ageField.value, middleNameField.value))
        nameField.isValid = Validation.validateName(nameField.value);
        surNameField.isValid = Validation.validateName(surNameField.value);
        emailField.isValid = Validation.validateEmail(emailField.value);
        photoField.isValid = Validation.validatePhoto(photoField.value);
        ageField.isValid = Validation.validateAge(ageField.value);
        middleNameField.isValid = Validation.validateName(middleNameField.value);
  }}>
<div className='form-group'>
        <label htmlFor ='name'>Enter your Name</label>
    <input  ref={node => nameField = node} className = {nameClassValid} type ='text' placeholder='John' id='name' onChange ={onNameChange}></input>
    <div className="invalid-feedback">Only latin letters</div>
    <small id="nameHelp" className="form-text text-muted">latin letters, length 1-32</small>
    </div>

    <div className='form-group'>
        <label htmlFor ='surname' >Enter your Surname</label>
    <input  ref={node => surNameField = node} className = 'form-control' type ='text' placeholder='Smith' id='surname' onChange ={onSurNameChange} ></input>
    <div className="invalid-feedback">Only latin letters</div>
    <small id="surNameHelp" className="form-text text-muted">latin letters, length 1-32</small>
    </div>

    <div className='form-group'>
        <label htmlFor ='email'>Enter your e-mail</label>
    <input  ref={node => emailField = node} className = 'form-control'type ='text' placeholder='johnsmith@gmail.com' id='email' onChange ={onEmailChange}></input>
    <div className="invalid-feedback">Please, enter correct email</div>
    <small id="emailHelp" className="form-text text-muted">f.e. 'johnsmith@gmail.com'</small>
    </div>

    <div className='form-group'>
        <label htmlFor ='photo'>Choose photo</label>
    <input  ref={node => photoField = node} className = 'form-control' type ='file' id='photo' onChange ={onPhotoChange}></input>
    <div className="invalid-feedback">Files formate only JPEG, JPG, PNG</div>
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
        <label htmlFor ='middleName'  >Enter your Middle Name</label>
    <input  ref={node => middleNameField = node} className = 'form-control' type ='text' placeholder='Brown' id='middleName' onChange ={onMiddleNameChange}></input>
    <div className="invalid-feedback">Only latin letters</div>
    <small id="middleNameHelp" className="form-text text-muted">latin letters, length 1-32</small>
    </div>

    <div className='form-group'>
        <button type ='submit' className='btn btn-primary' id='submitBtn' onClick = {this.handleSubmit}>Save</button>
    </div>
  </form>
  </div>
  )
}

export default connect()(AddValue)