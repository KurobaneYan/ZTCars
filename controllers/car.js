let db = require('../db/car');
let helper = require('../helpers/car');
let validation = require('../helpers/validation');

exports.getAllCars = function(req, res) {
    let cars = db.getAll();
    showPromise(req, res, cars);
};

exports.createCar = function(req, res) {
    let carModel = helper.createCarFromReq(req);
    let car = db.save(carModel);
    showPromise(req, res, car);
};

exports.getCarById = function(req, res) {
    let carId = parseInt(req.params.carId, 10);
    let isValidCarId = validation.validateCarId(carId);
    if (isValidCarId) {
        let car = db.getById(carId);
        showPromise(req, res, car);
    } else {
        res.status(400).json({error: 'invalid carId'});
    }
};

exports.updateCarById = function(req, res) {
    let carId = parseInt(req.params.carId, 10);
    let isValidCarId = validation.validateCarId(carId);
    if (isValidCarId) {
        let carFields = helper.getCarFromReq(req);
        let car = db.updateCarById(carId, car);
        showPromise(req, res, car);
    } else {
        res.status(400).json({error: 'invalid carId'});
    }
};

exports.deleteCarById = function(req, res) {
    let carId = parseInt(req.params.carId, 10);
    let isValidCarId = validation.validateCarId(carId);
    if (isValidCarId) {
        let result = db.deleteCarById(req.params.carId);
        showPromise(req, res, result);
    } else {
        res.status(400).json({error: 'invalid carId'});
    }
};

exports.getMostPopular = function(req, res) {
    let amount = parseInt(req.params.amount, 10);
    let cars = db.getMostPopular(amount);
    showPromise(req, res, cars);
};

function showCar(req, res) {
    return car => res.json(car);
}

function handleError(req, res) {
    return error => res.status(400).json({error: error});
}

function showPromise(req, res, promise) {
    promise
        .then(showCar(req, res))
        .catch(handleError(req, res));
}

