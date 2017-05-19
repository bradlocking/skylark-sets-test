app.controller('homeController', ['$scope', 'getSkylark', '$route', '$routeParams', '$location', 
    function($scope, getSkylark, $http, $route, $routeParams, $location) {

    $scope.allSets;
    $scope.featuredImages = {};
    $scope.loading = true;

    var homeSetID = HOME_SET_ID

    function homeSet(homeSetID) {
        getSkylark.getSets()
            .then(function (response) {
                $scope.allSets = response.data.objects;

                // Use moment to format the remaining availability of the set.
                $scope.availability = moment($scope.allSets.ends_on).fromNow();

                for (key in $scope.allSets) {
                    var thisSet = $scope.allSets[key];

                    // Check if the set has any featured images
                    if (thisSet.image_urls.length != 0) {


                        // Get the first Image URL and retrieve it from the API
                        getSkylark.getImage(thisSet.image_urls[0])
                            .then(function (response) {
                                console.log(thisSet);

                                var imageData = response.data;

                                console.log(imageData);

                                // Get the first image url and the set UI
                                $scope.featuredImages[thisSet.uid] = {
                                    imageURL: imageData.url,
                                    description: imageData.description
                                }

                            }, function (error) {
                                $scope.status = 'Unable to load customer data: ' + error.message;
                            });

                    }
                }

                console.log($scope)

            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }
    homeSet(homeSetID);

}]);