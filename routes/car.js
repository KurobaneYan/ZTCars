let express = require('express');
let carController = require('../controllers/car');

let router = express.Router();

router.route('/cars')
    .get(carController.getAllCars)
    .post(carController.createCar);

router.route('/cars/:carId')
    .get(carController.getCarById)
    .put(carController.updateCarById);

module.exports = router;
