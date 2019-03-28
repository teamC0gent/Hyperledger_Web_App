appname.controller("orderController", function($scope, $rootScope, NgTableParams, $uibModal, httpService, toaster) {
  $scope.getAllOrders = function () {
    var orderURL = 'queries/selectOrdersOfDistributorAndRetailer';
    if ($rootScope.userInfo.role == 'DISTRIBUTOR') {
      orderURL = 'queries/selectOrdersOfRetailer'
    }
    httpService.get(orderURL + "?traderId="+ $rootScope.userInfo.traderId)
    .success(function(response) {
      $scope.orders = response;
    })
    .error(function(err) {
      toaster.pop('error', 'Error', err.error.message);
    });
  }

  $scope.inProgress = false;
  $scope.processingId = null;

  $scope.acceptOrder = function (index) {
    var product = $scope.orders[index];
    $scope.processingId = index;
    $scope.inProgress = true;
    var payload = {
      "$class": "org.supplychain.network." + ($rootScope.userInfo.role == "FARMER" ? "acceptOrderByFarmer" : "acceptOrderByDistributor"),
      "pid": product.pid,
      "name": product.name,
      "quantity": product.quantity,
      "price": product.price,
      "traderId": product.lastName.split('$')[1],
      "firstName": product.firstName,
      "lastName": product.lastName.split('$')[0],
      "phoneNumber": product.phoneNumber
    }
    if (product.status == "RETAILER_REQUEST_PENDING") {
      payload.status = "RETAILER_REQUEST_APPROVED";
      payload.role = "RETAILER";
      payload.distributor = "yuy8787";
      payload.retailer = product.lastName.split('$')[1];
    } else {
      payload.status = "DISTRIBUTOR_REQUEST_APPROVED";
      payload.role = "DISTRIBUTOR";
      payload.retailer = "yuy8787";
      payload.distributor = product.lastName.split('$')[1];
    }
    var url;
    if($rootScope.userInfo.role == "FARMER") {
      url = "acceptOrderByFarmer";
    } else {
      url = "acceptOrderByDistributor";
      delete payload.distributor;
    }
    httpService.post(url, payload)
    .success(function (response) {
      $scope.inProgress = false;
      $scope.processingId = null;
      toaster.pop('info', 'Success', 'Order Accepted...');
      $scope.getAllOrders();
    })
    .error(function (err) {
      $scope.inProgress = false;
      $scope.processingId = null;
      toaster.pop('error', 'Error', err.error.message);
    });
  }

  $scope.rejectOrder = function (index) {
    var product = $scope.orders[index];
    $scope.processingId = index;
    $scope.inProgress = true;
    var url = $rootScope.userInfo.role == "FARMER" ? "rejectOrderByFarmer" : "rejectOrderByDistributor";
    var payload = {
      "$class": "org.supplychain.network." + ($rootScope.userInfo.role == "FARMER" ? "rejectOrderByFarmer" : "rejectOrderByDistributor"),
      "pid": product.pid,
      "name": product.name,
      "quantity": product.quantity,
      "price": product.price,
      "firstName": $rootScope.userInfo.firstName,
      "lastName": $rootScope.userInfo.lastName,
      "phoneNumber": product.phoneNumber,
      "role": $rootScope.userInfo.role
    }
    if ($rootScope.userInfo.role == "FARMER") {
      payload.farmer = "resource:org.supplychain.network.Farmer#" + $rootScope.userInfo.traderId;
    } else {
      payload.distributor = "resource:org.supplychain.network.Distributor#" + $rootScope.userInfo.traderId;
    }
    if (product.status == 'RETAILER_REQUEST_PENDING') {
      payload.status = 'RETAILER_REQUEST_REJECTED';
    } else {
      payload.status = 'DISTRIBUTOR_REQUEST_REJECTED';
    }
    httpService.post(url, payload)
    .success(function (response) {
      $scope.inProgress = false;
      $scope.processingId = null;
      toaster.pop('info', 'Success', 'Order Rejected...');
      $scope.getAllOrders();
    })
    .error(function (err) {
      $scope.inProgress = false;
      $scope.processingId = null;
      toaster.pop('error', 'Error', err.error.message);
    });
  }
});