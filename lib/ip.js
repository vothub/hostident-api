const async = require('async');
const geoip = require('geoip-lite');

const nmap = require('./tools/nmap');
const traceroute = require('./tools/traceroute');
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
      return curl.lookup(ip, (curlErr, curlResults) => {
        rtn.curl = curlResults;
        cb();
      });
    },
    function whoisLookup(cb) {
      return whois.lookup(ip, (whoisErr, whoisResults) => {
        rtn.whois = whoisResults;
        cb();
      });
    },
    function tracerouteLookup(cb) {
      return traceroute.lookup(ip, (tracerouteErr, tracerouteResults) => {
        rtn.traceroute = { hops: tracerouteResults };
        cb();
      });
    },
    function nmapLookup(cb) {
      return nmap.lookup(ip, (nmapErr, nmapResults) => {
        rtn.nmap = nmapResults && nmapResults.length ? nmapResults[0] : false;
        cb();
      });
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
