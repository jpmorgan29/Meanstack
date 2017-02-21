angular.module('userServices' , [])
.factory('User', function($http){
	var userFactory = {};
	userFactory.create = function(regData){
		return $http.post('api/users', regData); //van endpoint --> controller
	};
	return userFactory;
});

//$http.post('api/users', this.regData).then(function(data){