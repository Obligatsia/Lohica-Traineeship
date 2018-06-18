import React, { Component } from 'react';
import FormContent from './components/formComponent.js';
import HeaderContent from './components/Header.js';
import {connect} from 'react-redux';


export class App extends Component{
  render(){
    return(
      <form className = 'row d-flex flex-column col-sm-3' id='registerForm' >

        </form>
    );
  }
}


//const ValidationMethods = require ('./components/validationComponent.js');
//
//const Validation = new ValidationMethods();
//
//class App extends Component{
//  nameChange(e){
//    let val = e.target.value;
//    let valid = Validation.validateName(val);
//    //this.setState({value: val, isValid: valid});
//    this.props.onNameChange(val, valid );
//  }
//  render(){
//    console.log(this.props.testStore);
//    const nameClassValid = this.props.testStore.value.isValid ? 'form-control is-valid' : 'form-control is-invalid';
//
//    return(
//      <div>
//      <div className='form-group'>
//      <label htmlFor ='name'>Enter your Name</label>
//    <input className={nameClassValid} type ='text' placeholder='John' id='name' onChange = {this.nameChange.bind(this)} value = {this.props.testStore.value.value}></input>
//    <div className="invalid-feedback">Only latin letters</div>
//    <small id="nameHelp" className="form-text text-muted">latin letters, length 1-32</small>
//    </div>
//        </div>
//    );
//  }
//}
//
//export default connect(
//  state => ({
//    testStore: state
//  }),
//  dispatch => ({
//    onNameChange: (value, valid)=>{
//      dispatch({type: 'ADD_NAME', name: value, isValid: valid})
//    }
//  })
//) (App);