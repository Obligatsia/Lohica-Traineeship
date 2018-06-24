const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const IsValid = require('../src/components/validationComponent');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const users = require('./routes/users');
const fs = require('fs');
const router = express.Router();
const Users = require('./models/Users.js');


const db = mongoose.connection;
mongoose.connect('mongodb://localhost:27017/myDataBase', ((err)=>{
    if (err) throw err;
    console.log('Successfully connected');
}))

// fs.readdirSync(__dirname+'/models').forEach((fileName)=>{
// if(~fileName.indexOf('.js')) require(__dirname+'/models/'+fileName)
// })

const Validation = new IsValid();


const app = express();
app.use(cors());

app.use('/users', users);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/addUser', async (req, res) => {
        const user = req.body;
        const psw = Math.random().toString(36).slice(-8);
console.log(req.body);
        try {
            user.password.value = psw;
           user.name.isValid = await Validation.validateName(user.name.value);
           user.surName.isValid = await Validation.validateName(user.surName.value);
           user.email.isValid = await Validation.validateEmail(user.email.value);
           user.age.isValid = await Validation.validateAge(user.age.value);
           user.photo.isValid = await Validation.validatePhoto(user.photo.value);
           user.middleName.isValid = await Validation.validateName(user.middleName.value);
            res.send(200, user);


            let newUser = new Users({name:user.name.value, surName: user.surName.value});
            newUser.save(function (err, user) {
                if (err) return console.error(err);
                console.log(user.name + " saved to users.");
                myss = Users.collection.find();
                console.log(myss);
            });

        } catch (err) {
            console.log(err)
        }

    })





app.listen(8000, (()=>{
    console.log('listening');
}))