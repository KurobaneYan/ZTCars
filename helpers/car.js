let mongoose = require('mongoose');
let Car = mongoose.model('Car');

function copyCarFields(obj, car) {
    car.views = obj.views;
    car.year = obj.year;
    car.price = obj.price;
    car.kilometrage = obj.kilometrage;
    car.manufacturer = obj.manufacturer;
    car.model = obj.model;
    car.description = obj.description;
    car.fuelType = obj.fuelType;
    car.automaticTranmsission = obj.automaticTransmission;
    car.photos = obj.photos;
}

exports.copyCarFields = copyCarFields;

exports.getCarFromReq = (req) => {
    let car = {};
    copyCarFields(req.body, car);
    return car;
}

exports.createCarFromReq = (req) => {
    let car = new Car();
    copyCarFields(req.body, car);
    return car;
}
