const React = require ('react');
const ReactDOM = require ('react-dom');
require  ('../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require ('../css/style.css');
require ('./validationComponent.js');

module.exports = class FormContent extends React.Component{
  constructor(props){
    super(props);
    let name = '';
    let surName = '';
    let email = '';
    let photo = '';
    let age = '';
    let middleName = '';
    let nameIsValid = this.validateName(name);
    let surNameIsValid = this.validateName(surName);
    let middleNameIsValid = this.validateName(middleName);
    let emailIsValid = this.validateEmail(email);
    let photoIsValid = this.validatePhoto(photo);
    let ageIsValid = this.validateAge(age);
    this.state={name: name, surName: surName, email: email, photo: photo, age: age, middleName: middleName, nameValid: nameIsValid, surNameValid: surNameIsValid, emailValid: emailIsValid, photoValid: photoIsValid, ageValid: ageIsValid,  middleNameValid: middleNameIsValid};
  this.onNameChange = this.onNameChange.bind(this);
  this.onSurNameChange = this.onSurNameChange.bind(this);
  this.onEmailChange = this.onEmailChange.bind(this);
  this.onPhotoChange = this.onPhotoChange.bind(this);
  this.onAgeChange = this.onAgeChange.bind(this);
  this.onMiddleNameChange = this.onMiddleNameChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }
  validateName(name){
    let pattern = /^[A-Za-z]{1,32}$/;
    let result = pattern.exec(name);
    if (!result) {
      console.log(this);
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email){
    let pattern = /^\S+@\S+\.\S+$/;
    let result = pattern.exec(email);
    if (!result) {
      console.log(this);
      return false;
    } else {
      return true;
    }
  }

  validatePhoto(photo){
    let pattern = /^\S+\.\png|jpg|jpeg$/;
    let result = pattern.exec(photo);
    if (!result) {
      console.log('noooooooo');
      return false;
    } else {
      return true;
    }
  }

  validateAge(age){
    let pattern = /^([1-9]\d?)$/;
    let result = pattern.exec(age);
    if (!result) {
      console.log('noooooooo');
      return false;
    } else {
      return true;
    }
  }
  onNameChange(e){
    let val = e.target.value;
    console.log(val);
    let valid = this.validateName(val);
    this.setState({name: val, nameValid: valid});
  }
  onSurNameChange(e){
    let val = e.target.value;
    console.log(val);
    let valid = this.validateName(val);
    this.setState({surName: val, surNameValid: valid});
  }
  onMiddleNameChange(e){
    let val = e.target.value;
    console.log(val);
    let valid = this.validateName(val);
    this.setState({middleName: val, middleNameValid: valid});
  }
  onEmailChange(e){
    let val = e.target.value;
    console.log(val);
    let valid = this.validateEmail(val);
    this.setState({email: val, emailValid: valid});
  }
  onPhotoChange(e){
    let val = e.target.value;
    console.log(val);
    let valid = this.validatePhoto(val);
    this.setState({photo: val, photoValid: valid});
  }
  onAgeChange(e){
    let val = e.target.value;
    console.log(val);
    let valid = this.validateAge(val);
    this.setState({age: val, ageValid: valid});
  }


  handleSubmit(e){
    e.preventDefault();
    if(!this.state.nameValid&&!this.state.surNameValid){
      alert(this.state.name);
    }
  }


  render(){
    return <form className = 'row d-flex flex-column col-sm-3' id='registerForm' >

    <div className='form-group'>
      <label htmlFor ='name'>Enter your Name</label>
    <input className="form-control" type ='text' placeholder='John' id='name' onChange = {this.onNameChange} value = {this.state.name}></input>
    <small id="nameHelp" className="form-text text-muted">latin characters, length 1-32</small>
    </div>

    <div className='form-group'>
      <label htmlFor ='surname' >Enter your Surname</label>
    <input type ='text' className="form-control" placeholder='Smith' id='surname' onChange = {this.onSurNameChange} value = {this.state.surName}></input>
    <small id="surNameHelp" className="form-text text-muted">latin characters, length 1-32</small>
    </div>

    <div className='form-group'>
      <label htmlFor ='email'>Enter your e-mail</label>
    <input className="form-control" type ='text' placeholder='johnsmith@gmail.com' id='email' onChange = {this.onEmailChange} value = {this.state.email}></input>
    <small id="emailHelp" className="form-text text-muted">f.e. 'johnsmith@gmail.com'</small>
    </div>

    <div className='form-group'>
      <label htmlFor ='photo'>Choose photo</label>
    <input className="form-control-file" type ='file' id='photo' onChange = {this.onPhotoChange} value = {this.state.photo} ></input>
    <small id="emailHelp" className="form-text text-muted">size between 40kb and 5mb</small>
    </div>

    <div className='form-group'>
      <label htmlFor='gender'>Select your gender</label>
    <select className="form-control" id='gender' onChange = {this.onGenderChange}>
      <option value = 'male'>Male</option>
      <option value = 'female'>Female</option>
      </select>
      </div>

      <div className='form-group'>
      <label htmlFor ='age' >Select your age</label>
    <input className="form-control" type ='number' id='age'  placeholder = '18'onChange = {this.onAgeChange} value = {this.state.age}></input>
    </div>

    <div className='form-group'>
      <label htmlFor ='middleName'  >Enter your Middle Name</label>
    <input className="form-control" type ='text' placeholder='Brown' id='middleName'onChange = {this.onMiddleNameChange} value = {this.state.middleName} ></input>
    <small id="middleNameHelp" className="form-text text-muted">latin characters, length 1-32</small>
    </div>
    <div className='form-group'>
      <input type ='button' className='btn btn-primary' value = 'Save' id='submitBtn' onClick = {this.handleSubmit}></input>
      </div>
  </form>
  }
}


