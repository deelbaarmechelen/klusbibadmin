
angular.module('myApp').config(function ($stateProvider) {

    $stateProvider.state('reset-password', {
        parent: 'ng-admin',
        url: '/resetPassword/:id',
        params: { id: null },
        controller: resetPwdController,
        controllerAs: 'controller',
        template: resetPwdControllerTemplate
    });

});

angular.module('myApp').directive('resetPassword', ['$location', function ($location) {
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

