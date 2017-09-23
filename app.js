var env = {};

// Import variables if present (from env.js)
if(window){  
  Object.assign(env, window.__env);
}

var myApp = angular.module('myApp', [
	'ng-admin',
	'ngStorage',
	'pascalprecht.translate'
]);

//Register environment in AngularJS as constant
angular.module('myApp').constant('__env', env);


angular.module('myApp').run(function(Restangular, $location, $localStorage) {
    var islogged = function () {
        if (!$localStorage.token) {
             return false;
        } else {
        	return true;
        }
    }
	if (!islogged()) {
		window.location = "/login.html";
	}

//	Restangular.setDefaultRequestParams('get', {_perPage: 500});
	Restangular.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
		  headers = headers || {};
		  if ($localStorage.token) {
		      headers.Authorization = 'Bearer ' + $localStorage.token;
		  }
		  return { headers: headers };
		});

	Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
	    if(response.status === 401) {
			window.location = "/login.html";
	        return false; // error handled
	    }
	    return true; // error not handled
	});
});

//myApp.directive('reservation', ['$location', function ($location) {
//    return {
//        restrict: 'E',
//        scope: { post: '&' },
//        link: function (scope) {
//            scope.send = function () {
//                $location.path('/reservations/create' + scope.post().values.user_id);
//            };
//        },
//        template: '<a class="btn btn-default" ng-click="send()">Reserveer</a>'
//    };
//}]);