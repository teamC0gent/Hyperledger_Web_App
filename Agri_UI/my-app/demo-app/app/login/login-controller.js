appname.controller("loginController", function($scope, $state, $rootScope, $window, httpService, toaster) {

    $scope.loginRequest = function() {
        // var userData = {
        //     "FARMER": {
        //         "traderId": "jhgddr84781",
        //         "firstName":"Monisha",
        //         "lastName":"K",
        //         "password":"12",
        //         "confirmPassword":"12",
        //         "email":"jhjh@hjhjh.com",
        //         "phoneNumber":12334444,
        //         "city":"udupi",
        //         "country":"India",
        //         "postalCode":"578102",
        //         "role": "FARMER",
        //         "dob":"12-12-1992",
        //         "gender":"female",
        //         "street":"dddd"
        //     },
        //     "DISTRIBUTOR": {
        //         "traderId": "jhgddr11981",
        //         "firstName":"Ashika",
        //         "lastName":"K",
        //         "password":"12",
        //         "confirmPassword":"12",
        //         "email":"jhjh@hjhjh.com",
        //         "phoneNumber":12334444,
        //         "city":"udupi",
        //         "country":"India",
        //         "postalCode":"578102",
        //         "role": "DISTRIBUTOR",
        //         "dob":"12-12-1992",
        //         "gender":"female",
        //         "street":"dddd"
        //     },
        //     "RETAILER": {
        //         "traderId": "jhgddr84351",
        //         "firstName":"Meghana",
        //         "lastName":"K",
        //         "password":"12",
        //         "confirmPassword":"12",
        //         "email":"jhjh@hjhjh.com",
        //         "phoneNumber":12334444,
        //         "city":"udupi",
        //         "country":"India",
        //         "postalCode":"578102",
        //         "role": "RETAILER",
        //         "dob":"12-12-1992",
        //         "gender":"female",
        //         "street":"dddd"
        //     }
        // }
        // $rootScope.userInfo = userData[$scope.userData.username];
        // $window.localStorage.setItem("userInfo", JSON.stringify($rootScope.userInfo));
        // $state.go("asset");
        // $scope.submitted;

        if ($scope.loginForm.$valid) {
            var role = 'Farmer';
            if ($scope.userData.role.toLowerCase() === 'distributor') {
                role = 'Distributor';
            } else if ($scope.userData.role.toLowerCase() === 'retailer') {
                role = 'Retailer';
            }
            var url = "queries/select" + role + "Details?email=" + $scope.userData.username;
            httpService.get(url)
            .success(function (response) {
                if (!response.length) {
                    toaster.pop('error', 'Error', 'Invalid Credentials....');
                } else if (response[0].password !== $scope.userData.password) {
                    toaster.pop('error', 'Error', 'Invalid Credentials....');
                } else {
                    $rootScope.userInfo = response[0];
                    $window.localStorage.setItem("userInfo", JSON.stringify($rootScope.userInfo));
                    $state.go("asset");
                }
            })
            .error(function(err) {
                toaster.pop('error', 'Error', error.err.message);
            });

        } else {
            toaster.pop('error', 'Error', 'Please Fill Required details');
        }
    };
    
});