const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const IsValid = require('../src/components/validationComponent');
const mongoose = require('mongoose');
const MongoClient = require('mongodb');
const Schema = mongoose.Schema;
const users = require('./routes/users');
const router = express.Router();
const Users = require('./models/Users.js');
const multer = require('multer');
const assert = require('assert');

const db = mongoose.connection;
mongoose.connect('mongodb://localhost:27017/myDataBase', ((err)=>{
    if (err) throw err;
    console.log('Successfully connected');
}))

const Validation = new IsValid();

const app = express();
app.use(cors());

app.use('/users', users);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'server/usersImg')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+'-'+file.originalname)
    }
});
const upload = multer({storage: storage});

app.post('/addUser', upload.single('photo'), (req, res, next) => {
    const user = req.body;
    const psw = Math.random().toString(36).slice(-8);

    try {
        Users.findOne({email: user.email }, (err, user)=>{
            if(user){
                res.send(200, 'emailError');
            } else{
                let nameValid = Validation.validateName(req.body.name);
                let surNameValid = Validation.validateName(req.body.surName);
                let emailValid = Validation.validateEmail(req.body.email);
                let ageValid = Validation.validateAge(req.body.age);
                let photoValid = Validation.validatePhoto(req.file.filename, req.file.size);
                let middleNameValid = Validation.validateName(req.body.middleName);

                if(nameValid && surNameValid && emailValid && ageValid && photoValid && middleNameValid) {
                    let newUser = new Users({name:req.body.name, surName:req.body.surName, photo: { path: req.file.path, name: req.file.filename},  email: req.body.email, gender: req.body.gender, age: req.body.age, middleName: req.body.middleName, password: psw});

                    newUser.photo.path = req.file.path;
                    newUser.photo.name = req.file.filename;

                    newUser.save(function (err, user) {
                        if (err) return console.error(err);
                        console.log(user.name + " saved to users.");
                    });

                    MongoClient.connect('mongodb://localhost:27017/myDataBase', (err, client) => {
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
            }
        });


    } catch (err) {
        console.log(err)
    }

});
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