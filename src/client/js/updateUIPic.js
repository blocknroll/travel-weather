/*jshint esversion: 8 */

async function updateUIPic(picData, city) {

  // add the returned 'picData' URL to index.html
  document.querySelector('.pic').innerHTML = '<img src="' +
                                              picData.hits[0].webformatURL +
                                              '" alt="a picture of ' +
                                              city + '">';
}

export { updateUIPic };
