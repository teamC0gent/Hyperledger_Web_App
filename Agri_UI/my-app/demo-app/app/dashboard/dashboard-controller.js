appname.controller("dashboardController", function($scope, $state, $rootScope, $window) {
    $scope.logout = function () {
		$window.localStorage.clear();
		$rootScope.userInfo = undefined;
		$state.go('login')
	}
});