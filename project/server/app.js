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
    try {
        Users.findOne({email: user.email }, (err, user)=>{
            if(user){
                console.log(req.body);
                return res.send(200, 'emailError');
            }
                let nameValid = Validation.validateName(req.body.name);
                let surNameValid = Validation.validateName(req.body.surName);
                let emailValid = Validation.validateEmail(req.body.email);
                let ageValid = Validation.validateAge(req.body.age);
                let photoValid = Validation.validatePhoto(req.file.filename, req.file.size);
                let middleNameValid;
                if(req.body.middleName){
                    middleNameValid = Validation.validateName(req.body.middleName);
                } else{
                    middleNameValid = true;
                }
                const fieldsAreValid = nameValid && surNameValid && emailValid && ageValid && photoValid && middleNameValid;

                if(fieldsAreValid) {
                    let newUser = new Users({name:req.body.name, surName:req.body.surName, photo: { path: req.file.path, name: req.file.filename},  email: req.body.email, gender: req.body.gender, age: req.body.age, middleName: req.body.middleName, password: psw});

                    newUser.photo.path = req.file.path;
                    newUser.photo.name = req.file.filename;

                    newUser.save(function (err, user) {
                        if (err) return console.error(err);
                        console.log(user.name + " saved to users.");
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
                    let invalidMsg = {
                        name: nameValid,
                        surName: surNameValid,
                        email: emailValid,
                        photo: photoValid,
                        age: ageValid,
                        middleName: middleNameValid
                    }
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
            jwt.sign({authUser}, 'secretkey', (err, token)=>{
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


app.post('/userPageUrl', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey',{expiresIn: '30s'}, (err, authData)=>{
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