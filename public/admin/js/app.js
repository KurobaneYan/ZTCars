var config = require('./config');

var service = require('./service');

var adminController = require('./controllers/admin');
var createController = require('./controllers/create');

var app = angular.module('ZTCars', ['ngRoute', 'flow']);
app.config(config);

app.service('service', service); 

app.controller('adminController', adminController);
app.controller('createController', createController);

