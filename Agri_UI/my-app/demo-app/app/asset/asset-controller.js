appname.controller("assetController", function($scope, $rootScope, toaster, httpService, $uibModal) {
  $scope.getAllAssets = function () {
    var assetURL = "queries/selectFarmerAssets";
    if ($rootScope.userInfo.role == 'DISTRIBUTOR')
      assetURL = "queries/selectdistributorAssets";
    else if ($rootScope.userInfo.role == 'RETAILER')
      assetURL = 'queries/selectRetailerAssets';
    httpService.get(assetURL + "?traderId="+ $rootScope.userInfo.traderId)
    .success(function(response) {
      $scope.assets = response;
    })
    .error(function(err) {
      toaster.pop('error', 'Error', err.error.message);
    });
  }

  $scope.addAsset = function () {
    assetModal();
  }

  $scope.updateAsset = function (assetIndex) {
    assetModal($scope.assets[assetIndex]);
  }

  $scope.deleteId = null;
  $scope.deleteAsset = function (pid) {
    $scope.deleteId = pid;
    var payload = {
      "$class": "org.supplychain.network.deleteProduct",
      "pid": pid,
      "role": $rootScope.userInfo.role,
      "farmer": "uiui8989",
      "distributor": "uiui8989",
      "retailer": "uiui8989"
    }
    payload[$rootScope.userInfo.role.toLowerCase()] = $rootScope.userInfo.traderId;
    httpService.post('deleteProduct', payload)
    .success(function (response) {
      $scope.processing = null;
      toaster.pop('info', 'Success', 'Deleted Successfully');
      $scope.getAllAssets();
    })
    .error(function (err) {
      $scope.progressing = null;
      toaster.pop('error', 'Error', err.error.message);
    });
  }

  var assetModal = function (data) {
    var action;
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'app/asset/add-asset.html',
      controller: 'addAssetController',
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
      toaster.pop('info', 'Success', action + ' product successfully');
      $scope.getAllAssets();
    }, function() {
      $scope.getAllAssets();
    });
  }
});