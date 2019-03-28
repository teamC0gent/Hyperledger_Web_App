var appname = angular.module("appname", [
  "ui.router",
  "ui.bootstrap",
  "ngTable",
  "toaster"
]).run(function($rootScope, $window, $state) {
    $rootScope.isLoader = false;
    $rootScope.userInfo = JSON.parse($window.localStorage.getItem("userInfo"));
    $rootScope.$on('$stateChangeStart', function (event, toState) {
      if (toState.name == 'register' || toState.name == 'login') {
        return
      }
      if (!$rootScope.userInfo) {
        event.preventDefault();
        $state.go('login');
      }
  })
})

appname.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/login");

    $stateProvider
    .state('login', {
        url: '/login',
        views: {
          'content@': {
            templateUrl: 'app/login/login.html',
            controller: 'loginController'
          }
        }
    })
    .state('register', {
      url: '/register',
      views: {
        'content@': {
          templateUrl: 'app/register/register.html',
          controller: 'registerController'
        }
      }
    })
    .state('dashboard', { 
      url: '/dashboard',
      abstract: true,                   
      views: {
        'content@': {
             templateUrl: 'app/dashboard/dashboard.html',
             controller: 'dashboardController'
          }
      }
    })
    .state('order', {
      url:'/order',
      parent: 'dashboard',
      views: {
        'dashboardItems@dashboard': {
            templateUrl: 'app/order/order.html',
            controller: 'orderController'
         }
      }
    })
    .state('asset', {
      url:'/asset',
      parent: 'dashboard',
      views: {
        'dashboardItems@dashboard': {
            templateUrl: 'app/asset/asset.html',
            controller: 'assetController'
         }
      }
    })
    .state('product', {
      url: '/product',
      parent: 'dashboard',
      views: {
        'dashboardItems@dashboard': {
            templateUrl: 'app/product/product.html',
            controller: 'productController'
         }
      }
    })
    .state('request', {
      url: '/request',
      parent: 'dashboard',
      views: {
        'dashboardItems@dashboard': {
            templateUrl: 'app/request/request.html',
            controller: 'requestController'
         }
      }
    })
    .state('need', {
      url: '/need',
      parent: 'dashboard',
      views: {
        'dashboardItems@dashboard': {
            templateUrl: 'app/need/need.html',
            controller: 'needController'
         }
      }
    })
    .state('demand', {
      url: '/demand',
      parent: 'dashboard',
      views: {
        'dashboardItems@dashboard': {
            templateUrl: 'app/demand/demand.html',
            controller: 'demandController'
         }
      }
    })
    .state('transaction', {
      url: '/transaction',
      parent: 'dashboard',
      views: {
        'dashboardItems@dashboard': {
            templateUrl: 'app/transaction/transaction.html',
            controller: 'transactionController'
         }
      }
    })

});