/*jshint esversion: 8 */

function countdown(daysToTrip) {
  if (daysToTrip < 0) {
    document.querySelector('#interval').innerHTML = 'departing: TODAY!!!';
  } else if (daysToTrip < 1) {
    document.querySelector('#interval').innerHTML = 'departing: TOMORROW!!!';
  } else if (daysToTrip < 2 ) {
    document.querySelector('#interval').innerHTML = 'depart in: ' + daysToTrip + ' more day!!!';
  } else {
    document.querySelector('#interval').innerHTML = 'depart in: ' + daysToTrip + ' more days!';
  }
}

export { countdown };
