const _ = require('lodash');

module.exports = (req, res) => {
  const lookupUrl = _.get(req, 'query.url');

  console.log('lookupUrl', lookupUrl);

  return res.render('lookup-results/url', { query: { url: lookupUrl }, result: {} });
};
