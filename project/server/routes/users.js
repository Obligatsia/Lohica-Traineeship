var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/Users.js');

/* ADD USERS */
router.get('/find', function(req, res, next) {
    User.find(function (err, users) {
        if (err) return next(err);
        res.send(users);
    });
});

/* SAVE USERS */
router.post('/', function(req, res, next) {
    User.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE USER */
router.put('/:id', function(req, res, next) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE USER */
router.delete('/:id', function(req, res, next) {
    User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;