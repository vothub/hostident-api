const async = require('async');

const curl = require('./tools/curl');
const whois = require('./tools/whois');
const dig = require('./tools/dig');
const nmap = require('./tools/nmap');

function lookup(domain, callback) {
  const rtn = {};


  async.parallel([
    function curlLookup(cb) {
      return curl.lookup(domain, (curlErr, curlResults) => {
        rtn.curl = curlResults;
        cb();
      });
    },
    function nmapLookup(cb) {
      return nmap.lookup(domain, (nmapErr, nmapResults) => {
        rtn.nmap = nmapResults;
        cb();
      });
    },
    function whoisLookup(cb) {
      return whois.lookup(domain, (whoisErr, whoisResult) => {
        rtn.whois = whoisResult;
        cb();
      });
    },
    function digLookup(cb) {
      return dig.lookup(domain, (digErr, digResult) => {
        rtn.dig = digResult;
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
