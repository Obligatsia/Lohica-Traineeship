import React from 'react';
import ReactDOM from 'react-dom';

import {createStore} from 'redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let parent = document.getElementById('main');
class FormContent extends React.Component{
  constructor(props){
    super(props)
    this.state={
      name: '',
      surName: '',
      email: '',
      photo: '',
      gender: '',
      age: '',
      middleName: ''
    }

  }



  handleChange(event) {
    console.log(event.target.value)
  }
  render(){
    return <form>
  <div className='form-group'>
      <label htmlFor ='name'>Enter your Name</label>
    <input type ='text' placeholder='John' id='name' onChange = {this.handleChange.bind(this)}></input>
    </div>

  <div className='form-group'>
      <label htmlFor ='surname' >Enter your Surname</label>
    <input type ='text' placeholder='Smith' id='surname' onChange = {this.handleChange.bind(this)}></input>
    </div>

    <div className='form-group'>
      <label htmlFor ='email' >Enter your e-mail</label>
    <input type ='text' placeholder='johnsmith@gmail.com' id='email' onChange = {this.handleChange.bind(this)}></input>
    </div>

    <div className='form-group'>
      <label htmlFor ='photo' >Choose photo</label>
    <input type ='file' id='photo' onChange = {this.handleChange.bind(this)}></input>
    </div>

    <div className='form-group'>
      <label htmlFor='gender'>Select your gender</label>
    <select id='gender'>
  <option value = 'male'>Male</option>
      <option value = 'female'>Female</option>
      </select>
      </div>

    <div className='form-group'>
      <label htmlFor ='age' >Select your age</label>
    <input type ='number' id='age'  placeholder = '18' onChange = {this.handleChange.bind(this)}></input>
    </div>

    <div className='form-group'>
      <label htmlFor ='middleName' >Enter your Middle Nane</label>
    <input type ='text' placeholder='Brown' id='middleName' onChange = {this.handleChange.bind(this)}></input>
    </div>

    <div className='form-group'>
      <input type ='submit' className='btn' value = 'Save' id='submitBtn'></input>
    </div>;
    </form>
  }
}


ReactDOM.render(
  <FormContent />, parent
)

