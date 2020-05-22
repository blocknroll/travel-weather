/*jshint esversion: 9 */

// ENDPOINT: Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
const port = 5000;

/* Middleware*/
// configure express to use body-parser as middle-ware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const server = app.listen(port, () => {
  // Callback to debug
  console.log(`server running on localhost: ${port}`);
});


// ROUTES //////////////////////////////////////////////

// GET route: projectData
app.get('/all', sendData);
// Callback function to complete GET '/all'
function sendData (request, response){
  response.send(projectData);
}


// POST route: addData
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
