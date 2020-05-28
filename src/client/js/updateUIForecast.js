/*jshint esversion: 8 */

async function updateUIForecast() {
  const request = await fetch('/all');
  try{
    const allData = await request.json();

    document.querySelector('#temp').innerHTML = "forecasted temp: " +
                                                allData.temperature.toFixed() +
                                                '<span>&#176;</span>F';
  } catch(error) {
    console.log('updateUI error', error);
  }
}

export { updateUIForecast };
