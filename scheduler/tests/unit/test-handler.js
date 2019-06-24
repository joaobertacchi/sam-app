'use strict';

const chai = require('chai');
const app = require('../../index.js');
const expect = chai.expect;

const originalEvent = require('./api-event.json');

let context;

describe('Tests index', function () {

  it('verifies body contains valid application/json', async () => {
    const event = {
      ...originalEvent,
      headers: {
        ...originalEvent.headers,
        'content-type': 'application/json',
      }
    };

    const result = await app.lambdaHandler(event, context);
    expect(result).to.be.an('object');
    expect(result.statusCode).to.equal(200);
    expect(result.body).to.be.an('string');
    let response = JSON.parse(result.body);
    expect(response).to.be.an('object');
    // expect(response.message).to.be.equal("hello world");
  });

  it('return 400 status code if content-type is not application/json', async () => {
    const event = { ...originalEvent };
    const result = await app.lambdaHandler(event, context);
    expect(result.statusCode).to.equal(400);
  });

  it('return 400 status code if body is not a json', async () => {
    const event = {
      ...originalEvent,
      headers: {
        ...originalEvent.headers,
        'content-type': 'application/json',
      },
      body: 'invalid json',
    };
    const result = await app.lambdaHandler(event, context);
    expect(result.statusCode).to.equal(400);
  });
});
