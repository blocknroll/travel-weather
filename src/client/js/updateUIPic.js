/*jshint esversion: 8 */

import pixabayLogoSrc from '../media/pixabay-logo.svg';

async function updateUIPic(picData) {

  // add the returned 'picData' URL to index.html
  document.querySelector('#pic').innerHTML = '<img src="' +
                                              picData.hits[0].webformatURL +
                                              '" alt="a picture of ' +
                                              city + '">';

  // add Pixabay logo - only if not already added
  const href = document.querySelector('#pixabayLink').getAttribute('href');
  if (href === '#') {

    const p = document.createElement('p');
    p.innerHTML = 'photo courtesy of:';
    document.querySelector('#pixabayLogoBox').prepend(p);

    const pixabayLogo = new Image();
    pixabayLogo.src = pixabayLogoSrc;
    pixabayLogo.alt = 'Pixabay logo';
    document.querySelector('#pixabayLink').appendChild(pixabayLogo);
    document.querySelector('#pixabayLink').setAttribute('href','https://pixabay.com/');
    document.querySelector('#pixabayLink').setAttribute('target','_blank');
  }

}

export { updateUIPic };
