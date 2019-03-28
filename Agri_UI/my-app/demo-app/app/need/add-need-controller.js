appname.controller("addNeedController", 
  function($scope, $rootScope, toaster, httpService, $uibModalInstance, modalData) {
    $scope.processing = false;
    $scope.isUpdateMode = false;
    if (modalData.pid) {
      $scope.isUpdateMode = true;
      $scope.product = modalData;
      delete $scope.product.firstName;
      delete $scope.product.lastName;
      delete $scope.product.phoneNumber;
      delete $scope.product.role;
      delete $scope.product.status;
      delete $scope.product.traderId;
      $scope.product["$class"] = "org.supplychain.network." + ($rootScope.userInfo.role == 'RETAILER' ? "updateNeedRetailer" : "updateNeedDistributor")
    } else {
      $scope.product = {}
    }
    $scope.submitNeed = function () {
      $scope.processing = true;
      if ($scope.isUpdateMode) {
        var updateURL = $rootScope.userInfo.role == 'RETAILER' ? 'updateNeedRetailer' : 'updateNeedDistributor';
        if ($rootScope.userInfo.role == 'RETAILER') {
          $scope.product.retailer = "resource:org.supplychain.network.Retailer#" + $rootScope.userInfo.traderId;
        } else {
            $scope.product.distributor = "resource:org.supplychain.network.Distributor#" + $rootScope.userInfo.traderId;
        }
        httpService.post(updateURL, $scope.product)
        .success(function (response) {
          $scope.processing = false;
          $uibModalInstance.close("ok")
        })
        .error(function (err) {
          $scope.processing = false;
          toaster.pop('error', 'Error', err.error.message);
        });
      } else {
        $scope.product["$class"] = "org.supplychain.network." + ($rootScope.userInfo.role == 'RETAILER' ? "needOfRetailer" : "needOfDistributor")
        $scope.product.price = 0;
        $scope.product.role = $rootScope.userInfo.role;
        $scope.product.traderId = $rootScope.userInfo.traderId;
        $scope.product.firstName = $rootScope.userInfo.firstName;
        $scope.product.lastName = $rootScope.userInfo.lastName;
        $scope.product.phoneNumber = $rootScope.userInfo.phoneNumber;
        $scope.product.status = $rootScope.userInfo.role == 'RETAILER' ? "RETAILER_NEED" : "DISTRIBUTOR_NEED" ;
        if ($rootScope.userInfo.role == 'RETAILER') {
            $scope.product.retailer = "resource:org.supplychain.network.Retailer#" + $rootScope.userInfo.traderId;
        } else {
            $scope.product.distributor = "resource:org.supplychain.network.Distributor#" + $rootScope.userInfo.traderId;
        }
        //$scope.product.pid = "jhgddr" + Math.floor(Math.random() * 10000) + 1;
        var addURL = $rootScope.userInfo.role == 'RETAILER' ? 'needOfRetailer' : 'needOfDistributor';
        httpService.post(addURL, $scope.product)
        .success(function (response) {
          $scope.processing = false;
          $uibModalInstance.close("ok")
        })
        .error(function (err) {
          $scope.processing = false;
          toaster.pop('error', 'Error', err.error.message);
        });
      }
    }
});