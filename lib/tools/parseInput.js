const _ = require('lodash');

function detectType(input) {
  if (typeof input !== 'string') {
    return null;
  }

  const inputClean = input.trim();
  const inputSplitByDot = inputClean.split('.');

  const isIp = inputSplitByDot.length === 4 && _.filter(inputSplitByDot, (x) => { return Number.isNaN(Number.parseInt(x, 10)); }).length === 0;
  const isUrl = input.startsWith('http') || input.startsWith('www') || input.indexOf('/') !== -1;

  if (isIp) {
    return 'ip';
  }

  if (isUrl) {
    return 'url';
  }

  return 'domain';
}

function parseInput(input) {
  let rtn = {};
  const detectedType = detectType(input);


  if (detectedType === 'ip') {
    rtn = {
      ip: input.trim()
    }
  }

  if (detectedType === 'url') {
    rtn = {
      url: input.trim()
    }
  }

  if (detectedType === 'domain') {
    rtn = {
      domain: input.trim()
    }
  }

  return rtn;
}

module.exports = parseInput;
