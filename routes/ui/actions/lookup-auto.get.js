const _ = require('lodash');
const CPLLib = require('../../../lib');

module.exports = (req, res) => {
  const target = _.get(req, 'query.target');

  console.log('target', target);

  return CPLLib.auto.lookup(target, (autoErr, autoResult) => {
    return res.render('lookup-results/auto', { query: { target }, result: autoResult });
  });
};
