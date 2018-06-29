const {namePattern, emailPattern, photoPattern, agePattern} = require('../constants');


module.exports = class Validation {
    static validateName (name){
      let result = namePattern.exec(name);
      return result;
    }

    static validateEmail(email){
      let result = emailPattern.exec(email);
        return result;
    }

    static validatePhoto(name, size){
        if((size>=40000)&&(size<5e+6)) {
            let result = photoPattern.exec(name);
            return result;
        } else {
            return false
        }
    }

    static validateAge(age){
      let result = agePattern.exec(age);
        return result;
    }

};