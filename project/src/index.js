import React from 'react';
import ReactDOM from 'react-dom';

import {createStore} from 'redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let parent = document.getElementById('main');
class FormGroupInput extends React.Component {
  render(){
    return<div className='form-group'>
      <label htmlFor >{this.props.name} </label>
      <input type ='text' placeholder={this.props.placeholder} type={this.props.type}></input>
      </div>;
  }
}

class FormGroupBtn extends React.Component {
  render(){
    return<div className='form-group'>
    <input type ='button' className='btn' value = {this.props.value} id={this.props.id}></input>
    </div>;
  }
}


class FormGroupSelect extends React.Component {
  render(){
    return<div className='form-group'>
      <label htmlFor >{this.props.name} </label>
    <select id={this.props.id}>
    <option value = 'male'>Male</option>
    <option value = 'female'>Female</option>
    </select>
    </div>;
  }
}

ReactDOM.render(
<form id='registerForm'>
<FormGroupInput id='name' name='Enter your Name' placeholder = 'John' type='text'/>
  <FormGroupInput id='surname' name='Enter your Surname' placeholder = 'Smith' type='text' />
  <FormGroupInput id='email' name='Enter your e-mail' placeholder = 'johnsmith@gmail.com' type='email' />
  <FormGroupInput id='photo' name='Choose your photo' type="file" />
  <FormGroupSelect id='gender' name = 'Choose your gender'/>
  <FormGroupInput id='age' name='Enter your age' placeholder = '18' type='number' />
  <FormGroupInput id='middleName' name='Enter your middle name' placeholder = 'Brown' type='text'/>
  <FormGroupBtn id='saveBtn' value = 'Save' />
</form>,
  parent
)
class Form extends React.Component{
  constructor (props) {
    super(props);
    let name = props.name;
    let surname = props.surname;
    let middleName = props.middleName;
    let nameIsValid = this.validateName(name);
    let photo = props.photo;
    let photoIsValid = this.validatePhoto(photo);
    let gender = props.gender;
    let email = props.email;
    let emailIsValid = this.validateEmail(email);
    let age = props.age;
    let ageIsValid = this.validateAge(age);
    this.state = {name: name, surname: surname, email: email, photo: photo, gender: gender, age: age, middleName: middleName, nameValid: nameIsValid, photoValid: photoIsValid, emailValid: emailIsValid, ageValid: ageIsValid}
    this.onNameChange = this.onNameChange.bind(this);
    this.onAgeChange = this.onAgeChange.bind(this);
    this.onPhotoChange = this.onPhotoChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onAgeChange = this.onAgeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  validateName(name){
    return name.length>2;
  }

}


//onChange = {(e) => this.handleUserData(e)};
//handleUserData(e) {
//  const name = e.target.name;
//  const value = e.target.value;
//  this.setState({[name]: value});



//function example(state=[]) {
//  return state;
//}
//
//const store = createStore(example);
//
//
//store.subscribe(()=>{
//  console.log('subscribe', store.getState());
//})