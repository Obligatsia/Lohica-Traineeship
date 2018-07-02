const {namePattern, emailPattern, photoPattern, agePattern, minSize, maxSize} = require('../constants');


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
        if((size>=minSize)&&(size<maxSize)) {
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