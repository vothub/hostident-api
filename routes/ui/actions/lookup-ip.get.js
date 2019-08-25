const _ = require('lodash');

module.exports = (req, res) => {
  const lookupIp = _.get(req, 'query.ip');

  console.log('lookupIp', lookupIp);

  return res.render('lookup-results/domain', { query: { ip: lookupIp }, result: {} });
};
