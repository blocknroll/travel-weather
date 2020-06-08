/*jshint esversion: 8 */
require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/client/index.js',
  output: {
      libraryTarget: 'var',
      library: 'Client'
  },
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: '/\.js$/',
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.OPENWEATHER_API_KEY": JSON.stringify(process.env.OPENWEATHER_API_KEY),
      "process.env.GEONAMES_API_KEY": JSON.stringify(process.env.GEONAMES_API_KEY),
      "process.env.WEATHERBIT_API_KEY": JSON.stringify(process.env.WEATHERBIT_API_KEY)
    }),
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),
    new CleanWebpackPlugin({
      // Simulate the removal of files: default: false
      dry: true,
      // Write Logs to Console, default: false
      verbose: true,
      // Automatically remove all unused webpack assets on rebuild: default: true
      cleanStaleWebpackAssets: true,
      // Do not allow removal of current webpack assets: default: true
      protectWebpackAssets: false
    })
  ]
};
