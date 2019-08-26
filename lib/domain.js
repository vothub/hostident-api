const async = require('async');
const geoip = require('geoip-lite');

const curl = require('./tools/curl');
const whois = require('./tools/whois');

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
    },
    function whoisLookup(cb) {
      return whois.lookup(ip, (whoisErr, whoisResult) => {
        rtn.whois = whoisResult;
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
