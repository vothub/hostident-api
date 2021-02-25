const async = require('async');
const geoip = require('geoip-lite');

const curl = require('./tools/curl');
const whois = require('./tools/whois');
const parseInput = require('./tools/parseInput');

function lookup(input, callback) {
  const rtn = {};

  // determine type first (is this an IP? domain? URL?)
  const parsed = parseInput(input);
  // console.log('parsed', parsed);

  async.parallel([
    function geoipLookup(cb) {
      if (!parsed.ip) {
        return cb();
      }
      rtn.geoip = geoip.lookup(parsed.ip);
      return cb();
    },
    function whoisLookup(cb) {
      if (!parsed.domain || !parsed.ip) {
        return cb();
      }
      return whois.lookup(parsed.domain || parsed.ip, (whoisErr, whoisResults) => {
        rtn.whois = whoisResults;
        cb();
      });
    },
    function curlLookup(cb) {
      return curl.lookup(parsed.url || parsed.domain || parsed.ip, (curlErr, curlResults) => {
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
