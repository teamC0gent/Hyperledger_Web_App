appname.controller("addAssetController", 
  function($scope, $rootScope, toaster, httpService, $uibModalInstance, modalData) {
    $scope.processing = false;
    $scope.isUpdateMode = false;
    if (modalData.pid) {
      $scope.isUpdateMode = true;
      $scope.product = modalData;
    } else {
      $scope.product = {}
    }
    $scope.submitProduct = function () {
      $scope.processing = true;
      if ($scope.isUpdateMode) {
        httpService.put('Product/' + $scope.product.pid, $scope.product)
        .success(function (response) {
          $scope.processing = false;
          $uibModalInstance.close("ok")
        })
        .error(function (err) {
          $scope.processing = false;
          toaster.pop('error', 'Error', err.error.message);
        });
      } else {
        //$scope.product["$class"] = "org.supplychain.network.addProduct";
        $scope.product.role = $rootScope.userInfo.role;
        $scope.product.traderId = $rootScope.userInfo.traderId;
        $scope.product.firstName = $rootScope.userInfo.firstName;
        $scope.product.lastName = $rootScope.userInfo.lastName;
        $scope.product.phoneNumber = $rootScope.userInfo.phoneNumber;
        $scope.product.status = "NA";
        $scope.product.pid = Math.random().toString(36).replace('0.', '');
        //$scope.product.farmer = "resource:org.supplychain.network.Farmer#" + $rootScope.userInfo.traderId;
        httpService.post('Product', $scope.product)
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