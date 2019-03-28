appname.controller("registerController", function($scope, toaster, httpService, $state) {
  $scope.processing = false;
  $scope.checkPwd = function () {
    if ($scope.userData.password !== $scope.userData.confirmPassword) {
      document.getElementById('message').style.color = 'red';
      document.getElementById('message').innerHTML = 'not matching';
    } else {
      document.getElementById('message').innerHTML = '';
    }
  }

  $scope.submitUserForm = function () {
    $scope.processing = true;
    if ($scope.registrationForm.$valid) {
      var role = $scope.userData.role.charAt(0) + $scope.userData.role.substr(1).toLowerCase();
      delete $scope.userData.confirmPassword
      $scope.userData.traderId = Math.random().toString(36).replace('0.', '');
      $scope.userData["$class"] = "org.supplychain.network." + role;
      httpService.post(role, $scope.userData)
      .success(response => {
        console.log(response)
        toaster.pop('info', 'Success', 'Registered Successfully');
        $scope.processing = false;
      })
      .error(function(error) {
        console.log(error)
        toaster.pop('error', 'Error', error.error.message);
      });
            
    } else {
      toaster.pop('error', 'Error', 'Please Fill Required Fields');
      $scope.processing = false;

    }
  }
});