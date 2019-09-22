const _ = require('lodash');
const CPLLib = require('@cyberpolice/lookup-lib');

module.exports = (req, res) => {
  const lookupDomain = _.get(req, 'query.domain');

  console.log('lookupDomain', lookupDomain);

  return CPLLib.domain.lookup(lookupDomain, (domainErr, domainResult) => {
    return res.render('lookup-results/domain', { query: { domain: lookupDomain }, result: domainResult });
  });
};
