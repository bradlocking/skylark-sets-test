app.service('getSkylark', ['$http', function ($http) {

    var urlBase = 'http://feature-code-test.skylark-cms.qa.aws.ostmodern.co.uk:8000';


    // Get a list of every set.
    this.getSets = function () {
        return $http.get(urlBase + '/api/sets/');
    };


    // Get the metadata for a particular set.
    this.getSingleSet = function (uid) {
        return $http.get(urlBase + '/api/sets/' + uid + '/');
    };


    // Get the content for a particular set.
    this.setContent = function (uid) {
        return $http.get(urlBase + '/api/sets/' + uid + '/items/');
    };


    // Get the metadata for a particular episode.
    this.episodeContent = function (uid) {
        return $http.get(urlBase + uid);
    };

}]);