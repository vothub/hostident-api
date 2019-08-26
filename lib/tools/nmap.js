const nmap = require('node-nmap');

function lookup(input, callback) {
  // different types of portscan
  const portscan = new nmap.NmapScan(input, '-Pn');
  // const portscan = new nmap.QuickScan(input);
  // const portscan = new nmap.OsAndPortScan(input);

  portscan.on('complete', (data) => {
    // console.log('portscan complete data', data);
    return callback(null, data);
  });

  portscan.on('error', (error) => {
    // console.log('portscan error', error);
    return callback(error);
  });

  return portscan.startScan();
}

module.exports = {
  lookup
};
