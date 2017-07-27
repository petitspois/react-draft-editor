var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer')
var port = 7000;
module.exports = {
    devtool:'eval-source-map',
	devServer: {
	    inline:true,
	    port: 8008
  	},
    entry: {
        app:[
            'webpack-dev-server/client?http://0.0.0.0:7000',
            'webpack/hot/only-dev-server',
            'babel-polyfill',
            './lib/index'
        ]
    },
    output: {
        path:path.join(__dirname, '/dist'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/dev/'
    },
    plugins: [
       new webpack.optimize.CommonsChunkPlugin('app', 'shared.js'),
       new webpack.DefinePlugin({
          'process.env': { NODE_ENV: JSON.stringify('development') }
       }),
       new webpack.HotModuleReplacementPlugin(),
       new webpack.NoErrorsPlugin(),
    ],
    module: {
        loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [ 'react-hot', 'babel-loader?compact=false‌​']
            },
            {
                test: /\.css$/,
                exclude: path.join(__dirname, 'src'),
                loader: 'style!css'
            },
            {
                test: /\.scss$/,
                exclude: path.join(__dirname, 'src'),
                loaders: ['style','css','postcss-loader','sass']
            },
            {
                test: /\.(jpg|png|woff|eot|ttf|swf)/,
                loader: 'url-loader?limit=1'
            },
            {
                test: /\.svg/, loader: 'file-loader'
            },
            {
                test: /\.lrc/, loader: 'raw-loader'
            }
        ]
    },
    postcss: function () {
        return [autoprefixer];
   }

};
