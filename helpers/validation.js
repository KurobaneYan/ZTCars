exports.isPositiveInt = n => n > 0 ? true : false;

exports.validateCarId = carId => {
    let isInt = Number.isInteger(carId);
    let isPositive = carId => carId > 0 ? true: false;
    return isInt && isPositive(carId) ? true : false;
};

