'use strict';

var app = angular.module('ccApp');

app.controller('ccCtrl', function($scope, CCService) {

	$scope.confirmPass = function() {
		var password = $scope.user.password;
		var conPass = $scope.user.conPass;
		if(password === conPass) {
			$scope.userForm.conPass.notMatch = false;
			return false
		} else {
			$scope.userForm.conPass.notMatch = true;
			return true;
		}
	}

	$scope.checkExpDate = function(expDate) {
		if(Date.now() < expDate) {
			$scope.userForm.expDate.invalidDate = false;
			return false;
		} else {
			$scope.userForm.expDate.invalidDate = true;
			return true;
		}
	}

	$scope.checkCC = function() {
		var ccNum = $scope.user.ccNum;
		if(!ccNum) return;
		if(ccNum.match(/\D/)) return false;
		var result = ccNum.split('').reverse().reduce((a, b, i) => {
			if(i % 2 !== 0) b *= 2;
			if(b > 9) b = b.toString().split('').reduce((c, d) => parseInt(c) + parseInt(d));
			return a + parseInt(b);
		}, 0) * 9;
		if(result % 10 === 0)	{
			$scope.userForm.ccNum.luhnError = false;
			return false
		} else {
			$scope.userForm.ccNum.luhnError = true;
			return true;
		}
	}

	$scope.passRegex = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}/;

	$scope.submitUserForm = function(formInvalid) {
		if(formInvalid) {

		} else {
			CCService.saveInfo($scope.user)
			.then(function(res) {
				return;
			}, function(err) {
				console.error(err);
			})
		}
	}
});