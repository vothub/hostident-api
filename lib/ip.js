const async = require('async');
const geoip = require('geoip-lite');

const nmap = require('./tools/nmap');
// const traceroute = require('./tools/traceroute');
const whois = require('./tools/whois');
const curl = require('./tools/curl');

function lookup(ip, callback) {
  const rtn = {};

  async.parallel([
    function geoipLookup(cb) {
      rtn.geoip = geoip.lookup(ip);
      cb();
    },
    function curlLookup(cb) {
      return curl.lookup(ip, (curlErr, curlResult) => {
        rtn.curl = curlResult;
        cb();
      });
    },
    function whoisLookup(cb) {
      return whois.lookup(ip, (whoisErr, whoisResult) => {
        rtn.whois = whoisResult;
        cb();
      });
    },
    // function tracerouteLookup(cb) {
    //   return traceroute.lookup(ip, (tracerouteErr, tracerouteResult) => {
    //     rtn.traceroute = { hops: tracerouteResult };
    //     cb();
    //   });
    // },
    function nmapLookup(cb) {
      return nmap.lookup(ip, (nmapErr, nmapResult) => {
        rtn.nmap = nmapResult && nmapResult.length ? nmapResult[0] : false;
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
