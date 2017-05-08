module.exports = function($scope, $location, service) {
    $scope.cars = [];
    service.getMostPopularCars().then(function(resp) {
        var cars = resp.data;
        while(cars.length) {
            $scope.cars.push(cars.splice(0, 5));
        }
    });
    $scope.go = function(path) {
        if ($scope.searchQuery) {
            $location.path(path + '/' + $scope.searchQuery);
        } else {
            $location.path(path);
        }
    };
    $scope.$on('setSearchQuery', function(event, newSearchQuery) {
        $scope.searchQuery = newSearchQuery;
    });
};
