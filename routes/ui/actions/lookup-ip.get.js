const _ = require('lodash');

const ipLib = require('../../../lib/ip');

module.exports = (req, res) => {
  const lookupIp = _.get(req, 'query.ip');

  console.log('lookupIp', lookupIp);

  return ipLib.lookup(lookupIp, (ipErr, ipResults) => {
    return res.render('lookup-results/ip', { query: { ip: lookupIp }, result: ipResults });
  });
};
