/*jshint esversion: 8 */

async function updateUICurrent() {
  const request = await fetch('/all');
  try{
    const allData = await request.json();

    document.querySelector('#temp').innerHTML = "current temp: " +
                                                allData.temperature.toFixed() +
                                                '<span>&#176;</span>F';
  } catch(error) {
    console.log('updateUI error', error);
  }
}

export { updateUICurrent };
