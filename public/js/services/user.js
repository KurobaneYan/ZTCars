module.exports = function($http) {
    var baseUrl = 'http://localhost:1337/api'
    this.getAllCars = function() {
        return $http.get(baseUrl + '/cars');
    };

    this.getMostPopularCars = function() {
        return $http.get(baseUrl + '/cars/mostPopular/25');
    };

    this.getCarById = function(carId) {
        return $http.get(baseUrl + '/cars/' + carId);
    };

    this.getManufacturers = function() {
        return $http.get(baseUrl + '/manufacturers');
    };

    this.getModels = function(manufacturer) {
        return $http.get(baseUrl + '/models/' + manufacturer);
    };

    this.search = function(string, dataObj) {
        var options = {headers: {'Content-Type': 'application/json'}};
        if (typeof(string) == 'undefined') {
            return $http.post(baseUrl + '/search', dataObj, options);
        } else {
            return $http.post(baseUrl + '/search/' + string, dataObj, options);
        }
    };
};
