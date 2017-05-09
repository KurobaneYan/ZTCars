module.exports = function($http) {
    var baseUrl = 'http://localhost:1337/api';
    var options = {headers: {'Content-Type': 'application/json'}};
    this.getAllCars = function() {
        return $http.get(baseUrl + '/cars');
    };

    this.createCar = function(car) {
        return $http.post(baseUrl + '/cars', car, options);
    }; 


    this.getManufacturers = function() {
        return $http.get(baseUrl + '/manufacturers');
    };

    this.getModels = function(manufacturer) {
        return $http.get(baseUrl + '/models/' + manufacturer);
    };

    this.search = function(string, dataObj) {
        if (typeof(string) == 'undefined') {
            return $http.post(baseUrl + '/search', dataObj, options);
        } else {
            return $http.post(baseUrl + '/search/' + string, dataObj, options);
        }
    };
};
