appname.controller("requestController", function($scope, $rootScope, NgTableParams, $uibModal, httpService, toaster) {
    $scope.getRequests = function () {
      var requestURL = 'queries/selectDistributorOrderRequests';
      if ($rootScope.userInfo.role == 'RETAILER') {
        requestURL = 'queries/selectRetailerOrderRequests'
      }
      httpService.get(requestURL + "?phoneNumber=" + $rootScope.userInfo.phoneNumber)
      .success(function(response) {
        $scope.requests = response;
      })
      .error(function(err) {
        toaster.pop('error', 'Error', err.error.message);
      });
    }
});


