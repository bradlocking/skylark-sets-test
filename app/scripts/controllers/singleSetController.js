app.controller('singleSetController', ['$scope', 'getSkylark', '$route', '$routeParams', '$location', 
    function($scope, getSkylark, $http, $route, $routeParams, $location) {
        
    $scope.singleSet;
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;

    var theSetId = $scope.$route.setId;

    console.log($scope);

    function singleSet(theSetId) {
        getSkylark.getSingleSet(theSetId)
            .then(function (response) {
                $scope.singleSet = response.data;

                // Use moment to format the remaining availability of the set.
                $scope.availability = moment($scope.singleSet.ends_on).fromNow()

                console.log($scope.singleSet)
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }
    singleSet(theSetId);

}]);