'use strict';

var app = angular.module('ccApp');

app.controller('ccCtrl', function($scope, CCService) {

	$scope.confirmPass = function() {
		var password = $scope.user.password;
		var conPass = $scope.user.conPass;
		if(password === conPass) {
			console.log('pass match check: ', password === conPass);
			return false
		} else {
			console.log('pass match check: ', password === conPass);
			return true;
		}
	}

	$scope.checkExpDate = function(expDate) {
		if(Date.now() < expDate) {
			return true
		} else {
			return false;
		}
	}

	$scope.checkCC = function() {
		var ccNum = $scope.user.ccNum;
		console.log('ccNum: ', ccNum);
		if(!ccNum) return;
		if(ccNum.match(/\D/)) return false;
		var result = ccNum.split('').reverse().reduce((a, b, i) => {
			if(i % 2 !== 0) b *= 2;
			if(b > 9) b = b.toString().split('').reduce((c, d) => parseInt(c) + parseInt(d));
			return a + parseInt(b);
		}, 0) * 9;
		if(result % 10 === 0)	{
			console.log('luhn check: ', result % 10 === 0);
			return false
		} else {
			console.log('luhn check: ', result % 10 === 0);
			return true;
		}

		// if(ccNum) {
		// 	switch (ccNum) {
		// 		case ccNum.match(/(34|37)/):
		// 			$scope.amex = true;
		// 			console.log('amex: ', amex);
		// 			break;
		// 		case ccNum.match(/(622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5])|64[4-9]|(65)|6011)/):
		// 			$scope.disc = true;
		// 			console.log('disc: ', disc);
		// 			break;
		// 		case ccNum.match(/(5[0-5])/):
		// 			$scope.mstrcard = true;
		// 			console.log('mstrcard: ', mstrcard);
		// 			break;
		// 		case ccNum.match(/4026|417500|4405|4508|4844|4913|4917|4/):
		// 			$scope.amex = true;
		// 			console.log('amex: ', amex);
		// 			break;
		// 		default:
		// 			return false;
		// 			break;
		// 	}
		// }
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