appname.controller("needController", function($scope, $rootScope, toaster, httpService, $uibModal) {
  $scope.getAllNeeds = function () {
    var needURL = "queries/selectNeedofDistributor";
    if ($rootScope.userInfo.role == 'RETAILER')
      needURL = "queries/selectNeedofRetailer";
    httpService.get(needURL + "?traderId="+ $rootScope.userInfo.traderId)
    .success(function(response) {
      $scope.needs = response;
    })
    .error(function(err) {
      toaster.pop('error', 'Error', err.error.message);
    });
  }

  $scope.addNeed = function () {
    modal();
  }

  $scope.updateNeed = function (index) {
    modal($scope.needs[index]);
  }

  var modal = function (data) {
    var action;
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'app/need/add-need.html',
      controller: 'addNeedController',
      size: 'md',
      backdrop: true,
      keyboard: true,
      resolve: {
        modalData: function() {
          if (data) {
            action = 'Updated';
            return data;
          } else {
            action = 'Added';
            return {};
          }
        }
      }
    });
    modalInstance.result.then(function (response) {
      toaster.pop('info', 'Success', action + ' need successfully');
      $scope.getAllNeeds();
    }, function() {
      $scope.getAllNeeds();
    });
  }
});