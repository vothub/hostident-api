const whois = require('whois');

function lookup(input, callback) {
  whois.lookup(input, { follow: 10, verbose: true, timeout: 60000 }, (whoisErr, whoisResults) => {
    if (whoisErr) {
      console.log(whoisErr);
    }

    // console.log(JSON.stringify(whoisResults, null, 2));
    return callback(whoisErr, whoisResults);
  });
}

module.exports = {
  lookup
};
