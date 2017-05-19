app.controller('singleEpisodeController', ['$scope', '$rootScope', '$location', 'getSkylark', '$http', '$routeParams', function($scope, $rootScope, $location, getSkylark, $http, $routeParams) {

    $scope.episode;
    $scope.params = $routeParams;

    var episodeId = $scope.params.episodeId;

    function getEpisode(episodeId) { 
        $http.get('/api/episodes/' + episodeId + '/')
            .then(function (response) {
                $scope.episode = response.data;

                // Set rootscope loading to false, hiding loader.
                $rootScope.loading = false;

            }, function (error) {
                $scope.status = 'Unable to load data: ' + error.message;
            });
    }
    getEpisode(episodeId);

}]);