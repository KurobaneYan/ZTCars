module.exports = function($http) {
    this.getAllCars = function() {
        return $http({
            method: 'GET',
            url: 'http://localhost:1337/api/cars',
            dataType: 'json'
        });
    };
};
