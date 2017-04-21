let mongoose = require('mongoose');

let counterSchema = mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

let Counter = mongoose.model('counter', counterSchema);

module.exports = Counter;
