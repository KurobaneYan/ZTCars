let db = require('../db/car');
let helper = require('../helpers/car');

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
    let car = db.getById(req.params.carId);
    showPromise(req, res, car);
};

exports.updateCarById = function(req, res) {
    let carId = req.params.carId;
    let carFields = helper.getCarFromReq(req);
    let car = db.updateCarById(carId, car);
    showPromise(req, res, car);
};

exports.deleteCarById = function(req, res) {
    let result = db.deleteCarById(req.params.carId);
    showPromise(req, res, result);
};

exports.getMostPopular = function(req, res) {
    let amount = Number(req.params.amount);
    let cars = db.getMostPopular(amount);
    showPromise(req, res, cars);
};

function showCar(req, res) {
    return car => res.json(car);
}

function handleError(req, res) {
    return error => res.status(500).json({error: error});
}

function showPromise(req, res, promise) {
    promise
        .then(showCar(req, res))
        .catch(handleError(req, res));
}

