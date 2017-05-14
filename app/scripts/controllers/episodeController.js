app.controller('episodesController', ['$scope', 'getSkylark', function($scope, getSkylark, $routeParams) {

    // We only want the Home set, so it has been defined as a constant on the homepage.
    var setContent = HOME_SET_ID;

    // Empty Episodes Array
    $scope.episodes = [];

    function getepisodes(setContent) {
        getSkylark.setContent(setContent)
            .then(function (response) {
                
            var episodeData = response.data.objects;

            for (var key in episodeData) {
                var contentUrl = episodeData[key].content_url;

                if (episodeData[key].content_type === 'episode') {  
                    
                    getSkylark.episodeContent(contentUrl)
                        .then(function(response) {

                            $scope.episodes.push(response.data);

                        }, function (error) {
                            $scope.status = 'Unable to load customer data: ' + error.message;
                        });

                } 
            }
                


            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    };
    getepisodes(setContent);


}]);
