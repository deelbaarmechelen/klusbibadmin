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


myApp.config(function ($translateProvider) {
    $translateProvider.translations('en', {
        'BACK': 'Back',
        'DELETE': 'Delete',
        'CREATE': 'Create',
        'EDIT': 'Edit',
        'EXPORT': 'Export',
        'ADD_FILTER': 'Add filter',
        'SEE_RELATED': 'See all related {{ entityName }}',
        'LIST': 'List',
        'SHOW': 'Show',
        'SAVE': 'Save',
        'N_SELECTED': '{{ length }} Selected',
        'ARE_YOU_SURE': 'Are you sure?',
        'YES': 'Yes',
        'NO': 'No',
        'FILTER_VALUES': 'Filter values',
        'CLOSE': 'Close',
        'CLEAR': 'Clear',
        'CURRENT': 'Current',
        'REMOVE': 'Remove',
        'ADD_NEW': 'Add new {{ name }}',
        'BROWSE': 'Browse',
        'N_COMPLETE': '{{ progress }}% Complete',
        'CREATE_NEW': 'Create new',
        'SUBMIT': 'Submit',
        'SAVE_CHANGES': 'Save changes',
        'BATCH_DELETE_SUCCESS': 'Elements successfully deleted',
        'DELETE_SUCCESS': 'Element successfully deleted',
        'ERROR_MESSAGE': 'Oops, an error occurred (code: {{ status }})',
        'INVALID_FORM': 'Invalid form',
        'CREATION_SUCCESS': 'Element successfully created',
        'EDITION_SUCCESS': 'Changes successfully saved',
        'ACTIONS': 'Actions',
        'PAGINATION': '<strong>{{ begin }}</strong> - <strong>{{ end }}</strong> of <strong>{{ total }}</strong>',
        'NO_PAGINATION': 'No record found',
        'PREVIOUS': '« Prev',
        'NEXT': 'Next »',
        'DETAIL': 'Detail',
        'STATE_CHANGE_ERROR': 'State change error: {{ message }}',
        'STATE_FORBIDDEN_ERROR': 'A server 403 error occured: {{ message }}',
        'NOT_FOUND': 'Not Found',
        'NOT_FOUND_DETAILS': 'The page you are looking for cannot be found. Take a break before trying again.',
    });
    $translateProvider.translations('nl', {
        'BACK': 'Terug',
        'DELETE': 'Verwijdeen',
        'CREATE': 'Aanmaken',
        'EDIT': 'Bewerken',
        'EXPORT': 'Exporteren',
        'ADD_FILTER': 'Filter toevoegen',
        'SEE_RELATED': 'See all related {{ entityName }}',
        'LIST': 'Lijst',
        'SHOW': 'Bekijken',
        'SAVE': 'Opslaan',
        'N_SELECTED': '{{ length }} Geselecteerd',
        'ARE_YOU_SURE': 'Ben je zeker?',
        'YES': 'Ja',
        'NO': 'Nee',
        'FILTER_VALUES': 'Filter values',
        'CLOSE': 'Sluiten',
        'CLEAR': 'Clear',
        'CURRENT': 'Huidige',
        'REMOVE': 'Verwijder',
        'ADD_NEW': 'Add new {{ name }}',
        'BROWSE': 'Browse',
        'N_COMPLETE': '{{ progress }}% Complete',
        'CREATE_NEW': 'Toevoegen nieuwe',
        'SUBMIT': 'Submit',
        'SAVE_CHANGES': 'Wijzigingen opslaan',
        'BATCH_DELETE_SUCCESS': 'Elementen succesvol verwijderd',
        'DELETE_SUCCESS': 'Element succesvol verwijderd',
        'ERROR_MESSAGE': 'Oeps, er was een fout (code: {{ status }})',
        'INVALID_FORM': 'Ongeldig formulier',
        'CREATION_SUCCESS': 'Element succesvol aangemaakt',
        'EDITION_SUCCESS': 'Wijzigingen succesvol opgeslagen',
        'ACTIONS': 'Acties',
        'PAGINATION': '<strong>{{ begin }}</strong> - <strong>{{ end }}</strong> of <strong>{{ total }}</strong>',
        'NO_PAGINATION': 'Geen record gevonden',
        'PREVIOUS': '« Vorig',
        'NEXT': 'Volg. »',
        'DETAIL': 'Detail',
        'STATE_CHANGE_ERROR': 'State change error: {{ message }}',
        'STATE_FORBIDDEN_ERROR': 'A server 403 error occured: {{ message }}',
        'NOT_FOUND': 'Niet Gevonden',
        'NOT_FOUND_DETAILS': 'We kunnen de gevraagde pagina niet vinden.',
        'TOOLS': 'Materialen',
        'USERS': 'Gebruikers',
        'RESERVATIONS': 'Reservaties',
        'CONSUMERS': 'Verbruiksmaterialen',
        'TOOL': 'Materiaal',
        'USER': 'Gebruiker',
        'RESERVATION': 'Reservatie',
        'CONSUMER': 'Verbruiksmateriaal'
    });

	  $translateProvider.preferredLanguage('nl');
});

	
//Register environment in AngularJS as constant
myApp.constant('__env', env);

