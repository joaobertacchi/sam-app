// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.lambdaHandler = async (event, context) => {
  try {
    // const ret = await axios(url);
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'hello world'
        // location: ret.data.trim()
      })
    };
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};

exports.httpRequestHandler = (event, context, callback) => {
  'use strict';
  const https = require('https');

  try {
    const body = event.Records[0].body;
    const options = body.options;
    console.log('Received event:', JSON.stringify(options, null, 2));
    const req = https.request(options, res => {
      let body = '';
      console.log('Status:', res.statusCode);
      console.log('Headers:', JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', chunk => (body += chunk));
      res.on('end', () => {
        console.log('Successfully processed HTTP response');
        // If we know it's JSON, parse it
        if (res.headers['content-type'] === 'application/json') {
          body = JSON.parse(body);
        }
        callback(null, body);
      });
    });
    req.on('error', callback);
    // req.write(JSON.stringify(event.data));
    req.end();
  } catch (err) {
    console.log(err);
    return err;
  }
};
