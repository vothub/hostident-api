const _ = require('lodash');

const urlLib = require('../../../lib/url');

module.exports = (req, res) => {
  const lookupUrl = _.get(req, 'query.url');

  console.log('lookupUrl', lookupUrl);

  return urlLib.lookup(lookupUrl, (urlErr, urlResult) => {
    return res.render('lookup-results/url', { query: { url: lookupUrl }, result: urlResult });
  });
};
