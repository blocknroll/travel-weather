/*jshint esversion: 8 */

async function getLatLng (GEONAMES_baseURL, city, GEONAMES_API_KEY) {
  const response = await fetch(GEONAMES_baseURL+city+GEONAMES_API_KEY);
  try {
    const geonamesData = await response.json();

    // console.log(data);
    // console.log(data.address.lat);
    // console.log(data.address.lng);

    return geonamesData;

  } catch(error) {
    console.log('getLatLng error', error);
  }
}

export { getLatLng };
