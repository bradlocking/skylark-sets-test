app.controller('homeController', ['$scope', 'getSkylark', '$route', '$routeParams', '$location', 
    function($scope, getSkylark, $http, $route, $routeParams, $location) {

    $scope.set;
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;

    var homeSetID = HOME_SET_ID

    function homeSet(homeSetID) {
        getSkylark.getSingleSet(homeSetID)
            .then(function (response) {
                $scope.set = response.data;

                // console.log($scope.set)
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }
    homeSet(homeSetID);

}]);