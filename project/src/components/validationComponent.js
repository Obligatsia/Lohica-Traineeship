const React = require ('react');

module.exports = class Validation {
    validateName (name){
      let pattern = /^[A-Za-z]{1,32}$/;
      let result = pattern.exec(name);
      return result;
    }

    validateEmail(email){
      let pattern = /^\S+@\S+\.\S+$/;
      let result = pattern.exec(email);
        return result;
    }

    validatePhoto(photo){
        let pattern;
        if((photo.size>=40000)&&(photo.size<5e+6)) {
           pattern = /^\S+\.\png|jpg|jpeg$/;
        } else {
            console.log(photo.size);
            return false};
        let result = pattern.exec(photo.name);
        return result;
    }

    validateAge(age){
      let pattern = /^([1-9]\d?)$/;
      let result = pattern.exec(age);
        return result;
    }

};