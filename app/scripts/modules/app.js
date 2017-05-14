var app = angular.module('App', ['ngRoute']);


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider

	    // route for the home page
	    .when('/', {
	        templateUrl : 'templates/home.html',
	        controller  : 'homeController'
	    })
    
    	.when('/episode/:episodeId', {
			templateUrl: 'templates/episode.html',
			controller: 'singleEpisodeController'
		})

		.otherwise({
			templateUrl: 'templates/404.html',
		});

}]);