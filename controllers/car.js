let mongoose = require('mongoose');

let Car = mongoose.model('Car');

exports.getAllCars = function(req, res) {
    Car.find({}).exec(function(err, cars) {
        if (err) {
            res.json({"error": err});
        }
        res.json(cars);
    });
};

exports.createCar = function(req, res) {
    let car = new Car();
    car.carId = req.body.carId;
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

    car.save(function(err) {
        if (err) {
            res.json({"error": err});
        }

        res.json(car);
    });
};

exports.getCarById = function(req, res) {
    Car.find({carId: 1})
};
