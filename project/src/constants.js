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
const timeToExpire = '24h';
const secretKey = 'somesecretkey';
const main = '/main';
const welcomePage = '/welcomePage';
const logIn = '/logIn';
const friends = '/friends';
const search = '/search';
const settings = '/settings';
const news = '/news';
const addUsers = '/addUser';
const imgPath = 'public/usersImg';
const sendAuthorizesUser = '/sendAuthorizedUser';
const editUserUrl = 'http://localhost:8000/editUser';
const findFriendUrl = 'http://localhost:8000/findFriend';
const editUser = '/editUser';
const findFriend = '/findFriend';


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
    timeToExpire,
    secretKey,
    main,
    welcomePage,
    logIn,
    friends,
    news,
    settings,
    search,
    addUsers,
    imgPath,
    sendAuthorizesUser,
    editUser,
    editUserUrl,
    findFriendUrl,
    findFriend


}