var app = angular.module('App', ['ngRoute']);


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider

	    // route for the home page
	    .when('/', {
	        templateUrl : 'templates/home.html',
	        controller  : 'homeController'
	    })

	    // route for the single set page
	    .when('/set/:setId', {
	        templateUrl : 'templates/set.html',
	        controller  : 'singleSetController'
	    })
    
    	.when('/episode/:episodeId', {
			templateUrl: 'templates/episode.html',
			controller: 'singleEpisodeController'
		})

		.otherwise({
			templateUrl: 'templates/404.html',
		});

}]);


// Run this whenever routing to another page.
app.run(function($rootScope, $location) {
	$rootScope.$on( '$locationChangeStart', function(event, next, current) {
		$rootScope.loading = true;
	});
});