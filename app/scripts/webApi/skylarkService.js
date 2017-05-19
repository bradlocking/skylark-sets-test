app.service('getSkylark', ['$http', function ($http) {
    // Get a list of every set.
    this.getSets = function () {
        return $http.get('/api/sets/');
    };

    // Get the metadata for a particular set.
    this.getSingleSet = function (uid) {
        return $http.get('/api/sets/' + uid + '/');
    };


    // Get the content for a particular set.
    this.setContent = function (uid) {
        return $http.get('/api/sets/' + uid + '/items/');
    };


    // Get the metadata for a particular episode.
    this.episodeContent = function (uid) {
        return $http.get(uid);
    };


    // Get an image from the API.
    this.getImage = function (uid) {
        return $http.get(uid);
    };
}]);