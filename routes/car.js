let express = require('express');
let carController = require('../controllers/car');

let router = express.Router();

router.route('/cars')
    .get(carController.getAllCars)
    .post(carController.createCar);

router.route('/cars/:carId')
    .get(carController.getCarById)
    .put(carController.updateCarById)
    .delete(carController.deleteCarById);

router.route('/cars/mostPopular/:amount')
    .get(carController.getMostPopular);

module.exports = router;
