/*jshint esversion: 8 */

async function updateUI() {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    console.log(allData);
    document.querySelector('#date').innerHTML = 'happy ' + allData.date + '!';

    document.querySelector('#temp').innerHTML = "it's " +
                                                allData.temperature.toFixed() +
                                                '<span>&#176;</span>F';

    document.querySelector('#content').innerHTML = "and I'm feeling " +
                                                    allData.feelings;
  } catch(error) {
    console.log('updateUI error', error);
  }
}

export { updateUI };
