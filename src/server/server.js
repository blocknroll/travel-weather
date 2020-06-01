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

// GET: index.html ///////////////////////////////////////////////////////////
app.get('/', function (req, res) {
  res.status(200).sendFile('dist/index.html');
});



// GET: projectData //////////////////////////////////////////////////////////

// takes 2 arguments: URL, callback function
app.get('/all', sendData);

// Callback function to complete GET '/all'
function sendData (request, response){
  response.send(projectData);
}



// POST: OPENWEATHER_API /////////////////////////////////////////////////////

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

  const response = await fetch(finalURL);
  try {
    const openWeatherData = await response.json();
    res.send(openWeatherData);
  } catch(error) {
    console.log('getOpenWeather error', error);
  }
}



// POST: GEONAMES_API ////////////////////////////////////////////////////////

// takes 2 arguments: URL, callback function
app.post('/getLatLng', getLatLng);

async function getLatLng (req, res) {
  const GEONAMES_baseURL = 'http://api.geonames.org/geoCodeAddressJSON?q=';
  const GEONAMES_API_KEY = process.env.GEONAMES_API_KEY;
  const city = req.body.city;
  const finalURL = GEONAMES_baseURL+city+GEONAMES_API_KEY;

  const response = await fetch(finalURL);
  try {
    const geonamesData = await response.json();
    console.log(geonamesData);
    console.log(geonamesData.address.lat);
    console.log(geonamesData.address.lng);
    res.send(geonamesData);
  } catch(error) {
    console.log('getLatLng error', error);
  }
}



// POST: WEATHERBIT_CURRENT //////////////////////////////////////////////////

// takes 2 arguments: URL, callback function
app.post('/getWeatherCurrent', getWeatherCurrent);

async function getWeatherCurrent (req, res) {
  const WEATHERBIT_CURRENT_baseURL = 'https://api.weatherbit.io/v2.0/current?lat=';
  const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
  const lat = req.body.geonamesData.address.lat;
  const lon = req.body.geonamesData.address.lng;
  const finalURL = WEATHERBIT_CURRENT_baseURL+lat+'&lon='+lon+WEATHERBIT_API_KEY;

  const response = await fetch(finalURL);
  try {
    const weatherbitData = await response.json();
    console.log(weatherbitData);
    console.log(weatherbitData.data[0].temp);
    res.send(weatherbitData);
  } catch(error) {
    console.log('getWeatherCurrent error', error);
  }
}



// POST: WEATHERBIT_FORECAST //////////////////////////////////////////////////

// takes 2 arguments: URL, callback function
app.post('/getWeatherForecast', getWeatherForecast);

async function getWeatherForecast (req, res) {
  const WEATHERBIT_FORECAST_baseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=';
  const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
  const lat = req.body.geonamesData.address.lat;
  const lon = req.body.geonamesData.address.lng;
  const finalURL = WEATHERBIT_FORECAST_baseURL+lat+'&lon='+lon+WEATHERBIT_API_KEY;

  const response = await fetch(finalURL);
  try {
    const weatherbitData = await response.json();
    console.log(weatherbitData);
    console.log(weatherbitData.data[0].temp);
    res.send(weatherbitData);
  } catch(error) {
    console.log('getWeatherForecast error', error);
  }
}



// POST: addData /////////////////////////////////////////////////////////////

// takes 2 arguments: URL, callback function
app.post('/addData', addData);

// Callback function to complete POST '/addData'
function addData (request, response){
  console.log(request.body);
  const newData = {
                    temperature: request.body.temperature,
                    date: request.body.date
  };
  Object.assign(projectData, newData);
  response.send(newData);
  console.log(projectData);
}
