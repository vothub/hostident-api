const _ = require('lodash');
const CPLLib = require('@cyberpolice/lookup-lib');

module.exports = (req, res) => {
  const lookupIp = _.get(req, 'query.ip');

  console.log('lookupIp', lookupIp);

  return CPLLib.ip.lookup(lookupIp, (ipErr, ipResults) => {
    return res.render('lookup-results/ip', { query: { ip: lookupIp }, result: ipResults });
  });
};
