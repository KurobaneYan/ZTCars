module.exports = function($http) {
    let baseUrl = 'http://localhost:1337/api'
    this.getAllCars = function() {
        return $http({
            method: 'GET',
            url: baseUrl + '/cars',
            dataType: 'json'
        });
    };

    this.getMostPopularCars = function() {
        return $http({
            method: 'GET',
            url: baseUrl + '/cars/mostPopular/25',
            dataType: 'json'
        });
    };
};
