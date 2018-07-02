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
const {mongoConnect} = require('../src/constants');
const {storage} = require('./storage');
const {timeToExpire} = require('./../src/constants');


const db = mongoose.connection;
mongoose.connect(mongoConnect, ((err)=>{
    if (err) throw err;
    console.log('Successfully connected');
}))

const app = express();
app.use(cors());

app.use('/users', users);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const upload = multer({storage: storage});

const generatePsd = (()=>{
    return Math.random().toString(36).slice(-8);
})


app.post('/addUser', upload.single('photo'), (req, res, next) => {
    const user = req.body;
    const psw = generatePsd();
    let nameValid, surNameValid, emailValid, ageValid, photoValid, middleNameValid;
    let ValidChecker = ((user)=>{
        nameValid = Validation.validateName(user.name);
        surNameValid = Validation.validateName(user.surName);
        emailValid = Validation.validateEmail(user.email);
        ageValid = Validation.validateAge(user.age);
        photoValid = Validation.validatePhoto(req.file.filename, req.file.size);
        middleNameValid;
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
                        if (err) return console.error(err);
                        console.log(userItem.name + " saved to users.");
                    });
                    MongoClient.connect(mongoConnect, (err, client) => {
                        assert.equal(null, err);
                        insertDocuments(client, 'server/usersImg' + req.file.originalname, () => {
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

app.post('/sendAuthorizedUser', (req, res, next) => {
    let authUser = req.body;

    Users.findOne({email: authUser.email}, (err, user)=>{
        if(!user){
            res.send(200, 'invalidEmail');
        } else if(user.password!==authUser.password){
            res.send(200, 'invalidPsd');
        } else{
            jwt.sign({authUser}, 'secretkey', {expiresIn: timeToExpire},(err, token)=>{
                res.send(200, token);
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


app.post('/usersFriends', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData)=>{
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