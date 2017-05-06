let mongoose = require('mongoose');
let config = require('./config');
let Counter = require('./models/counter');
let Car = require('./models/car');
let fs = require('fs');

let imgs = JSON.parse(fs.readFileSync('img.json', 'utf-8'));

mongoose.Promise = global.Promise;
mongoose.connect(config.databaseUrl);
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Mongoose connected to ' + config.databaseUrl);
});

let carsData = { 
    'Mitsubishi': ['Lancer', 'Lancer Sportback', 'Outlander', 'Triton', 'Pajero', 'Attrage'],
    'Volvo': ['S60', 'S70', 'S80', 'S90', 'XC60', 'XC70', 'XC90'],
    'BMW': ['X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7'],
    'Nissan': ['Note', 'Juke', 'Navara', 'Primera', 'Titan']
};

let fuel = ['Gasoline', 'Disel'];

let counter = Counter({_id: 'carId', seq: 0});
console.log(counter);
Counter.update({_id: 'carId'}, counter, {upsert: true, setDefaultsOnInsert: true}, function(err){});

for (let make in carsData) {
    let models = carsData[make];
    for (let i = 0; i < 30; i++) {
        let tmpMode = getRandomInt(0, models.length);
        let tmpBool = Math.random() >= 0.5;
        let tmpFuel = Math.round(Math.random());
        let tempCar = new Car({
            views: getRandomInt(0, 1000),
            year: getRandomInt(1996, 2017),
            price: getRandomInt(3, 1000) * 100,
            kilometrage: getRandomInt(10, 500),
            manufacturer: make,
            model: models[tmpMode],
            fuelType: fuel[tmpFuel],
            automaticTransmission: tmpBool,
            photos: imgs
        });
        tempCar.save(function(err) {
            if (err) {
                console.log(err);
            }
        });
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

