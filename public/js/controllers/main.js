module.exports = function($scope, userService) {
    $scope.cars = null;
    userService.getAllCars().then(function(resp) 
        {return $scope.cars = resp.data});
    $scope.message = 'New main page';
};
