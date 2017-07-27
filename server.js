var path = require('path');
var webpack = require('webpack');
// var express = require('express');
var WebpackDevServer = require('webpack-dev-server');
// var webpackDevMiddleware = require('webpack-dev-middleware');
// var webpackHotMiddleware = require('webpack-hot-middleware');
// var app = express();
var config = require('./webpack.config');
// var testConfig = require('./test.webpack.config')
var port = config.port || 7000;
var options = {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    inline: true,
    proxy: {
    //    '/api/*':{
    //        target: 'http://121.40.180.21:8200',
    //    },
    //    '/api/*':{
    //        target: 'http://121.40.180.21:8070',
    //    },
    '/api/*':{
           target: 'http://192.168.1.107:8081',
       },
    }
};



var server = new WebpackDevServer(webpack(config), options);
server.listen(port, "0.0.0.0", function (err, result) {
  if (err) console.error(err);
  console.log('Listening at localhost:%s', port);
});
