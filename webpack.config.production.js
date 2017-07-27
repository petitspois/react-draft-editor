const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var node_modules = path.resolve(__dirname, 'node_modules');
var extractCSS = new ExtractTextPlugin('styles.css');
var extractSASS = new ExtractTextPlugin('coverage.css');

module.exports = {
    entry: {
        shared: './lib/index',
        vendor: [
            'react',
            'react-dom',
            'react-router'
        ]
    },
    output: {
        path:path.join(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[id].[chunkhash].js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        }),
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            warnings: false
          }
        }),
        extractCSS,
        extractSASS,
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        },
        {
            test: /\.scss$/,
            loader: extractSASS.extract(['css', 'postcss-loader','sass'])
        },
        {
            test: /\.css$/,
            loader: extractCSS.extract("style-loader", "css-loader")
        },
        {
            test: /\.(png|jpg)/, loader: 'file-loader'
        },
        ],
    },
    postcss: function () {
        return [autoprefixer];
   }
};
