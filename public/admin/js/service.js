module.exports = function($http) {
    var baseUrl = 'http://localhost:1337/api';
    var options = {headers: {'Content-Type': 'application/json'}};

    this.createCar = function(car) {
        return $http.post(baseUrl + '/cars', car, options);
    }; 

    this.getCar = function(carId) {
        return $http.get(baseUrl + '/cars/' + carId, options);
    };

    this.updateCar = function(carId, car) {
        return $http.put(baseUrl + '/cars/' + carId, car, options);
    };

    this.deleteCar = function(carId) {
        return $http.delete(baseUrl + '/cars/' + carId, options);
    };

    this.getManufacturers = function() {
        return $http.get(baseUrl + '/manufacturers', options);
    };

    this.getModels = function(manufacturer) {
        return $http.get(baseUrl + '/models/' + manufacturer, options);
    };

    this.search = function(string, dataObj) {
        if (typeof(string) == 'undefined') {
            return $http.post(baseUrl + '/search', dataObj, options);
        } else {
            return $http.post(baseUrl + '/search/' + string, dataObj, options);
        }
    };
};
