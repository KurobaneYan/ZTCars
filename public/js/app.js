var config = require('./config');

var userService = require('./services/user');
var adminService = require('./services/admin');

var mainController = require('./controllers/main');
var carController = require('./controllers/car');
var searchController = require('./controllers/search');

var app = angular.module('ZTCars', ['ngRoute']);
app.config(config);

app.service('userService', userService); 

app.controller('mainController', mainController);
app.controller('carController', carController);
app.controller('searchController', searchController);

