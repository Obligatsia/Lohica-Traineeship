const mongoConnect = 'mongodb://localhost:27017/myDataBase';
const addUserUrl = 'http://localhost:8000/addUser';
const sendAuthUserUrl = 'http://localhost:8000/sendAuthorizedUser';
const namePattern = /^[A-Za-z]{1,32}$/;
const emailPattern = /^\S+@\S+\.\S+$/;
const photoPattern = /^\S+\.\jpg|png|jpeg$/;
const agePattern = /^([1-9]\d?)$/;


module.exports = {
    mongoConnect,
    addUserUrl,
    sendAuthUserUrl,
    namePattern,
    emailPattern,
    photoPattern,
    agePattern,
}