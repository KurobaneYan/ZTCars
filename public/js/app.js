var config = require('./config');

var service = require('./service');

var mainController = require('./controllers/main');
var carController = require('./controllers/car');
var searchController = require('./controllers/search');

var app = angular.module('ZTCars', ['ngRoute']);
app.config(config);

app.service('service', service); 

app.controller('mainController', mainController);
app.controller('carController', carController);
app.controller('searchController', searchController);

