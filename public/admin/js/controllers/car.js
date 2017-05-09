module.exports = function($scope, $routeParams, service) {
    $scope.car = null;
    service.getCarById($routeParams.carId).then(function(resp) {
        $scope.car = resp.data;
    }, function(error) {
        $scope.error = error;
    });
};
