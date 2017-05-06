var config = require('./config');
var userService = require('./services/user');
var adminService = require('./services/admin');
var mainController = require('./controllers/main');

var app = angular.module('ZTCars', ['ngRoute']);
app.config(config);

app.service('userService', userService); 

app.controller('mainController', mainController);

app.controller('searchController', function($scope) {
    $scope.message = 'Look! I am an search page.';
});

