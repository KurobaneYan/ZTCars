module.exports = function($scope, $route, $location, $routeParams, service) {
    var defaultManufacturer = 'select manufacturer';
    var defaultModel = 'select model';
    var defaultYear = 'select year';
    var defaultFuelType = 'select fuel type';
    var defaultTransmission = 'select transmission';
    var newFilter = $location.search();
    var manufacturers = 
        [{manufacturer: defaultManufacturer, models: [defaultModel]}];
    var minYear = 1996;
    var currentYear = new Date().getFullYear();

    $scope.years = [defaultYear];
    while(currentYear >= minYear) {
        $scope.years.push(currentYear);
        currentYear -= 1;
    }
    $scope.yearsMin = $scope.years.slice();
    $scope.yearsMax = $scope.years.slice();

    $scope.noCars = false;
    $scope.transmissions = [defaultTransmission, 'true', 'false'];
    $scope.fuelTypes = [defaultFuelType, 'Disel', 'Gasoline'];
    $scope.filter = {};
    $scope.filter.manufacturer = newFilter.manufacturer;
    $scope.filter.model = newFilter.model;

    if (typeof(newFilter.priceMin) !== 'undefined') {
        $scope.filter.priceMin = parseInt(newFilter.priceMin, 10);
    }
    if (typeof(newFilter.priceMax) !== 'undefined') {
        $scope.filter.priceMax = parseInt(newFilter.priceMax, 10);
    }
    if (typeof(newFilter.yearMin) !== 'undefined') {
        $scope.yearMin = parseInt(newFilter.yearMin, 10);
        $scope.filter.yearMin = $scope.yearMin;
    } else {
        $scope.yearMin = defaultYear;
    }
    if (typeof(newFilter.yearMax) !== 'undefined') {
        $scope.yearMax = parseInt(newFilter.yearMax, 10);
        $scope.filter.yearMax = $scope.yearMax;
    } else {
        $scope.yearMax = defaultYear;
    }
    if (typeof(newFilter.kilometrageMin) !== 'undefined') {
        $scope.filter.kilometrageMin = parseInt(newFilter.kilometrageMin, 10);
    }
    if (typeof(newFilter.kilometrageMax) !== 'undefined') {
        $scope.filter.kilometrageMax = parseInt(newFilter.kilometrageMax, 10);
    }
    if (typeof(newFilter.fuelType) !== 'undefined') {
        $scope.filter.fuelType = newFilter.fuelType;
        $scope.fuelType = newFilter.fuelType;
    } else {
        $scope.fuelType = defaultFuelType;
    }
    if (typeof(newFilter.automaticTransmission) !== 'undefined') {
        $scope.filter.automaticTransmission = newFilter.automaticTransmission;
        $scope.transmission = newFilter.automaticTransmission;
    } else {
        $scope.transmission = defaultTransmission;
    }

    service.search($routeParams.query, JSON.stringify($scope.filter))
        .then(function(res) {
            $scope.cars = res.data;
            if ($scope.cars.length === 0) {
                $scope.noCars = true;
            }
        });
    

    service.getManufacturers().then(function(res) {
        $scope.carsTree = manufacturers.concat(res.data.map(function(manufacturer) {
            var newManufacturer = {manufacturer: manufacturer};
            service.getModels(manufacturer)
                .then(function(res) {
                    newManufacturer.models = [defaultModel].concat(res.data);
                });
            return newManufacturer;
        }));
            $scope.manufacturer = $scope.carsTree[0];
            $scope.model = $scope.manufacturer.models[0];
        if (typeof($scope.filter.manufacturer) !== 'undefined') {
            for (i in $scope.carsTree) {
                if ($scope.filter.manufacturer === $scope.carsTree[i].manufacturer) {
                    $scope.manufacturer = $scope.carsTree[i];
                }
            }
        }
        if (typeof($scope.filter.model) !== 'undefined') {
            $scope.model = $scope.filter.model;
        }
    });

    $scope.onManufacturerChange = function() {
        $scope.model = $scope.manufacturer.models[0];
    };

    $scope.onYearMinChange = function() {
        var index = $scope.years.indexOf($scope.yearMin);
        if (index !== 0) {
            $scope.yearsMax = $scope.years.slice(0, index + 1);
            if ($scope.yearMax < $scope.yearMin) {
                $scope.yearMax = $scope.yearMin;
            }
        } else {
            $scope.yearsMax = $scope.years.slice();
        }
    };

    $scope.onYearMaxChange = function() {
        var index = $scope.years.indexOf($scope.yearMax);
        if (index !== 0) {
            $scope.yearsMin = [defaultYear].concat($scope.years.slice(index, $scope.years.length));
            if ($scope.yearMax < $scope.yearMin) {
                $scope.yearMin = $scope.yearMax;
            }
        } else {
            $scope.yearsMin = $scope.years.slice();
        }
    };

    $scope.search = function() {
        if ($scope.searchForm.$valid) {
            if ($scope.manufacturer.manufacturer !== defaultManufacturer) {
                $scope.filter.manufacturer = $scope.manufacturer.manufacturer;
            } else {
                delete $scope.filter.manufacturer;
            }
            if ($scope.model !== defaultModel) {
                $scope.filter.model = $scope.model;
            } else {
                delete $scope.filter.model;
            }
            if ($scope.yearMin !== defaultYear) {
                $scope.filter.yearMin = $scope.yearMin;
            } else {
                delete $scope.filter.yearMin;
            }
            if ($scope.yearMax !== defaultYear) {
                $scope.filter.yearMax = $scope.yearMax;
            } else {
                delete $scope.filter.yearMax;
            }
            if ($scope.fuelType !== defaultFuelType) {
                $scope.filter.fuelType = $scope.fuelType;
            } else {
                delete $scope.filter.fuelType;
            }
            if ($scope.transmission !== defaultTransmission) {
                $scope.filter.automaticTransmission = $scope.transmission;
            } else {
                delete $scope.filter.automaticTransmission;
            }

            if (typeof($scope.searchQuery) !== 'undefined') {
                $location.path('/' + $scope.searchQuery);
            }
            $location.search($scope.filter);
        }
    };

    $scope.resetSearchForm = function() {
        $location.path('/');
        $location.search({});
        $route.reload();
    };

    $scope.deleteCar = function(carId) {
        if (confirm('Delete car with id ' + carId + '?')) {
            service.deleteCar(carId)
                .then(function(resp) {
                    alert('deleted');
                    $route.reload();
                });
        }
    };
};
