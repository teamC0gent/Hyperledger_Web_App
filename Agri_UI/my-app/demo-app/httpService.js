appname.service('httpService', function ($rootScope, $http) {
    var API_URL = 'http://localhost:3000/api/';

    this.get = function(url) {
        return $http({
            url: API_URL + url,
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    this.post = function(url, data) {
        return $http({
            url: API_URL + url,
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        });
    };

    this.put = function(url, data) {
        return $http({
            url: API_URL + url,
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        });
    };

    this.delete = function(url) {
        return $http({
            url: API_URL + url,
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
				'x-access-token': $rootScope.token,
				'email-id': $rootScope.user ? $rootScope.user.email : ''
            }
        });
    };
});