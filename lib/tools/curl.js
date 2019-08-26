const _ = require('lodash');
const request = require('request');

function lookup(input, callback) {
  let inputUrl = input;
  const curlOpts = { followRedirect: true, maxRedirects: 10 };

  if (typeof inputUrl !== 'string' || !inputUrl.length) {
    return callback('URL must be a string.');
  }
  if (!inputUrl.startsWith('http')) {
    inputUrl = `http://${inputUrl}`;
  }

  return request(inputUrl, curlOpts, (reqError, response, body) => {
    // if (reqError) {
    //   console.log(reqError);
    // }

    // console.log(response.request);

    const curlResult = {
      error: reqError,
      status: _.get(response, 'statusCode', false),
      headers: _.get(response, 'headers', false),
      finalUrl: _.get(response, 'request.href', false),
      body
    };

    // console.log(JSON.stringify(curlResult, null, 2));
    return callback(null, curlResult);
  });
}

module.exports = {
  lookup
};
