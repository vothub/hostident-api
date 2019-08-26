const _ = require('lodash');
const domain = require('domain-info');

function remap(data) {
  const newArray = [];
  _.each(data, (x1, key) => {
    _.each(x1, (x2) => {
      const x3 = _.merge({}, x2, { type: key });
      newArray.push(x3);
    })
  });

  return newArray;
}

function lookup(input, callback) {
  domain.groper(input, { type: ['A', 'NS', 'MX'] }, (digErr, digResult) => {
    if (digErr) {
      console.log(digErr);
    }

    const remappedDigResult = remap(digResult);

    // console.log(JSON.stringify(remappedDigResult, null, 2));
    return callback(digErr, remappedDigResult);
  });
}

module.exports = {
  lookup
};
