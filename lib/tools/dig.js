const domain = require('domain-info');

function lookup(input, callback) {
  domain.groper(input, { type: ['A', 'NS', 'MX'] }, (digErr, digResult) => {
    if (digErr) {
      console.log(digErr);
    }

    console.log(JSON.stringify(digResult, null, 2));
    return callback(digErr, digResult);
  });
}

module.exports = {
  lookup
};
