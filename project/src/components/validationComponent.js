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

    static validatePhoto(img){
        if((img)&&(img.size>=minSize)&&(img.size<maxSize)) {
            let result;
            if(img.filename){
                result = photoPattern.exec(img.filename);
            } else{
                result = photoPattern.exec(img.name);
            }
            return result;
        } else {
            return false
        }
    }

    static validateAge(age){
      let result = agePattern.exec(age);
        return result;
    }

    static validateGender(){
        return true;
    }

};