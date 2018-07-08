const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Validation = require('../src/components/validationComponent');
const mongoose = require('mongoose');
const MongoClient = require('mongodb');
const Schema = mongoose.Schema;
const users = require('./routes/users');
const router = express.Router();
const Users = require('./models/Users.js');
const multer = require('multer');
const assert = require('assert');
const jwt = require('jsonwebtoken');
const {mongoConnect, addUsers,timeToExpire, secretKey, imgPath, sendAuthorizesUser, main, friends, search, settings, news, editUser, logIn, findFriend} = require('../src/constants');
const {storage} = require('./storage');
const randtoken = require('rand-token');



const db = mongoose.connection;
mongoose.connect(mongoConnect, ((err)=>{
    if (err) throw err;
    console.log('Successfully connected');
}))

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

const refreshTokens = {}

const upload = multer({storage: storage});

const generatePsd = (()=>{
    return Math.random().toString(36).slice(-8);
})


app.post(addUsers, upload.single('photo'), (req, res, next) => {
    const user = req.body;
    const psw = generatePsd();
    let nameValid, surNameValid, emailValid, ageValid, photoValid, middleNameValid;
    let ValidChecker = ((user)=>{
        nameValid = Validation.validateName(user.name);
        surNameValid = Validation.validateName(user.surName);
        emailValid = Validation.validateEmail(user.email);
        ageValid = Validation.validateAge(user.age);
        photoValid = Validation.validatePhoto(req.file);
        middleNameValid = user.middleName?Validation.validateName(user.middleName):true;

        return fieldsAreValid = nameValid && surNameValid && emailValid && ageValid && photoValid && middleNameValid;
    })

    let newUser = new Users({name:user.name, surName:user.surName, photo: { path: req.file.path, name: req.file.filename},  email: user.email, gender: user.gender, age: user.age, middleName: user.middleName, password: psw});
    newUser.photo.path = req.file.path;
    newUser.photo.name = req.file.filename;
    let invalidMsg = {
        name: nameValid,
        surName: surNameValid,
        email: emailValid,
        photo: photoValid,
        age: ageValid,
        middleName: middleNameValid
    }
    try {
        Users.findOne({email: user.email }, (err, userItem)=>{
            if(userItem){
                return res.send(200, 'emailError');
            }
            if(ValidChecker(user)) {
                    newUser.save(function (err, userItem) {
                        if (err) {
                            console.log(err);
                        }
                    });
                    MongoClient.connect(mongoConnect, (err, client) => {
                        assert.equal(null, err);
                        insertDocuments(client, imgPath + req.file.originalname, () => {
                            const db = client.db('users');
                            client.close();
                        });
                    });
                    res.send(200, newUser);
                } else{
                    res.send(200, invalidMsg);
                }
        });
    } catch (err) {
        console.log(err)
    }
});


app.post(editUser, upload.single('photo'),(req, res, next) => {
    const editedUser = req.body;
    let nameValid, surNameValid, emailValid, ageValid, photoValid, middleNameValid;
    let ValidChecker = ((user)=>{
        nameValid = Validation.validateName(editedUser.name);
        surNameValid = Validation.validateName(editedUser.surName);
        emailValid = Validation.validateEmail(editedUser.email);
        ageValid = Validation.validateAge(editedUser.age);
        photoValid = req.file?Validation.validatePhoto(req.file):true;
        middleNameValid = editedUser.middleName?Validation.validateName(editedUser.middleName):true;

        return fieldsAreValid = nameValid && surNameValid && emailValid && ageValid && photoValid && middleNameValid;
    })
    let invalidMsg = {
        name: nameValid,
        surName: surNameValid,
        email: emailValid,
        photo: photoValid,
        age: ageValid,
        middleName: middleNameValid
    }

    Users.findOne({email: editedUser.email}, function (err, userItem) {
                    if(editedUser.id!==userItem.id){
                        res.send(200, 'emailError');
                    } else if(!ValidChecker(editedUser)){
                        res.send(invalidMsg)
                    } else{
                        Users.findById(editedUser.id, function(err, user){
                            user.name = editedUser.name;
                            user.surName = editedUser.surName;
                            user.email = editedUser.email;
                            user.age = editedUser.age;
                            user.gender = editedUser.gender;
                            user.middleName = editedUser.middleName;
                            user.token = editedUser.token;
                            if(req.file){
                                user.photo.path = req.file.path;
                                user.photo.name = req.file.filename;
                            }
                            user.save(function(err, upUser){
                                return res.send(user);                            })
                        })
                    }
            })
});

app.post(findFriend, (req, res, next) => {
        const friendName = req.body;
        Users.find({name: friendName}, function (err, user) {
            if(user.length){
                res.send(user)
            } else{
                res.send('no users')
            }
        })
})







app.post(sendAuthorizesUser, (req, res, next) => {
    let authUser = req.body;
    Users.findOne({email: authUser.email}, (err, user)=>{
        if(!user){
            res.send(200, 'invalidEmail');
        } else if(user.password!==authUser.password){
            res.send(200, 'invalidPsd');
        } else{
            const refreshToken = randtoken.uid(256);

            jwt.sign({authUser}, secretKey, {expiresIn: timeToExpire},(err, token)=>{
                res.send(200, ({user, token, refreshToken}));
            })
        }
    })
})




const verifyToken = ((req, res, next)=>{
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader!=='undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else{
        res.send (403);
    }
})


app.get(main, verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, (err, authData)=>{
        if(err){
            res.redirect(logIn);
        } else{
            res.send(200, authData);
        }
    })
})

app.get(friends, verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, (err, authData)=>{
        if(err){
            console.log(err);
            res.send(403);
        } else{
            res.send(200, authData);
        }
    })
})

app.get(settings, verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, (err, authData)=>{
        if(err){
            res.send(403);
        } else{
            res.send(200, authData);
        }
    })
})

app.get(search, verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, (err, authData)=>{
        if(err){
            res.send(403);
        } else{
            res.send(200, authData);
        }
    })
})

app.get(news, verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, (err, authData)=>{
        if(err){
            res.send(403);
        } else{
            res.send(200, authData);
        }
    })
})
const insertDocuments = function(client, filePath, callback) {
    const db = client.db('users');

    const collection = db.collection('user');
    collection.insertOne({'imagePath' : filePath }, (err, result) => {
        assert.equal(err, null);
        callback(result);
    });
}

app.listen(8000, (()=>{
    console.log('listening');
}))