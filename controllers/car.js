let mongoose = require('mongoose');

let Car = mongoose.model('Car');

exports.getAllCars = function(req, res) {
    Car.find({}).exec(function(error, cars) {
        if (error) {
            res.json({error: error});
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

    car.save(function(error) {
        if (error) {
            res.json({error: error});
        }

        res.json(car);
    });
};

exports.getCarById = function(req, res) {
    let car = Car.findOne({carId: req.params.carId}, function(error, car) {
        if (error) {
            res.json({error: error});
        }

        res.json(car);
    });
};
