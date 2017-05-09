module.exports = function($scope, $routeParams, service) {
    $scope.car = null;
    var carId = parseInt($routeParams.carId, 10);
    if (isNaN(carId)) {
        $scope.error = 'CarId is not a number, carId value: ' + $routeParams.carId;
    } else {
        service.getCarById($routeParams.carId).then(function(resp) {
            $scope.car = resp.data;
        }, function(error) {
            $scope.error = error;
        });
    }
};
