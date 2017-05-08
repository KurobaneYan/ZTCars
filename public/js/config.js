module.exports = function($routeProvider, $locationProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('');
    
    $routeProvider
	.when('/', {
	    templateUrl : 'partials/home.html',
	    controller  : 'mainController'
	})
	.when('/search', {
	    templateUrl : 'partials/search.html',
	    controller  : 'searchController'
	})
	.when('/search/:query', {
	    templateUrl : 'partials/search.html',
	    controller  : 'searchController'
	})
	.when('/car/:carId', {
	    templateUrl : 'partials/car.html',
	    controller  : 'carController'
	})
        .otherwise({
            templateUrl:'partials/404.html'
        });
};
