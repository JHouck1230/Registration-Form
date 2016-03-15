'use strict';

var app = angular.module('ccApp');

app.service('CCService', function($http) {
	this.saveInfo = function(user) {
		return $http.post('/users', user);
	};
});