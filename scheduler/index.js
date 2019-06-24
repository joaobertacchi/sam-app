'use strict';

console.log('Loading function');

const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();

let response;

exports.lambdaHandler = async (event, context, callback) => {
  const done = (err, res) => callback(null, {
    statusCode: err ? '400' : '200',
    body: err ? err.message : JSON.stringify(res),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  try {
    if (event.headers['content-type'] === 'application/json') {
      const body = JSON.parse(event.body);
      const { when, what } = body;
      // console.log(JSON.stringify({ when: (new Date()).toISOString(), what: {}}))
      if (!when || !what)
        throw new Error(`Invalid body. when=${when}; what=${what}`);

      const timestamp = new Date(when);
      // const ret = await axios(url);
      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: 'hello world'
          // location: ret.data.trim()
        })
      };
    } else {
      const type = event.headers['content-type'];
      const message = ['undefined', 'null'].includes(typeof type)
        ? typeof type
        : type;
      throw new Error('Invalid content-type: ', message);
    }
  } catch (err) {
    response = {
      statusCode: 400,
      body: err.toString()
    };
  }

  return response;
};
