# Travel Weather App



## Overview

This simple app takes a user's travel destination and departure date, and provides the user with related weather information.



## Goals

The specific goals of this project include:
- Playing with asynchronous JavaScript and chained promises
- Integrating multiple external Web API's
- Practice with modern build tools and practices, including Webpack and Sass



## API's used

- __GeoNames__
    - <https://www.geonames.org/>
    - input: city name (text)
    - output: latitude / longitude data


- __Weatherbit__
    - <https://www.weatherbit.io/>
    - input: latitude / longitude data
    - output: current or forecasted weather


- __Pixabay__
    - <https://www.weatherbit.io/>
    - input: city name (text)
    - output: free images of the city



## Pseudo-code

- user enters destination city name and departure date


- user clicks 'get weather' button


- a countdown function determines the number of days until the trip
    - the number of days until the trip is added to the UI


- the user's city input is sent to the GeoNames API
    - latitude / longitude data is retrieved from the returned JSON data


- the latitude / longitude data is then sent to the Weatherbit API
    - if 7 days or less until the trip, we fetch the current weather
    - if more than 7 days until the trip, we fetch the forecasted weather
    - after retrieving the temperature from the returned JSON weather data, a POST request is sent to the server to store the temperature data in the project's data endpoint (a JavaScript object)
    - the temperature, along with a weather icon from the JSON data, are both added to the UI


- the user's textual city input is sent to the Pixabay API
    - a URL is retrieved from the returned collection of JSON image data
    - the URL is then used to update the UI with an image of the user's destination


- happiness ensues!



## Getting started

### Step 1: Install

- `npm install`


### Step 2: Build Development Server

- `npm run build-dev`
- view at: __localhost:8080__


### Step 3: Build Production Server

- `npm run build-prod`
- `npm start`
- view at: __localhost:8081__


### Step 4: Run tests

- `npm test`
