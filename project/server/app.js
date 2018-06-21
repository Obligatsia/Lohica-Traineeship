const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const IsValid = require('../src/components/validationComponent');

const Validation = new IsValid();


const app = express();
app.use(cors());
app.use(bodyParser.json());



    app.post('/addUser', async (req, res) => {
        const user = req.body;
        try {
            const result = await Validation.validateName(user.name.value);
            res.send(200, result);
        } catch (err) {
            console.log(err)
        }

    })





app.listen(8000, (()=>{
    console.log('listening');
}))