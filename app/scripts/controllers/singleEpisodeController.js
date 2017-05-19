app.controller('singleEpisodeController', ['$scope', '$location', 'getSkylark', '$routeParams', function($scope, getSkylark, $http, $routeParams) {

    $scope.episode;
    $scope.params = $routeParams

    var episodeApiUrl = '/api/episodes/'+ $scope.params.episodeId +'/items/'; 

    $scope.message = 'this is the message';

    function getEpisode(episodeApiUrl) { 
        getSkylark.episodeContent(episodeApiUrl)
            .then(function (response) {
                $scope.episode = response.data;
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }
    getEpisode(episodeApiUrl);

}]);