/*jshint esversion: 8 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/client/index.js',
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
      }
    ],
  },
  plugins: [
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
