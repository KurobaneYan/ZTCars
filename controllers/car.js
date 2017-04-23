let mongoose = require('mongoose');

let Car = mongoose.model('Car');

exports.getAllCars = function(req, res) {
    Car.find({}).exec(returnCar(req, res)); 
};

exports.createCar = function(req, res) {
    let car = createCarFromRequest(req);
    Car.create(car, returnCar(req, res));
};

exports.getCarById = function(req, res) {
    Car.findOne({carId: req.params.carId})
        .exec(returnCar(req, res));
};

exports.updateCarById = function(req, res) {
    Car.findOne({carId: req.params.carId}, (error, car) => {
        returnError(error, res);

        fillCarFieldsFromRequest(car, req);
        car.carId = req.params.carId;
        car.save((err) => {
            returnError(err, res);
        });

        res.json(car);
    });
};

exports.deleteCarById = function(req, res) {
    Car.remove({carId: req.params.carId}, returnCar(req, res)); 
};

exports.getMostPopular = function(req, res) {
    let limit = Number(req.params.amount);
    Car.find({}).sort({views: -1}).limit(limit).exec(returnCar(req, res));
};

function createCarFromRequest(req) {
    let car = new Car();
    fillCarFieldsFromRequest(car, req);    
    return car;
}

function fillCarFieldsFromRequest(car, req) {
    car.views = req.body.views;
    car.year = req.body.year;
    car.price = req.body.price;
    car.kilometrage = req.body.kilometrage;
    car.manufacturer = req.body.manufacturer;
    car.model = req.body.model;
    car.description = req.body.description;
    car.fuelType = req.body.fuelType;
    car.automaticTranmsission = req.body.automaticTransmission;
    car.photos = req.body.photos;
}

function returnCar(req, res) {
    return (error, car) => {
        returnError(error, res);

        res.json(car);
    };
}

function returnError(error, res) {
    if (error) {
        res.json({error: error});
    }
}
