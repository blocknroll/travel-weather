/*jshint esversion: 8 */

async function updateUIForecast() {
  const request = await fetch('/all');
  try{
    const allData = await request.json();

    document.querySelector('#temp').innerHTML = "forecasted temp: " +
                                                allData.temperature.toFixed() +
                                                '<span>&#176;</span>F';

    // add weather icon
    const iconCode = weatherForecastData.data[0].weather.icon;
    const iconURL = 'https://www.weatherbit.io/static/img/icons/' +
                     iconCode + '.png';
    document.querySelector('#icon').innerHTML = '<img src="' + iconURL +
                                                '" alt="weather icon">';

    // add weather description
    const description = weatherForecastData.data[0].weather.description;
    document.querySelector('#conditions').innerHTML = '<p>conditions: ' +
                                                        description + '</p>';
  } catch(error) {
    console.log('updateUI error', error);
  }
}

export { updateUIForecast };
