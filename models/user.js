'use strict';

var fs = require('fs');
var path = require('path');
var uuid = require('uuid');

var usersFilePath = path.join(__dirname, '../data/users.json');

exports.get = function(cb) {
	fs.readFile(usersFilePath, function(err, data) {
		if(err) return cb(err);
		var users = JSON.parse(data);
		cb(null, users);
	});
};

exports.write = function(newUser, cb) {
	fs.writeFile(usersFilePath, JSON.stringify(newUser), cb);
};

exports.create = function(newUser, cb) {
	this.get((err, users) => {
		if(err) return cb(err);
		newUser.id = uuid();
		users.push(newUser);
		this.write(users, cb);
	});
};

