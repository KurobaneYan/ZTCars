module.exports = function($scope, $routeParams, userService) {
    $scope.car = null;
    userService.getCarById($routeParams.carId).then(function(resp) {
        $scope.car = resp.data;
    }, function(error) {
        $scope.error = error;
        console.log(error);
    });
};
