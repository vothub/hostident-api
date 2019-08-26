const traceroute = require('traceroute');

function lookup(input, callback) {
  return callback();

  return traceroute.trace(input, (err, hops) => {
    if (err) {
      console.log(err);
    }
    return callback(err, hops);
  });
}

module.exports = {
  lookup
};
