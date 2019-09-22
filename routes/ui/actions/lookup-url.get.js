const _ = require('lodash');
const CPLLib = require('@cyberpolice/lookup-lib');

module.exports = (req, res) => {
  const lookupUrl = _.get(req, 'query.url');

  console.log('lookupUrl', lookupUrl);

  return CPLLib.url.lookup(lookupUrl, (urlErr, urlResult) => {
    return res.render('lookup-results/url', { query: { url: lookupUrl }, result: urlResult });
  });
};
