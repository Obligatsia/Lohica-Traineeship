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
        cb(null, file.fieldname + '-' + Date.now())
    }
});
const upload = multer({storage: storage});

app.post('/addUser', upload.single('photo'), async (req, res, next) => {
    MongoClient.connect('mongodb://localhost:27017/myDataBase', (err, client) => {
        assert.equal(null, err);
        insertDocuments(client, 'server/usersImg' + req.file.filename, () => {
            const db = client.db('users');
            client.close();
        });
    });

    const user = req.body;
    const psw = Math.random().toString(36).slice(-8);

    try {
        let newUser = new Users({name:user.name, surName: user.surName, photo: req.file.filename, email: user.email, gender: user.gender, age: user.age, middleName: user.middleName, password: psw});
        newUser.save(function (err, user) {
            if (err) return console.error(err);
            console.log(user.name + " saved to users.");
        });

        newUser.photo.data = req.file.path;
        newUser.photo.name = req.file.filename;
        newUser.photo.contentType = 'image/png';


        newUser.name.isValid = await Validation.validateName(user.name.value);
        newUser.surName.isValid = await Validation.validateName(user.surName.value);
        newUser.email.isValid = await Validation.validateEmail(user.email.value);
        newUser.age.isValid = await Validation.validateAge(user.age.value);
        newUser.photo.isValid = await Validation.validatePhoto(newUser.photo.name);
        newUser.middleName.isValid = await Validation.validateName(user.middleName.value);
        res.send(200, newUser);



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