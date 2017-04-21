let mongoose = require('mongoose');
let Car = require('./models/car');
let fs = require('fs');
let imgs = JSON.parse(fs.readFileSync('img.json', 'utf-8'));

let databaseUrl = 'mongodb://localhost/ZTCars';

mongoose.connect(databaseUrl);
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Mongoose connected to ' + databaseUrl);
});

let carsData = { 
    'Mitsubishi': ['Lanser', 'Lanser Sportback', 'Outlander', 'Triton', 'Pajero', 'Attrage'],
    'Volvo': ['S60', 'S70', 'S80', 'S90', 'XC60', 'XC70', 'XC90'],
    'Nissan': ['Note', 'Juke', 'Navara', 'Primera', 'Titan']
};

let fuel = ['Gasoline', 'Disel'];

let cars = [];

for (let make in carsData) {
    let models = carsData[make];
    for (let i = 0; i < 35; i++) {
        let tmpMode = getRandomInt(0, models.length);
        let tmpBool = Math.random() >= 0.5;
        let tmpFuel = Math.round(Math.random());
        let tempCar = new Car({
            views: getRandomInt(0, 100),
            year: getRandomInt(1996, 2017),
            price: getRandomInt(3, 700) * 100,
            kulometrage: getRandomInt(100, 500),
            manufacturer: make,
            model: models[tmpMode],
            fuelType: fuel[tmpFuel],
            automaticTransmission: tmpBool,
            photos: imgs
        });
        cars.push(tempCar);
    }
}

console.log(cars);

Car.insertMany(cars, function(error, docs) {});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

