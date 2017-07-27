/*eslint-disable no-var */
var path = require('path')
var webpack = require('webpack')
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToVideo = path.resolve(node_modules, 'video.js/dist/video.js')
var pathToVideoHLS = path.resolve(node_modules, 'videojs-contrib-hls/dist/videojs-contrib-hls.js')

module.exports = {

  devtool: 'inline-source-map',

  resolve: {
      alias: { vjs: pathToVideo, videojshls: pathToVideoHLS}
  },

  entry:{
     'shared': './lib/index',
   },

  output: {
    path:path.join(__dirname, '/dist'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/dist/'
  },

  module: {
      loaders: [{
              test: /\.js$/,
              exclude: /node_modules/,
              loaders: [ 'react-hot', 'babel-loader' ]
          },
          {
              test: /\.css$/,
              exclude: path.join(__dirname, 'src'),
              loader: 'style!css!myths'
          },
          {
              test: /\.(png|woff|eot|ttf|swf)/,
              loader: 'url-loader?limit=1'
          },
          {
              test: /\.svg/, loader: 'file-loader'
          },
          {
              test: /\.lrc/, loader: 'raw-loader'
          }
      ],
      noParse:[pathToVideo, pathToVideoHLS]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('shared.js'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]

}
