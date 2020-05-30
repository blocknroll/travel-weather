/*jshint esversion: 8 */

require("regenerator-runtime/runtime");
const fetch = require('node-fetch');


describe("Test '/'", () => {
  test("It should respond with a 200 status response", async () => {
    const output = 200;

    const res = await fetch('http://localhost:8081');
    return expect(res.status).toBe(output);
  });
});
