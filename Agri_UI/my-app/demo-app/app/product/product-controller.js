appname.controller("productController", function($scope, $rootScope, NgTableParams, $uibModal, httpService, toaster) {
  $scope.getAllProducts = function () {
    var productURL = 'queries/selectProductsForSaleByFarmer';
    if ($rootScope.userInfo.role == 'RETAILER') {
      productURL = 'queries/selectProductsForSaleByDistributorAndFarmer'
    }
    httpService.get(productURL)
    .success(function(response) {
      $scope.products = response;
    })
    .error(function(err) {
      toaster.pop('error', 'Error', err.error.message);
    });
  }
  $scope.processing = false;
  $scope.processingId = null;
  $scope.placeOrder = function (index) {
    var orderURL = 'orderByDistributor';
    if ($rootScope.userInfo.role == 'RETAILER') {
      orderURL = 'orderByRetailer'
    }
    var product = $scope.products[index];
    $scope.processing = true;
    $scope.processingId = product.pid;
    var orderPayload = {
      "$class": "org.supplychain.network." + ($rootScope.userInfo.role == 'RETAILER' ? "orderByRetailer" : "orderByDistributor"),
      "pid": product.pid,
      "name": product.name,
      "quantity": product.quantity,
      "price": product.price,
      "role": product.role,
      "status": $rootScope.userInfo.role == 'RETAILER' ? "RETAILER_REQUEST_PENDING" : "DISTRIBUTOR_REQUEST_PENDING",
      "traderId": product.traderId, // traderId should be farmers id
      "firstName": $rootScope.userInfo.firstName,// Name of the person ordered a Product (Distributor Name)
      "lastName": $rootScope.userInfo.lastName+"$"+$rootScope.userInfo.traderId,
      "phoneNumber": $rootScope.userInfo.phoneNumber
    }
    if ($rootScope.userInfo.role == 'RETAILER') {
      orderPayload.retailer = "resource:org.supplychain.network.Retailer#" + $rootScope.userInfo.traderId;
    } else {
      orderPayload.distributor = "resource:org.supplychain.network.Distributor#" + $rootScope.userInfo.traderId;
    }
    httpService.post(orderURL, orderPayload)
    .success(function (response) {
      $scope.processing = false;
      toaster.pop('info', 'Success', 'Ordered Successfully..');
      $scope.getAllProducts();
    })
    .error(function (err) {
      $scope.processing = false;
      toaster.pop('error', 'Error', err.error.message);
    });
  }
});