myApp.config(['NgAdminConfigurationProvider', '__env', function (nga, __env) {
    var admin = nga.application('Klusbib Admin')
    .baseApiUrl(__env.apiUrl + '/'); // main API endpoint

    var user = nga.entity('users').identifier(nga.field('user_id')); // the API endpoint for users will be '/api/public/users/:id
    var tool = nga.entity('tools').identifier(nga.field('tool_id')); // the API endpoint for tools will be '__env.apiUrl/tools/:id
    var reservation = nga.entity('reservations').identifier(nga.field('reservation_id'));

    user.listView()
        .fields([
            nga.field('user_id').label('Lidnummer').isDetailLink(true),
            nga.field('firstname').label('Voornaam').isDetailLink(true),
            nga.field('lastname').label('Naam'),
            nga.field('role', 'choice')
    		.choices([
    			{ value: 'admin', label: 'Admin' },
    			{ value: 'member', label: 'Lid' },
    			{ value: 'supporter', label: 'Steunlid' },
    		]).label('Rol'),
            nga.field('state', 'choice')
    		.choices([
    			{ value: 'ACTIVE', label: 'Actief' },
    			{ value: 'DISABLED', label: 'Inactief' },
    			{ value: 'CONFIRM_EMAIL', label: 'Email verificatie' },
    			{ value: 'CHECK_PAYMENT', label: 'Betaling nakijken' },
    			{ value: 'DELETED', label: 'Verwijderd' },
    		]).label('Status'),
    	])
    	.sortField('user_id')
    	.sortDir('ASC')
    	.perPage('30')
    	.listActions([
  	    '<ma-show-button entry="entry" entity="entity" label="Bekijken" size="xs">' +
  	    '</ma-show-button>',
  	    '<ma-edit-button entry="entry" entity="entity" label="Bewerken" size="xs">' +
  	    '</ma-edit-button>',
  	    '<ma-delete-button entry="entry" entity="entity" label="Verwijderen" size="xs">' +
  	    '</ma-delete-button>'])
//    	.listActions(['show', 'edit'])
    	.exportFields([
    		nga.field('user_id', 'number').label('lidnummer'),
    		nga.field('firstname').label('Voornaam'),
    		nga.field('lastname').label('Naam'),
    		nga.field('role').label('role'),
    		nga.field('state').label('status'),
    		nga.field('membership_start_date').label('lidmaatschap start'),
    		nga.field('membership_end_date').label('lidmaatschap einde'),
            nga.field('email', 'email'),
            nga.field('birth_date').label('Geboortedatum'),
            nga.field('address').label('Adres'),
            nga.field('postal_code').label('Postcode'),
            nga.field('city').label('Stad'),
            nga.field('phone').label('Telefoon'),
            nga.field('mobile').label('GSM'),
            nga.field('registration_number').label('Rijksregistratie'),
            nga.field('payment_mode').label('Betalingswijze'),
         ])
         .exportOptions({
        	quotes: true,
        	delimiter: ';'
         });

    user.creationView().fields([
        nga.field('user_id'),
        nga.field('state', 'choice')
		.choices([
			{ value: 'ACTIVE', label: 'Actief' },
			{ value: 'DISABLED', label: 'Inactief' },
			{ value: 'CONFIRM_EMAIL', label: 'Email verificatie' },
			{ value: 'CHECK_PAYMENT', label: 'Betaling nakijken' },
			{ value: 'DELETED', label: 'Verwijderd' },
		]),
        nga.field('firstname')
            .validation({ required: true, minlength: 2, maxlength: 20 }),
        nga.field('lastname')
            .validation({ required: true, minlength: 2, maxlength: 20 }),
        nga.field('email', 'email'),
//        nga.field('hash', 'password'),
        nga.field('role', 'choice')
    		.choices([
    			{ value: 'admin', label: 'Admin' },
    			{ value: 'member', label: 'Lid' },
    			{ value: 'supporter', label: 'Steunlid' },
    	]),
        nga.field('membership_start_date').label('Start lidmaatschap (JJJJ/MM/DD)'),
        nga.field('membership_end_date').label('Einde lidmaatschap (JJJJ/MM/DD)'),
        nga.field('birth_date').label('Geboortedatum (JJJJ/MM/DD)'),
        nga.field('address').label('Adres').validation({ required: false, maxlength: 50 }),
        nga.field('postal_code').label('Postcode').validation({ required: false, maxlength: 5 }),
        nga.field('city').label('Stad').validation({ required: false, maxlength: 50 }),
        nga.field('phone').label('Telefoon').validation({ required: false, maxlength: 15 }),
        nga.field('mobile').label('GSM').validation({ required: false, maxlength: 15 }),
        nga.field('registration_number').label('Rijksregistratie').validation({ required: false, maxlength: 15 }),
        nga.field('payment_mode', 'choice')
        .choices([
			{ value: 'CASH', label: 'Cash' },
			{ value: 'TRANSFER', label: 'Overschrijving' },
			{ value: 'PAYCONIQ', label: 'Payconiq' },
			])
        .label('Betalingswijze').validation({ required: false, maxlength: 20 }),
    ]);
    user.editionView()
    	.title('Edit user "{{ entry.values.firstname }} {{ entry.values.lastname }}"')
    	.fields(
       		nga.field('custom_action')
       		.label('Paswoord reset')
       		.template('<reset-password post="entry"></reset-password>'),
            user.creationView().fields())
        .onSubmitError(['error', 'progression', 'notification', function(error, progression, notification) {
        	// stop the progress bar
        	progression.done();
        	// add a notification
        	notification.log(`Some values are invalid: ` + error.data, { addnCls: 'humane-flatty-error' });
        	// cancel the default action (default error messages)
        	return false;
        }]);

    user.showView().fields([
        nga.field('user_id'),
        nga.field('state', 'choice')
		.choices([
			{ value: 'ACTIVE', label: 'Actief' },
			{ value: 'DISABLED', label: 'Inactief' },
			{ value: 'CONFIRM_EMAIL', label: 'Email verificatie' },
			{ value: 'CHECK_PAYMENT', label: 'Betaling nakijken' },
			{ value: 'DELETED', label: 'Verwijderd' },
		]),
        nga.field('firstname'),
        nga.field('lastname'),
        nga.field('role', 'choice')
		.choices([
			{ value: 'admin', label: 'Admin' },
			{ value: 'member', label: 'Lid' },
			{ value: 'supporter', label: 'Steunlid' },
			]),
        nga.field('membership_start_date').label('Start lidmaatschap (JJJJ/MM/DD)'),
        nga.field('membership_end_date').label('Einde lidmaatschap (JJJJ/MM/DD)'),
        nga.field('birth_date').label('Geboortedatum (JJJJ/MM/DD)'),
        nga.field('address').label('Adres'),
        nga.field('postal_code').label('Postcode'),
        nga.field('city').label('Stad'),
        nga.field('phone').label('Telefoon'),
        nga.field('mobile').label('GSM'),
        nga.field('registration_number').label('Rijksregistratie'),
        nga.field('payment_mode', 'choice')
        .choices([
			{ value: 'CASH', label: 'Cash' },
			{ value: 'TRANSFER', label: 'Overschrijving' },
			{ value: 'PAYCONIQ', label: 'Payconiq' },
			])
		.label('Betalingswijze'),
        nga.field('created_at.date').label('Aangemaakt op'),
        nga.field('updated_at.date').label('Laatste wijziging'),
        nga.field('reservations', 'embedded_list') // Define a 1-N relationship with the (embedded) comment entity
        	.targetEntity(reservation)
        	.targetFields([ // which reservation fields to display in the datagrid / form
        		nga.field('reservation_id'),
        		nga.field('tool_id'),
//        		nga.field('tool_id', 'reference')
//            		.label('Tool code')
//            		.targetEntity(tool)
//            		.targetField(nga.field('code')),
        		nga.field('title'),
        		nga.field('startsAt'),
        		nga.field('endsAt'),
        		nga.field('type')
        		]),
    ]);

    admin.addEntity(user).title('USERS');

    tool.listView()
        .fields([
            nga.field('code').isDetailLink(true),
            nga.field('name').label('Naam').isDetailLink(true),
            nga.field('brand').label('Merk'),
            nga.field('type').label('Type'),
            nga.field('category', 'choice')
        	.choices([
        		{ value: 'general', label: 'Algemeen' },
        		{ value: 'car', label: 'Auto' },
        		{ value: 'construction', label: 'Bouw' },
        		{ value: 'electricity', label: 'Elektriciteit' },
        		{ value: 'sanitary', label: 'Sanitair' },
        		{ value: 'wood', label: 'Schrijnwerk' },
        		{ value: 'garden', label: 'Tuin' },
        	]).label('Categorie')
        ])
        .sortField('code')
    	.sortDir('ASC')
    	.perPage('30')
    	.listActions([
  	    '<ma-show-button entry="entry" entity="entity" label="Bekijken" size="xs">' +
  	    '</ma-show-button>',
  	    '<ma-edit-button entry="entry" entity="entity" label="Bewerken" size="xs">' +
  	    '</ma-edit-button>',
  	    '<ma-delete-button entry="entry" entity="entity" label="Verwijderen" size="xs">' +
  	    '</ma-delete-button>'])
    	.exportFields([
    		nga.field('tool_id').label('Tool id'),
    		nga.field('name').label('Naam'),
    		nga.field('description').label('Beschrijving'),
    		nga.field('category').label('Categorie'),
    		nga.field('brand').label('Merk'),
    		nga.field('type').label('Type'),
    		nga.field('code').label('Code'),
            nga.field('owner_id').label('ID Eigenaar'),
            nga.field('reception_date').label('Ontvangen op'),
            nga.field('serial').label('Serienummer'),
            nga.field('manufacturing_year').label('Fabrikatie jaar'),
            nga.field('manufacturing_url').label('Fabrikant url'),
            nga.field('img').label('Afbeelding url'),
            nga.field('doc_url').label('Documentatie url'),
            nga.field('replacement_value').label('Vervangwaarde'),
            nga.field('experience_level').label('Ervaring'),
            nga.field('safety_risk').label('Veiligheidsrisico'),
         ])
         .exportOptions({
        	quotes: true,
        	delimiter: ';'
         });

	
    tool.creationView().fields([
        nga.field('name').label('Naam')
            .validation({ required: true, minlength: 2, maxlength: 50 }),
        nga.field('description').label('Beschrijving'),
        nga.field('category', 'choice')
        	.choices([
        		{ value: 'general', label: 'Algemeen' },
        		{ value: 'car', label: 'Auto' },
        		{ value: 'construction', label: 'Bouw' },
        		{ value: 'electricity', label: 'Elektriciteit' },
        		{ value: 'sanitary', label: 'Sanitair' },
        		{ value: 'wood', label: 'Schrijnwerk' },
        		{ value: 'garden', label: 'Tuin' },
        ]).label('Categorie'),
        nga.field('brand').label('Merk').validation({ required: false, maxlength: 20 }),
        nga.field('type').validation({ required: false, maxlength: 20 }),
        nga.field('code').defaultValue('not assigned').validation({ required: false, maxlength: 20 }),
        nga.field('owner_id', 'reference')
		.targetEntity(user)
		.targetField(nga.field('user_id').map(function fullname(value, entry) {
	          return value + ' (' + entry.firstname + ' ' + entry.lastname + ')';
	      }))
        .label('Eigenaar'),

        nga.field('reception_date').label('Ontvangen op (JJJJ/MM/DD)'),
        nga.field('serial').label('Serienummer').validation({ required: false, maxlength: 50 }),
        nga.field('manufacturing_year').label('Fabrikatie jaar')
                    .validation({ minlength: 4, maxlength: 4 }),
        nga.field('manufacturer_url').label('Website fabrikant').validation({ required: false, maxlength: 255 }),
        nga.field('img').label('Url afbeelding').validation({ required: false, maxlength: 255 }),
        nga.field('doc_url').label('Url handleiding').validation({ required: false, maxlength: 255 }),
        nga.field('replacement_value').label('Vervangwaarde'),
        nga.field('experience_level', 'choice').choices([
    		{ value: 'JUNIOR', label: 'Beginner' },
    		{ value: 'MEDIOR', label: 'Gemiddeld' },
    		{ value: 'SENIOR', label: 'Ervaren' }
    		]).label('Vereiste ervaring'),
        nga.field('safety_risk', 'choice').choices([
    		{ value: 'LOW', label: 'Laag' },
    		{ value: 'MEDIUM', label: 'Gemiddeld' },
    		{ value: 'HIGH', label: 'Hoog' }
    		]).label('Veiligheidsrisico')
    ]);
    tool.editionView().fields(
            nga.field('tool_id').editable(false),
//       		nga.field('custom_action')
//       		.label('Reserveer')
//       		.template('<button post="entry"></button>'),
            tool.creationView().fields());

    tool.showView().fields([
        nga.field('tool_id'),
        tool.creationView().fields(),
    nga.field('reservations', 'embedded_list') // Define a 1-N relationship with the (embedded) comment entity
	.targetEntity(reservation)
	.targetFields([ // which comment fields to display in the datagrid / form
		nga.field('reservation_id'),
		nga.field('tool_id'),
//		nga.field('tool_id', 'reference')
//    		.label('Tool code')
//    		.targetEntity(tool)
//    		.targetField(nga.field('code')),
		nga.field('title'),
		nga.field('startsAt'),
		nga.field('endsAt'),
		nga.field('type')
		]),
		]);

    admin.addEntity(tool)
    
    reservation.listView()
        .fields([
            nga.field('reservation_id').isDetailLink(true),
            nga.field('tool_id', 'reference')
            	.label('Tool code')
            	.targetEntity(tool)
            	.targetField(nga.field('code')),
            nga.field('user_id', 'reference')
        		.label('User firstname')
        		.targetEntity(user)
        		.targetField(nga.field('firstname')),
            nga.field('user_id', 'reference')
        		.label('User lastname')
        		.targetEntity(user)
        		.targetField(nga.field('lastname')),
            nga.field('title').isDetailLink(true),
            nga.field('startsAt', 'date'),
            nga.field('endsAt', 'date'),
            nga.field('type', 'choice')
			.choices([
				{ value: 'maintenance', label: 'Onderhoud' },
				{ value: 'reservation', label: 'Reservatie' },
				{ value: 'loan', label: 'Uitgeleend' },
		])
    ]);
    reservation.creationView().fields([
        nga.field('tool_id'),
        nga.field('tool_id', 'reference')
    		.label('Tool code')
    		.targetEntity(tool)
    		.targetField(nga.field('code'))
    		.sortField('code')
    		.sortDir('ASC'),
        nga.field('user_id'),
        nga.field('user_id', 'reference')
			.label('User firstname')
			.targetEntity(user)
			.targetField(nga.field('firstname'))
			.sortField('firstname')
			.sortDir('ASC'),
		nga.field('user_id', 'reference')
			.label('User lastname')
			.targetEntity(user)
			.targetField(nga.field('lastname'))
			.sortField('lastname')
			.sortDir('DESC'),
        nga.field('title'),
        nga.field('startsAt'),
        nga.field('endsAt'),
        nga.field('type', 'choice')
			.choices([
				{ value: 'maintenance', label: 'Onderhoud' },
				{ value: 'reservation', label: 'Reservatie' },
				{ value: 'loan', label: 'Uitgeleend' },
		])
    ]);
    reservation.editionView().fields(reservation.creationView().fields());
    admin.addEntity(reservation);

    var consumer = nga.entity('consumers')
		.identifier(nga.field('consumer_id')); // the API endpoint for tools will be '__env.apiUrl/consumers/:id
	consumer.listView()
	    .fields([
	        nga.field('consumer_id').isDetailLink(true),
	        nga.field('category'),
	        nga.field('brand').isDetailLink(true),
	        nga.field('reference').isDetailLink(true),
	        nga.field('description')
	    ]);
	consumer.creationView().fields([
	    nga.field('category'),
	    nga.field('brand'),
	    nga.field('reference'),
	    nga.field('description'),
	    nga.field('price'),
	    nga.field('unit'),
	    nga.field('stock'),
	    nga.field('low_stock'),
	    nga.field('packed_per'),
	    nga.field('provider'),
	    nga.field('comment'),
        nga.field('public', 'choice')
		.choices([
			{ value: 0, label: 'Nee' },
			{ value: 1, label: 'Ja' },
		])
	]);
	consumer.editionView().fields(
	        nga.field('consumer_id').editable(false),
	        consumer.creationView().fields());
	admin.addEntity(consumer);

	admin.menu(nga.menu()
	  .addChild(nga.menu(user).title('USERS')
//			  .addChild(nga.menu().title('Paswoord reset'))
			  )
	  .addChild(nga.menu(tool).title('TOOLS'))
	  .addChild(nga.menu(reservation).title('RESERVATIONS'))
	  .addChild(nga.menu(consumer).title('CONSUMERS'))
			  //.icon('<span class="glyphicon glyphicon-tags"></span>'))
      .addChild(nga.menu().template(`
        <a href="/login.html">
            <span class="glyphicon glyphicon-user"></span>
            Inloggen/Uitloggen
        </a>`
      ))
	);

    nga.configure(admin);
}]);

