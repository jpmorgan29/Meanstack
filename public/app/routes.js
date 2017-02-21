angular.module('appRoutes', ['ngRoute'])
.config(function($routeProvider, $locationProvider){
	$routeProvider
	.when('/', {

		templateUrl: 'app/views/pages/home.html'
	})
	.when('/about', {
		templateUrl: 'app/views/pages/about.html'
	})
	.when('/register',{
		templateUrl: 'app/views/pages/users/register.html',
		controller: 'regCtrl',
		controllerAs: 'register'
	})
	.when('/login', {
		templateUrl: 'app/views/pages/users/login.html'
	})
	.when('/studenten', {
		templateUrl: 'app/views/pages/studenten.html'
	})
	.when('/leerkrachten', {
		templateUrl: 'app/views/pages/leerkrachten.html'
	})
	.otherwise({ redirectTo: '/'});

//Internet
//om '#' weg te krijgen op het einde van elke link
//kvond het wa vervelend
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});