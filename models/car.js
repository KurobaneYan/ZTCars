let mongoose = require('mongoose');
let Counter = require('./counter');

let carSchema = new mongoose.Schema({
    carId: Number,
    views: Number,
    year: Number,
    price: Number,
    kilometrage: Number,
    manufacturer: String,
    model: String,
    description: String,
    fuelType: String,
    automaticTransmission: Boolean,
    photos: [String]
});

carSchema.pre('save', function(next) {
    let doc = this;
    Counter.findByIdAndUpdate({_id: 'carId'}, {$inc: { seq: 1 }}, {upset:true}, function(error, counter)   {
        if(error) {
            return next(error);
        }
        console.log(counter);
        doc.carId = counter.seq;
        next();
    });    
});

let Car = mongoose.model('Car', carSchema);

module.exports = Car;
