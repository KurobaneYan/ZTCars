const webpack = require('webpack');
const path = require('path')

const config = {
    context: path.resolve(__dirname, 'public/js'),
    entry: {
        app: './app', 
        vendor: ['../libs/angular/angular',
            '../libs/angular-route/angular-route']
    },
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: '[name].js'
    }
}

module.exports = config
