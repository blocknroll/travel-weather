/*jshint esversion: 8 */

async function updateUICurrent(weatherCurrentData) {
  const request = await fetch('/all');
  try{
    const allData = await request.json();

    // add temperature
    document.querySelector('.temp').innerHTML = "current temp: " +
                                                allData.temperature.toFixed() +
                                                '<span>&#176;</span>F';

    // add weather icon
    const iconCode = weatherCurrentData.data[0].weather.icon;
    const iconURL = 'https://www.weatherbit.io/static/img/icons/' +
                     iconCode + '.png';
    document.querySelector('.icon').innerHTML = '<img src="' + iconURL +
                                                '" alt="weather icon">';

    // add weather description
    const description = weatherCurrentData.data[0].weather.description;
    document.querySelector('.conditions').innerHTML = 'conditions: ' +
                                                        description;
  } catch(error) {
    console.log('updateUI error', error);
  }
}

export { updateUICurrent };
