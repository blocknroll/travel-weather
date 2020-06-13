/*jshint esversion: 8 */
require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: './src/client/index.js',
  output: {
      libraryTarget: 'var',
      library: 'Client'
  },
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: '/\.js$/',
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      // {
      //   test: /\.scss$/,
      //   use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
      // },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
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
  optimization: {
    // minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
    minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({ cssProcessorOptions: { map: { inline: false, annotation: true, } } })],
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
    new MiniCssExtractPlugin({filename: '[name].css'}),
    new WorkboxPlugin.GenerateSW()
  ]
};
