appname.controller("demandController", function($scope, $rootScope, NgTableParams, $uibModal, httpService) {
  $scope.getAllDemands = function () {
    var demandURL = "queries/selectDemandOfDistributorAndRetailer";
    if ($rootScope.userInfo.role == "DISTRIBUTOR") {
      demandURL = "queries/selectDemandOfRetailers";
    }
    httpService.get(demandURL)
    .success(function(response) {
      $scope.demands = response;
    })
    .error(function(err) {
      toaster.pop('error', 'Error', err.error.message);
    });
  }
});