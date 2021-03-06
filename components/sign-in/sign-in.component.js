angular.module('signIn').component('signIn', {
	templateUrl : 'components/sign-in/sign-in.template.html',
	controller :
	[ '$http', '__env', 'Auth', '$localStorage', '$location',
		function SignInController($http, __env, Auth, $localStorage, $location) {
			var self = this;
			this.error = '';
            var successAuth = function (res) {
	            $localStorage.token = res.data.token;
	            this.error = 'Success';
	            $location.path("/");
	        };

			this.signin = function () {
              var formData = {
                  email: this.email,
                  password: this.password
              };
              delete $localStorage.token;
              Auth.signin(formData.email, formData.password, function (res) {
	            $localStorage.token = res.data.token;
	            self.error = 'Success';
	            window.location = "/";
              }, function () {
            	  self.error = 'Invalid credentials.';
              })
			};
			
			this.signout = function () {
				Auth.signout(function () {
		            self.error = 'Successfully logged out!';
				});
			}
   		} 
	]
    
});

