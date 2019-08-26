const _ = require('lodash');

const domainLib = require('../../../lib/domain');

module.exports = (req, res) => {
  const lookupDomain = _.get(req, 'query.domain');

  console.log('lookupDomain', lookupDomain);

  return domainLib.lookup(lookupDomain, (domainErr, domainResult) => {
    return res.render('lookup-results/domain', { query: { domain: lookupDomain }, result: domainResult });
  });
};
