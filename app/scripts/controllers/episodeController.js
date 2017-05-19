app.controller('episodesController', ['$scope', 'getSkylark', '$route', '$routeParams', function($scope, getSkylark, $routeParams, $route) {
    // Get the correct set of episodes to load
    $scope.params = $route;
    $scope.episodesAvailable = true;

    // store setId for later use
    var setId = $scope.params.setId;

    // Empty Episodes Array
    $scope.episodes = [];

    function getepisodes(setId) {
        getSkylark.setContent(setId)
            .then(function (response) {
                
            var episodeData = response.data.objects;

            for (var key in episodeData) {
                var contentUrl = episodeData[key].content_url;

                console.log(contentUrl);

                if (contentUrl.length != 0) {
                    if (episodeData[key].content_type === 'episode') {  
                        
                        getSkylark.episodeContent(contentUrl)
                            .then(function(response) {

                                $scope.episodes.push(response.data);

                            }, function (error) {
                                $scope.status = 'Unable to load data: ' + error.message;
                            });

                    } 
                } else {
                    $scope.episodesAvailable = false;
                }
            }

            }, function (error) {
                $scope.status = 'Unable to load data: ' + error.message;
            });
    };
    getepisodes(setId);


}]);
