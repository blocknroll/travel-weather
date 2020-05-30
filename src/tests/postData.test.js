/*jshint esversion: 8 */
require("regenerator-runtime/runtime");
const fetch = require('node-fetch');
const formHandler = require('../client/js/postData');


async function postData ( url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), //body datatype must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    return newData;
  }catch(error) {
    console.log("postData error", error);
    // appropriately handle the error
  }
}



describe("Test postData method", () => {
  test("It should respond with the correct data object", async () => {

    // INPUT
    const input = {
      date: '1.1.2021',
      temperature: 42
    };

    // OUTPUT
    const output = {
      date: '1.1.2021',
      temperature: 42
    };

    // RESPONSE
    const response = await postData('http://localhost:8081/addData', input );

    return expect(response).toStrictEqual(output);
  });
});



describe("Test postData method", () => {
  test("It should not respond with the wrong data", async () => {

    // INPUT
    const input = {
      date: '1.1.2021',
      temperature: 42
    };

    // OUTPUT
    const output = {
      date: '1.1.2020',
      temperature: 100
    };

    // RESPONSE
    const response = await postData('http://localhost:8081/addData', input );

    return expect(response).not.toBe(output);
  });
});
