const async = require('async');
const geoip = require('geoip-lite');

const curl = require('./tools/curl');

function lookup(ip, callback) {
  const rtn = {};


  async.parallel([
    function geoipLookup(cb) {
      rtn.geoip = geoip.lookup(ip);
      cb();
    },
    function curlLookup(cb) {
      return curl.lookup(ip, (curlErr, curlResults) => {
        rtn.curl = curlResults;
        cb();
      });
    }
  ], (err, results) => {
    // console.log('lib/ip > lookup > rtn', rtn);
    return callback(null, rtn);
  });
}

module.exports = {
  lookup
};
