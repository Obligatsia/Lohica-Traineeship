let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name: String,
    surName: String,
    email: String,
    photo: {data: Buffer, name: String, path: String },
    gender: String,
    age: Number,
    middleName: String,
    password: String,
    token: String,
    updated_at: { type: Date, default: Date.now },
});

let UserData = mongoose.model('Users', userSchema);



module.exports = mongoose.model('Users', userSchema);