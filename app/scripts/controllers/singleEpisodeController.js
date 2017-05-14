app.controller('singleEpisodeController', ['$scope', '$location', 'getSkylark', '$routeParams', function($scope, getSkylark, $http, $routeParams) {

    $scope.episode;
    $scope.params = $routeParams

    var episodeApiUrl = '/api/episodes/'+ $scope.params.episodeId +'/items/'; 

    $scope.message = 'this is the message';

    console.log($routeParams);

    function getEpisode(episodeApiUrl) {
        getSkylark.episodeContent(episodeApiUrl)
            .then(function (response) {
                $scope.episode = response.data;

                console.log($scope.episode);

                // console.log($scope.set)
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }
    getEpisode(episodeApiUrl);

}]);