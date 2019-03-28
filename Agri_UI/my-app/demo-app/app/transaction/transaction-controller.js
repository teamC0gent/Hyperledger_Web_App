appname.controller("transactionController", function($scope, $rootScope, toaster, httpService) {
  $scope.getAllTransactions = function () {
    httpService.get("queries/showProductAllHistorians")
    .success(function(response) {
      $scope.transactions = response.filter(function (transaction) {
        var transactionTypes = [
          "org.supplychain.network.acceptOrderByFarmer",
          "org.hyperledger.composer.system.AddAsset",
          "org.hyperledger.composer.system.UpdateAsset",
          "org.supplychain.network.acceptOrderByDistributor",
          "org.supplychain.network.orderByRetailer",
          "org.supplychain.network.orderByDistributor",
          "org.hyperledger.composer.system.RemoveAsset"
        ]
        return transactionTypes.indexOf(transaction.transactionType) != -1;
      });
    })
    .error(function(err) {
      toaster.pop('error', 'Error', err.error.message);
    });
  }
});