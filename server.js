let app = express();
let fs = require('fs');
let path = require('path');
let express = require('express');
let mongoose = require('mongoose');
let autoIncrement = require('mongoose-auto-increment');

let port = 1337;
let databaseUrl = 'mongodb://localhost/ZTCars';

mongoose.connect(databaseUrl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Mongoose connected to ' + databaseUrl);
});

app.use('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, function () {
    console.log('Server running at http://localhost:' + port);
});

log.log('Test Success');
