const _ = require('lodash');

module.exports = (req, res) => {
  const lookupDomain = _.get(req, 'query.domain');

  console.log('lookupDomain', lookupDomain);

  return res.render('lookup-results/domain', { query: { domain: lookupDomain }, result: {} });
};
