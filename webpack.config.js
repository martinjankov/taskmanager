var path = require('path');
var webpack = require('webpack');

var config = {
  mode: 'development',
  entry: { 
    main : './assets/js/main.js'
  },
  output: {
    path: path.resolve(__dirname, './build/js'),
    filename: '[name].js',
    publicPath: "./"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      }
    ]
  },
  stats: {
     colors: true
  }
};

module.exports = (env, argv) => {

  if(argv.mode === 'development') {
    config.devtool = 'source-map';
  }

  return config;
};