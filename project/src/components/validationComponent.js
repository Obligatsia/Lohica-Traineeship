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

    validatePhoto(name, size){
        let pattern;
        if((size>=40000)&&(size<5e+6)) {
           pattern = /^\S+\.\jpg|png|jpeg$/;
        } else {
            return false};
        let result = pattern.exec(name);
        return result;
    }

    validateAge(age){
      let pattern = /^([1-9]\d?)$/;
      let result = pattern.exec(age);
        return result;
    }

};