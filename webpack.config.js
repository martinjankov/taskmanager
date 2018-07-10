var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: { 
    TaskManager : './components/TaskManager.js',
    main : './assets/js/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'build/js'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  stats: {
     colors: true
  },
  devtool: 'source-map'
};