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
app.get('/all', sendData);

// Callback function to complete GET '/all'
function sendData (request, response){
  response.send(projectData);
}


// POST: OPENWEATHER_API /////////////////////////////////////////////////////
app.post('/openweather', getOpenWeather);

const OPENWEATHER_baseURL = 'http://api.openweathermap.org/data/2.5/';
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

// Callback function to complete POST '/openweather'
async function getOpenWeather (req, res) {
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


// POST: addData /////////////////////////////////////////////////////////////
app.post('/addData', addData);

// Callback function to complete POST '/addData'
function addData (request, response){
  const newData = {
                    temperature: request.body.temperature,
                    date: request.body.date,
                    feelings: request.body.feelings
  };
  Object.assign(projectData, newData);
  response.send(newData);
  console.log(projectData);
}
