'use strict';

var express = require('express');
var router = express.Router();

var User = require('../models/user.js');

router.get('/', function(req, res) {
	User.get(function(err, users) {
		if(err) return res.status(400).send(err);
		res.send(users);
	});
});

router.post('/', function(req, res) {
	var newUser = req.body;
	console.log('newUser: ', newUser);
	User.create(newUser, function(err) {
		if(err) return res.status(400).send(err);
		res.send();
	});
});

module.exports = router;