'use strict';
var env = {};

//Import variables if present (from env.js)
if(window){  
Object.assign(env, window.__env);
}

var appSignin = angular.module('login', [
	  'ngStorage',
	  'signIn', 
]);

//Register environment in AngularJS as constant
appSignin.constant('__env', env);
