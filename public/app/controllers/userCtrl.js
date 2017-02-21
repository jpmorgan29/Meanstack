angular.module('userControllers', ['userServices'])
.controller('regCtrl', function($location, $timeout, User){
	//function($http)
	var app = this; //kan geen this.this doen
	app.regUser = function(regData){
		app.loading = true; 
		app.errorMsg = false; //anders blijft de error staan als men een gebruiker al heeft aangemaakt
		//init service to save in db
		User.create(app.regData).then(function(data){
			if (data.data.success)
		//	if (app.regData.school == 'student' || app.regData.school == 'leerkracht')
		//	if (data.data.success && app.regData.school === 'student' || app.regData.school === 'leerkracht')
			{
				app.loading = false;
				//success msg 
				app.successMsg = data.data.message + '  Gelieve even te wachten';
				$timeout(function()
				{

					//naar homepage gaan
					$location.path('/login'); 
				}, 5000);
			}
			else
			{
				//create error msg
				app.loading = false;
				app.errorMsg = data.data.message;

			}
		});
	};
});