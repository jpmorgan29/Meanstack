angular.module('mainController', ['authServices'])
	.controller('mainCtrl', function(Auth, $timeout, $location){
		var app = this;
		this.doLogin = function(loginData){
			app.loading = true;
			app.errorMsg = false;

			Auth.login(app.loginData).then(function(data){
				if(data.data.success){
					app.loading = false;
					//success
					//console.log('gg');
					app.successMsg = data.data.message + '  Gelieve even te wachten';
					$timeout(function()
					{
						console.log(data);
						//kzou nog app.loginData.school moeten aanmaken zodat ik kan zeggen:

						//if(app.loginData.school === 'leerkracht'){
						//	console.log('kzn nen leerkracht');
						//	$location.path("/leerkrachten");
						//	}
						//	else{
						//	$location.path("/studenten");
						//	}
						//}
						//console.log('k kom tot hier');
						$location.path("/studenten");
					}, 2000);

				}else{
					app.loading = false;
					app.errorMsg = data.data.message;
				}
			});
		};
	});