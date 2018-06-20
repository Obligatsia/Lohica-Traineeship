const React = require ('react');

module.exports = class Validation {
    validateName (name){
        console.log(name);
      let pattern = /^[A-Za-z]{1,32}$/;
      let result = pattern.exec(name);
      if (!result) {
        return false;
      } else {
        return true;
      }
    }

    validateEmail(email){
      let pattern = /^\S+@\S+\.\S+$/;
      let result = pattern.exec(email);
      if (!result) {
        return false;
      } else {
        return true;
      }
    }

    validatePhoto(photo){
      let pattern = /^\S+\.\png|jpg|jpeg$/;
      let result = pattern.exec(photo);
      if (!result) {
        return false;
      } else {
        return true;
      }
    }

    validateAge(age){
      let pattern = /^([1-9]\d?)$/;
      let result = pattern.exec(age);
      if (!result) {
        return false;
      } else {
        return true;
      }
    }

};