module.exports = function($scope, service) {
    var minYear = 1996;
    var currentYear = new Date().getFullYear();

    $scope.car = {
        price: 10000,
        year: 2017,
        kilometrage: 100,
        views: 0,
        automaticTransmission: 'false',
        fuelType: 'Gasoline',
        description: 'New Car'
    };
    $scope.car.photos = [];
    $scope.photos = [];
    $scope.carsTree = [ 
        {manufacturer:'Mitsubishi', models:['Lancer', 'Lancer Sportback', 'Outlander', 'Triton', 'Pajero', 'Attrage']},
        {manufacturer:'Volvo', models:['S60', 'S70', 'S80', 'S90', 'XC60', 'XC70', 'XC90']},
            {manufacturer:'BMW', models:['X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7']},
            {manufacturer:'Nissan', models:['Note', 'Juke', 'Navara', 'Primera', 'Titan']}
    ];

    $scope.manufacturer = $scope.carsTree[0];
    $scope.model = $scope.manufacturer.models[0];

    $scope.years = [];
    while(currentYear >= minYear) {
        $scope.years.push(currentYear);
        currentYear -= 1;
    }
    $scope.year = $scope.years[0];

    $scope.transmissions = ['true', 'false'];
    $scope.fuelTypes = ['Disel', 'Gasoline'];

    $scope.onManufacturerChange = function() {
        $scope.model = $scope.manufacturer.models[0];
    };

    $scope.create = function() {
        if ($scope.createForm.$valid) {
            $scope.car.manufacturer = $scope.manufacturer.manufacturer;
            $scope.car.model = $scope.model;

            if ($scope.car.photos.length > 0) {
                console.log('car',$scope.car);
                service.createCar(JSON.stringify($scope.car))
                    .then(function(res) {
                        alert('Car created, carId ' + res.data.carId);
                    });
            } else {
                alert('please, add at least one photo');
            }
        }
    };
    $scope.car.photos = [];

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
