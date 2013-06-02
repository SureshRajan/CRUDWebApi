
//var productcontroller = function ($scope, $http) {
//    var getproducts = function () {
//        $http({ method: 'GET', url: '/api/product' }).success(function (data) {
//            $scope.products = data;
//        }).error(function (data) {
//            $scope.error = data.message;
//        });
//    }
//    getproducts();
//}

var productAppModule = angular.module('productApp', []).
  config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/viewProducts', { templateUrl: 'partials/ProductList.html' });
      $routeProvider.when('/viewEditProduct/:ProductId', { templateUrl: 'partials/UpdateProduct.html' });
      $routeProvider.when('/viewAddProduct', { templateUrl: 'partials/AddNewProduct.html' });
      $routeProvider.when('/viewDeleteProduct/:ProductId', { templateUrl: 'partials/DeleteProduct.html' });
      $routeProvider.otherwise({ redirectTo: '/viewProducts' });
  }]);

var getProductsController = function ($scope, $http) {
    var getproducts = function () {
        $http({ method: 'GET', url: '/api/product' }).success(function (data) {
            $scope.products = data;
        }).error(function (data) {
            $scope.error = data.message;
        });
    };
    getproducts();
};

var getProductController = function ($scope, $http, $routeParams, $location) {
    $http({ method: 'GET', url: '/api/product/' + $routeParams.ProductId }).success(function (data) {
            $scope.product = data;            
        }).error(function (data) {
            $scope.error = data.message;
        });

    $scope.Save = function () {        
        $http.put('/api/product/' + $routeParams.ProductId, $scope.product)
        .success(function (response) {
            $scope.products = response;
            $location.path('/viewProducts');
        })
        .error(function (response) {
            $scope.products = response || "Request Failed";
        });
    }

    $scope.AddNew = function () {
        $http({ method: 'POST', url: 'api/product', data: $scope.product }).success(function (response) {
            $scope.product = response;
            $location.path('/viewProducts');
        })
        .error(function (response) {
            $scope.product = response || "Request failed";
        });
    }

    $scope.Delete = function () {
        $http({ method: 'DELETE', url: 'api/product/' + $routeParams.ProductId }).success(function (response) {
            $scope.product = response;
            $location.path('/viewProducts');
        })
        .error(function (response) {
            $scope.product = response || "Request failed";
        })        
    }
};