module.exports = function($routeProvider, $locationProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('');
    
    $routeProvider
	.when('/', {
	    templateUrl : 'partials/home.html',
	    controller  : 'adminController'
	})
        .when('/create', {
            templateUrl : 'partials/create.html',
            controller  : 'createController'
        })
	.when('/edit/:carId', {
	    templateUrl : 'partials/edit.html',
	    controller  : 'editController'
	})
	.when('/:query', {
	    templateUrl : 'partials/home.html',
	    controller  : 'adminController'
	})
        .otherwise({
            templateUrl:'partials/404.html'
        });
};