myApp.config(function ($stateProvider) {

    $stateProvider.state('reset-password', {
        parent: 'ng-admin',
        url: '/resetPassword/:id',
        params: { id: null },
        controller: resetPwdController,
        controllerAs: 'controller',
        template: resetPwdControllerTemplate
    });

});

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

myApp.directive('resetPassword', ['$location', function ($location) {
    return {
        restrict: 'E',
        scope: { post: '&' },
        link: function (scope) {
            scope.send = function () {
                $location.path('/resetPassword/' + scope.post().values.user_id);
            };
        },
        template: '<a class="btn btn-default" ng-click="send()">Verander paswoord</a>'
    };
}]);

function resetPwdController($scope, $stateParams, notification, $http, $localStorage, __env) {
    this.userId = $stateParams.id;
    // notification is the service used to display notifications on the top of the screen
    this.notification = notification;
    this.http = $http;
    this.localStorage = $localStorage;
    this.apiUrl = __env.apiUrl;
};
resetPwdController.inject = ['$scope', '$stateParams', 'notification', '$http', '$localStorage', '__env'];
resetPwdController.prototype.resetPwd = function() {
    var data = { password : this.password };
    var self = this;
    this.http.put(this.apiUrl + '/users/' + this.userId, data, {
        headers: {'Authorization': 'Bearer ' + this.localStorage.token}
    }).then(function() {
    	self.notification.log('Password successfully updated for ' + self.userId +  '(' + self.password + ')');
    }, function() {
    	self.notification.log('Password update failed for ' + self.userId +  '(' + self.password + ')');
    });
};

var resetPwdControllerTemplate =
    '<div class="row"><div class="col-lg-12">' +
        '<ma-view-actions><ma-back-button></ma-back-button></ma-view-actions>' +
        '<div class="page-header">' +
            '<h1>Paswoord reset voor gebruiker met id {{ controller.userId }}</h1>' +
        '</div>' +
    '</div></div>' +
    '<div class="row">' +
    '<div class="col-lg-5"><input type="text" size="20" ng-model="controller.password" class="form-control" placeholder="[nieuw paswoord]"/></div>' +
    '<div class="col-lg-2"><a class="btn btn-default" ng-click="controller.resetPwd()">Reset</a></div>' +
    '</div>';

