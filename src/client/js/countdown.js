/*jshint esversion: 8 */

function countdown(daysToTrip) {

  // console.log('daysToTrip: ', daysToTrip);

  if (daysToTrip >= 2) {
    document.querySelector('.interval').innerHTML = 'depart in: ' + daysToTrip + ' more days!';
  } else if (daysToTrip === 1) {
    document.querySelector('.interval').innerHTML = 'departing: TOMORROW!!!';
  } else {
    document.querySelector('.interval').innerHTML = 'departing: TODAY!!!';
  }

}

export { countdown };
