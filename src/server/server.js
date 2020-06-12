/*jshint esversion: 9 */

require('dotenv').config();

// ENDPOINT: Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
const port = 8081;

/* Middleware*/
// configure express to use body-parser as middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server
const server = app.listen(port, () => {
  // Callback to debug
  console.log(`server running on localhost: ${port}`);
});

const fetch = require('node-fetch');






// ROUTES ////////////////////////////////////////////////////////////////////

// GET:  index.html //////////////////////////////////////////////////////////
app.get('/', function (req, res) {
  res.status(200).sendFile('dist/index.html');
});



// GET:  projectData ENDPOINT ////////////////////////////////////////////////

// takes 2 arguments: URL, callback function
app.get('/all', sendData);

// Callback function to complete GET '/all'
function sendData (req, res){
  res.send(projectData);
}



// POST:  OPENWEATHER_API ////////////////////////////////////////////////////

// takes 2 arguments: URL, callback function
app.post('/openweather', getOpenWeather);

// Callback function to complete POST '/openweather'
async function getOpenWeather (req, res) {
  const OPENWEATHER_baseURL = 'http://api.openweathermap.org/data/2.5/';
  const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
  const fullZip = 'weather?zip=' + req.body.zip;
  const relativeURL = fullZip + OPENWEATHER_API_KEY;
  const fullURL = new URL(relativeURL, OPENWEATHER_baseURL);
  const finalURL = fullURL.href;

  const openWeatherResponse = await fetch(finalURL);
  try {
    const openWeatherData = await openWeatherResponse.json();
    // 'res' and 'openWeatherData' could be named anything
    res.send(openWeatherData);
  } catch(error) {
    console.log('getOpenWeather error', error);
  }
}



// POST:  /getLatLng  from GEONAMES_API //////////////////////////////////////

// takes 2 arguments: URL, callback function
app.post('/getLatLng', getLatLng);

async function getLatLng (req, res) {
  const GEONAMES_baseURL = 'http://api.geonames.org/geoCodeAddressJSON?q=';
  const GEONAMES_API_KEY = process.env.GEONAMES_API_KEY;
  const city = req.body.city;
  const finalURL = GEONAMES_baseURL+city+GEONAMES_API_KEY;

  const geonamesResponse = await fetch(finalURL);
  try {
    const latLngData = await geonamesResponse.json();
    console.log(city);
    console.log('lat: ' + latLngData.address.lat + '  ' +
                'lon: ' + latLngData.address.lng);
    // 'res' and 'latLngData' could be named anything
    res.send(latLngData);
  } catch(error) {
    console.log('getLatLng error', error);
  }
}



// POST:  /getWeatherCurrent  from WEATHERBIT_API ////////////////////////////

// takes 2 arguments: URL, callback function
app.post('/getWeatherCurrent', getWeatherCurrent);

async function getWeatherCurrent (req, res) {
  const WEATHERBIT_CURRENT_baseURL = 'https://api.weatherbit.io/v2.0/current?lat=';
  const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
  const lat = req.body.latLngData.address.lat;
  const lon = req.body.latLngData.address.lng;
  const finalURL = WEATHERBIT_CURRENT_baseURL+lat+'&lon='+lon+WEATHERBIT_API_KEY;

  const weatherbitResponse = await fetch(finalURL);
  try {
    const weatherCurrentData = await weatherbitResponse.json();
    console.log(weatherCurrentData);
    // 'res' and 'weatherCurrentData' could be named anything
    res.send(weatherCurrentData);
  } catch(error) {
    console.log('getWeatherCurrent error', error);
  }
}



// POST:  /getWeatherForecast  from WEATHERBIT_API ///////////////////////////

// takes 2 arguments: URL, callback function
app.post('/getWeatherForecast', getWeatherForecast);

async function getWeatherForecast (req, res) {
  const WEATHERBIT_FORECAST_baseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=';
  const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
  const lat = req.body.latLngData.address.lat;
  const lon = req.body.latLngData.address.lng;
  const finalURL = WEATHERBIT_FORECAST_baseURL+lat+'&lon='+lon+WEATHERBIT_API_KEY;

  const weatherbitResponse = await fetch(finalURL);
  try {
    const weatherForecastData = await weatherbitResponse.json();
    console.log(weatherForecastData);
    // 'res' and 'weatherForecastData' could be named anything
    res.send(weatherForecastData);
  } catch(error) {
    console.log('getWeatherForecast error', error);
  }
}



// POST:  /addData  //////////////////////////////////////////////////////////

// takes 2 arguments: URL, callback function
app.post('/addData', addData);

// Callback function to complete POST '/addData'
function addData (req, res){
  // console.log(req.body);
  const newData = {
                    date: req.body.date,
                    temperature: req.body.temperature
  };
  Object.assign(projectData, newData);
  res.send(newData);
  console.log(projectData);
}



// POST:  /getPic  from PIXABAY_API  /////////////////////////////////////////

// takes 2 arguments: URL, callback function
app.post('/getPic', getPic);

async function getPic (req, res) {
  const PIXABAY_baseURL = 'https://pixabay.com/api/';
  const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
  const city = req.body.city;
  const options = '&image_type=photo&orientation=horizontal&category=places&per_page=3';
  const finalURL = PIXABAY_baseURL + PIXABAY_API_KEY + city + options;

  const pixabayResponse = await fetch(finalURL);
  try {
    const picData = await pixabayResponse.json();
    console.log(picData);
    // console.log(picData.hits[0].webformatURL);

    // 'res' and 'picData' could be named anything
    res.send(picData);
  } catch(error) {
    console.log('getPic error', error);
  }
}
