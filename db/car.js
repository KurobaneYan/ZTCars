let mongoose = require('mongoose');

let Car = mongoose.model('Car');

exports.getAll = () => {
    return Car.find().exec();
};

exports.save = (car) => {
    return car.save();
};

exports.getById = (carId) => {
    return Car.findOne({carId: carId});
};

exports.updateCarById = (carId, car) => {
    return Car.findOneAndUpdate({carId: carId}, car, {new: true});
};

exports.deleteCarById = (carId) => {
    return Car.remove({carId: carId});
};

exports.getMostPopular = (amount) => {
    return Car.find().sort({views: -1}).limit(amount);
};
