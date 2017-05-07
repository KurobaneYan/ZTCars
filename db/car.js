let mongoose = require('mongoose');

let Car = mongoose.model('Car');

exports.getAll = () => Car.find();

exports.save = car => car.save();

exports.getById = carId => Car.findOne({carId: carId});

exports.updateCarById = (carId, car) => {
    return Car.findOneAndUpdate({carId: carId}, car, {new: true});
};

exports.deleteCarById = carId => Car.remove({carId: carId});

exports.getMostPopular = (amount) => {
    return Car.find().sort({views: -1}).limit(amount);
};

exports.getManufacturers = () => Car.find().distinct('manufacturer');

exports.getModels = manufacturer => {
    return Car.find({manufacturer: manufacturer}).distinct('model');
};

exports.search = (q, filters) => 
{
    let cars;
    if (typeof(q) != 'undefined') {
        let parsed = parseInt(q, 10);
        let number = parsed ? parsed : 0;
        let request = {
            $or: [
                {manufacturer: q},
                {model: q},
                {price: number},
                {year: number},
                {kilometrage: number},
                {fuelType: q}
            ]};
        cars = Car.find(request);
    } else {
        cars = Car.find({});
    }
    if ('manufacturer' in filters) {
        cars.where('manufacturer').equals(filters.manufacturer);
    }
    if ('model' in filters) {
        cars.where('model').equals(filters.model);
    }
    if ('priceMin' in filters) {
        cars.where('price').gte(filters.priceMin);
    }
    if ('priceMax' in filters) {
        cars.where('price').lte(filters.priceMax);
    }
    if ('yearMin' in filters) {
        cars.where('year').gte(filters.yearMin);
    }
    if ('yearMax' in filters) {
        cars.where('year').lte(filters.yearMax);
    }
    if ('kilometrageMin' in filters) {
        cars.where('kilometrage').gte(filters.kilometrageMin);
    }
    if ('kilometrageMax' in filters) {
        cars.where('kilometrage').lte(filters.kilometrageMax);
    }
    if ('fuelType' in filters) {
        cars.where('fuelType').equals(filters.fuelType);
    }
    
    return cars.sort({views: -1});
}

exports.addPagination = (result, page, limit) => 
    result.skip(limit * (page - 1)).limit(limit);
