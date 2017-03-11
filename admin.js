var env = {};

// Import variables if present (from env.js)
if(window){  
  Object.assign(env, window.__env);
}

var myApp = angular.module('myApp', [
	'ng-admin',
	'ngStorage'
]);

//Register environment in AngularJS as constant
myApp.constant('__env', env);

myApp.config(['NgAdminConfigurationProvider', '__env', function (nga, __env) {
    var admin = nga.application('Klusbib Admin')
    .baseApiUrl(__env.apiUrl + '/'); // main API endpoint

    var tool = nga.entity('tools')
    	.identifier(nga.field('tool_id')); // the API endpoint for tools will be '__env.apiUrl/tools/:id
    tool.listView()
        .fields([
            nga.field('tool_id').isDetailLink(true),
            nga.field('name').isDetailLink(true),
            nga.field('description'),
            nga.field('category')
        ]);
    tool.creationView().fields([
        nga.field('name')
            .validation({ required: true, minlength: 2, maxlength: 50 }),
        nga.field('description'),
        nga.field('category'),
        nga.field('link'),
    ]);
    tool.editionView().fields(
            nga.field('tool_id').editable(false),
            tool.creationView().fields());
    admin.addEntity(tool)

    var user = nga.entity('users').identifier(nga.field('user_id'));; // the API endpoint for users will be '/api/public/tools/:id
    user.listView()
        .fields([
            nga.field('user_id').isDetailLink(true),
            nga.field('firstname').isDetailLink(true),
            nga.field('lastname'),
            nga.field('role')
        ]);
    user.creationView().fields([
        nga.field('firstname')
            .validation({ required: true, minlength: 2, maxlength: 20 }),
        nga.field('lastname')
            .validation({ required: true, minlength: 2, maxlength: 20 }),
        nga.field('role'),
        nga.field('membership_start_date'),
        nga.field('membership_end_date'),
    ]);
    user.editionView().fields(
            nga.field('user_id').editable(false),
            user.creationView().fields());
    user.showView().fields([
        nga.field('firstname'),
        nga.field('lastname'),
        nga.field('role'),
        nga.field('reservations', 'referenced_list')
            .targetEntity(nga.entity('reservations'))
            .targetReferenceField('user_id')
            .targetFields([
                nga.field('title'),
                nga.field('type')
            ])
    ]);

    admin.addEntity(user)

    var reservation = nga.entity('reservations').identifier(nga.field('reservation_id'));;
    reservation.listView()
        .fields([
            nga.field('reservation_id').isDetailLink(true),
            nga.field('title').isDetailLink(true),
            nga.field('startsAt'),
            nga.field('endsAt'),
            nga.field('type'),
    ]);
    reservation.creationView().fields([
        nga.field('tool_id'),
        nga.field('user_id'),
        nga.field('title'),
        nga.field('startsAt'),
        nga.field('endsAt'),
        nga.field('type')
    ]);
    reservation.editionView().fields(reservation.creationView().fields());
    admin.addEntity(reservation);

//    admin.menu(nga.menu()
//        .addChild(nga.menu(user).icon('<span class="glyphicon glyphicon-user"></span>'))
//        .addChild(nga.menu(post).icon('<span class="glyphicon glyphicon-pencil"></span>'))
//    );

    nga.configure(admin);
}]);

// still required??
myApp.config(['RestangularProvider', '$localStorageProvider', function (RestangularProvider, $localStorageProvider) {
	RestangularProvider.setDefaultHeaders({Authorization: "Bearer x-restangular"});
}]);

myApp.run(function(Restangular, $location, $localStorage) {
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
	Restangular.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
		  headers = headers || {};
		  if ($localStorage.token) {
		      headers.Authorization = 'Bearer ' + $localStorage.token;
		  }
		
		  return { headers: headers };
		});
});


