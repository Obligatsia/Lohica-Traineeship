const React = require ('react');
const ReactDOM = require ('react-dom');
const { connect } = require ('react-redux');
const {createStore} = require ('redux');
const { Provider } = require ('react-redux');
require  ('../../node_modules/bootstrap/dist/css/bootstrap.min.css');
const mapStateToProps = state => ({
  appName: state.appName
});
const ValidationMethods = require ('./validationComponent.js');

const Validation = new ValidationMethods();
let users = [];

module.exports = class FormContent extends React.Component{
  constructor(props){
    super(props);
    this.state={name: {value: '', isValid: false}, surName: {value: '', isValid: false}, email: {value: '', isValid: false}, photo: {value: '', isValid: false}, gender: {value: 'male', isValid: true}, age: {value: '', isValid: false}, middleName: {value: '', isValid: false}};
  this.onNameChange = this.onNameChange.bind(this);
  this.onSurNameChange = this.onSurNameChange.bind(this);
  this.onEmailChange = this.onEmailChange.bind(this);
  this.onPhotoChange = this.onPhotoChange.bind(this);
  this.onGenderChange = this.onGenderChange.bind(this);
  this.onAgeChange = this.onAgeChange.bind(this);
  this.onMiddleNameChange = this.onMiddleNameChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  onNameChange(e){
    let val = e.target.value;
    let valid = Validation.validateName(val);
    this.setState({name: {value: val, isValid: valid}});
  }
  onSurNameChange(e){
    let val = e.target.value;
    let valid = Validation.validateName(val);
    this.setState({surName: {value: val, isValid: valid}});
  }
  onMiddleNameChange(e){
    let val = e.target.value;
    let valid = Validation.validateName(val);
    this.setState({middleName: {value: val, isValid: valid}});
  }
  onEmailChange(e){
    let val = e.target.value;
    let valid = Validation.validateEmail(val);
    this.setState({email: {value: val, isValid: valid}});
  }
  onPhotoChange(e){
    let val = e.target.value;
    let valid = Validation.validatePhoto(val);
    this.setState({photo: {value: val, isValid: valid}});
  }
  onGenderChange(e){
    let val = e.target.value;
    this.setState({gender: {value: val, isValid: true}});
  }
  onAgeChange(e){
    let val = e.target.value;
    let valid = Validation.validateAge(val);
    this.setState({age: {value: val, isValid: valid}});
  }


  handleSubmit(e){
    e.preventDefault();
    if(this.state.name.isValid&&this.state.surName.isValid&&this.state.email.isValid&&this.state.photo.isValid&&this.state.gender.isValid&&this.state.age.isValid){
      const psw = Math.random().toString(36).slice(-8);

      let newUser = {
        name:this.state.name.value,
        surName:this.state.surName.value,
        email:this.state.email.value,
        photo:this.state.photo.value,
        gender:this.state.gender.value,
        age:this.state.age.value,
        middleName:this.state.middleName.value||null,
        password: psw
      };
      users.push(newUser);
      console.log(users);

    }
  }



  render(){
    const nameClassValid = this.state.name.isValid ? 'form-control is-valid' : 'form-control is-invalid';
    const surNameClassValid = this.state.surName.isValid ? 'form-control is-valid' : 'form-control is-invalid';
    const emailClassValid = this.state.email.isValid ? 'form-control is-valid' : 'form-control is-invalid';
    const photoClassValid = this.state.photo.isValid ? 'form-control is-valid' : 'form-control is-invalid';
    const genderClassValid = this.state.gender.isValid ? 'form-control is-valid' : 'form-control is-invalid';
    const ageClassValid = this.state.age.isValid ? 'form-control is-valid' : 'form-control is-invalid';
    const middleNameClassValid = this.state.middleName.isValid ? 'form-control is-valid' : 'form-control is-invalid';


    return <form className = 'row d-flex flex-column col-sm-3' id='registerForm' >

    <div className='form-group'>
      <label htmlFor ='name'>Enter your Name</label>
    <input className={nameClassValid} type ='text' placeholder='John' id='name' onChange = {this.onNameChange} value = {this.state.name.value}></input>
    <div className="invalid-feedback">Only latin letters</div>
    <small id="nameHelp" className="form-text text-muted">latin letters, length 1-32</small>
    </div>

    <div className='form-group'>
      <label htmlFor ='surname' >Enter your Surname</label>
    <input type ='text' className={surNameClassValid} placeholder='Smith' id='surname' onChange = {this.onSurNameChange} value = {this.state.surName.value}></input>
    <div className="invalid-feedback">Only latin letters</div>
    <small id="surNameHelp" className="form-text text-muted">latin letters, length 1-32</small>
    </div>

    <div className='form-group'>
      <label htmlFor ='email'>Enter your e-mail</label>
    <input className={emailClassValid} type ='text' placeholder='johnsmith@gmail.com' id='email' onChange = {this.onEmailChange} value = {this.state.email.value}></input>
    <div className="invalid-feedback">Please, enter correct email</div>
    <small id="emailHelp" className="form-text text-muted">f.e. 'johnsmith@gmail.com'</small>
    </div>

    <div className='form-group'>
      <label htmlFor ='photo'>Choose photo</label>
    <input className={photoClassValid} type ='file' id='photo' onChange = {this.onPhotoChange} value = {this.state.photo.value} ></input>
    <div className="invalid-feedback">Files formate only JPEG, JPG, PNG</div>
    <small id="emailHelp" className="form-text text-muted">size between 40kb and 5mb</small>
    </div>

    <div className='form-group'>
      <label htmlFor='gender'>Select your gender</label>
    <select className={genderClassValid} id='gender' value = {this.state.gender.value} onChange = {this.onGenderChange}>
      <option value = 'male'>Male</option>
      <option value = 'female'>Female</option>
      </select>
      </div>

      <div className='form-group'>
      <label htmlFor ='age' >Select your age</label>
    <input className={ageClassValid} type ='number' id='age'  placeholder = '18'onChange = {this.onAgeChange} value = {this.state.age.value}></input>
    <div className="invalid-feedback">Please, enter correct age</div>
    </div>

    <div className='form-group'>
      <label htmlFor ='middleName'  >Enter your Middle Name</label>
    <input className={middleNameClassValid} type ='text' placeholder='Brown' id='middleName'onChange = {this.onMiddleNameChange} value = {this.state.middleName.value} ></input>
    <div className="invalid-feedback">Only latin letters</div>
    <small id="middleNameHelp" className="form-text text-muted">latin letters, length 1-32</small>
    </div>
    <div className='form-group'>
      <input type ='button' className='btn btn-primary' value = 'Save' id='submitBtn' onClick = {this.handleSubmit}></input>
      </div>
  </form>
  }
}


