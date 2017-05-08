module.exports = function($routeProvider, $locationProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('');
    
    $routeProvider
	.when('/', {
	    templateUrl : 'pages/home.html',
	    controller  : 'mainController'
	})
	.when('/search', {
	    templateUrl : 'pages/search.html',
	    controller  : 'searchController'
	})
	.when('/search/:query', {
	    templateUrl : 'pages/search.html',
	    controller  : 'searchController'
	})
	.when('/admin', {
	    templateUrl : 'pages/admin.html',
	    controller  : 'adminController'
	})
	.when('/edit/:carId', {
	    templateUrl : 'pages/edit.html',
	    controller  : 'editController'
	})
	.when('/create', {
	    templateUrl : 'pages/create.html',
	    controller  : 'mainController'
	})
	.when('/car/:carId', {
	    templateUrl : 'pages/car.html',
	    controller  : 'carController'
	})
};
