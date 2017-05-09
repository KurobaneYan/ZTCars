module.exports = function($scope, $routeParams, service) {
    var minYear = 1996;
    var currentYear = new Date().getFullYear();

    $scope.car = {};
    $scope.car.photos = [];
    $scope.carsTree = [ 
        {manufacturer:'Mitsubishi', models:['Lancer', 'Lancer Sportback', 'Outlander', 'Triton', 'Pajero', 'Attrage']},
        {manufacturer:'Volvo', models:['S60', 'S70', 'S80', 'S90', 'XC60', 'XC70', 'XC90']},
            {manufacturer:'BMW', models:['X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7']},
            {manufacturer:'Nissan', models:['Note', 'Juke', 'Navara', 'Primera', 'Titan']}
    ];

    $scope.years = [];
    while(currentYear >= minYear) {
        $scope.years.push(currentYear);
        currentYear -= 1;
    }
    $scope.year = $scope.years[0];

    $scope.transmissions = ['true', 'false'];
    $scope.fuelTypes = ['Disel', 'Gasoline'];

    var carId = parseInt($routeParams.carId, 10);

    if (isNaN(carId)) {
        $scope.error = 'CarId is not a number, carId value: ' + $routeParams.carId;
    } else {
        service.getCar($routeParams.carId)
            .then(function(resp) {
                $scope.car = resp.data;
                $scope.carsTree.forEach(function(car) {
                    if (car.manufacturer === $scope.car.manufacturer) {
                        $scope.manufacturer = car;
                    }
                });
                $scope.manufacturer.models.forEach(function(model) {
                    if (model === $scope.car.model) {
                        $scope.model = model;
                    }
                });

                $scope.car.automaticTransmission = $scope.car.automaticTransmission.toString();
            }, function(error) {
                alert($scope.error);
            
            })

        $scope.onManufacturerChange = function() {
            $scope.model = $scope.manufacturer.models[0];
        };
    }

    $scope.create = function() {
        if ($scope.createForm.$valid) {
            $scope.car.manufacturer = $scope.manufacturer.manufacturer;
            $scope.car.model = $scope.model;

            if ($scope.car.photos.length > 0) {
                service.updateCar($scope.car.carId, JSON.stringify($scope.car))
                    .then(function(resp) {
                        alert('Car updated');
                    });
            } else {
                alert('please, add at least one photo');
            }
        }
    };

    $scope.imageUpload = function(event){
         var files = event.target.files; 
         
         for (var i = 0; i < files.length; i++) {
             var file = files[i];
                 var reader = new FileReader();
                 reader.onload = $scope.imageIsLoaded; 
                 reader.readAsDataURL(file);
         }
    };

    $scope.imageIsLoaded = function(e){
        $scope.$apply(function() {
            $scope.car.photos.push(e.target.result);
        });
    };

    $scope.popPhoto = function() {
        $scope.car.photos.pop();
    };

    $scope.clearPhotos = function() {
        $scope.car.photos = [];
    };
};
