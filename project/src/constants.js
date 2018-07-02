const mongoConnect = 'mongodb://localhost:27017/myDataBase';
const addUserUrl = 'http://localhost:8000/addUser';
const sendAuthUserUrl = 'http://localhost:8000/sendAuthorizedUser';
const onClickNews = 'http://localhost:8000/news';
const onClickMain = 'http://localhost:8000/main';
const onClickFriends = 'http://localhost:8000/friends';
const onClickSettings = 'http://localhost:8000/settings';
const onClickSearch = 'http://localhost:8000/search';
const namePattern = /^[A-Za-z]{1,32}$/;
const emailPattern = /^\S+@\S+\.\S+$/;
const photoPattern = /^\S+\.\jpg|png|jpeg$/;
const agePattern = /^([1-9]\d?)$/;
const minSize = 40000;
const maxSize = 5e+6;
const timeToExpire = '30s';


module.exports = {
    mongoConnect,
    addUserUrl,
    sendAuthUserUrl,
    namePattern,
    emailPattern,
    photoPattern,
    agePattern,
    onClickNews,
    onClickMain,
    onClickSettings,
    onClickSearch,
    onClickFriends,
    minSize,
    maxSize,
    timeToExpire
}