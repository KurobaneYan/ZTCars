let app = angular.module('ZTCars', ['ngRoute']);
app.config(function($routeProvider, $locationProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('');
    
    $routeProvider
        // route for the home page
	.when('/', {
	    templateUrl : 'pages/home.html',
	    controller  : 'mainController'
	})

	// route for the about page
	.when('/about', {
	    templateUrl : 'pages/about.html',
	    controller  : 'aboutController'
	})
});

app.service('dataService', function($http) {
    delete $http.defaults.headers.common['X-Requested-With'];
    this.getData = function() {
        return $http({
            method: 'GET',
            url: 'http://localhost:1337/api/cars',
            dataType: 'json'
         });
     }
});

// create the controller and inject Angular's $scope
app.controller('mainController', function($scope, dataService) {
    $scope.cars = null;
    dataService.getData().then(function(dataResponse) {
        $scope.cars = dataResponse.data;
    });
    $scope.message = 'Everyone come and see how good I look!';
});

app.controller('aboutController', function($scope) {
    $scope.message = 'Look! I am an about page.';
});
