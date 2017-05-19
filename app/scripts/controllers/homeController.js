app.controller('homeController', ['$scope', '$rootScope', 'getSkylark', '$route', '$routeParams', '$location', 
    function($scope, $rootScope, getSkylark, $http, $route, $routeParams, $location) {

    $scope.allSets;
    $scope.featuredImages = {};
    $scope.loading = true;

    getSkylark.getSets()
        .then(function (response) {
            $scope.allSets = response.data.objects;

            // Use moment to format the remaining availability of the set.
            $scope.availability = moment($scope.allSets.ends_on).fromNow();

            for (key in $scope.allSets) {
                const thisSet = $scope.allSets[key];

                // Check if the set has any featured images
                if (thisSet.image_urls.length != 0) {

                    // Get the first Image URL and retrieve it from the API
                    getSkylark.getImage(thisSet.image_urls[0])
                        .then(function (response) {
                            var imageData = response.data;

                            // Retrieve the featured image data and push to image object
                            displayFeaturedImage(imageData, thisSet);

                            // Set rootscope loading to false, hiding loader.
                            $rootScope.loading = false;

                        }, function (error) {
                            $scope.status = 'Unable to load data: ' + error.message;
                        });

                }


                function displayFeaturedImage(imageEndpoint, thisSet) {
                    // console.log($scope.allSets[key]);
                    // Get the first image url and the set UI
                    $scope.featuredImages[thisSet.uid] = {
                        imageURL: imageEndpoint.url,
                        description: imageEndpoint.description
                    }
                }
            }

        }, function (error) {
            $scope.status = 'Unable to load customer data: ' + error.message;
        });

}]);