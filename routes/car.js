let express = require('express');
let carController = require('../controllers/car');

let router = express.Router();

router.route('/search')
    .post(carController.search);

router.route('/search/:string')
    .get(carController.search)
    .post(carController.search);

router.route('/cars')
    .get(carController.getAllCars)
    .post(carController.createCar);

router.route('/cars/mostPopular/:amount')
    .get(carController.getMostPopular);

router.route('/manufacturers')
    .get(carController.getManufacturers);

router.route('/models/:manufacturer')
    .get(carController.getModels);

router.route('/cars/:carId')
    .get(carController.getCarById)
    .put(carController.updateCarById)
    .delete(carController.deleteCarById);

module.exports = router;
