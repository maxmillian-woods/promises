/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');
const readline = require('readline');  


// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  // TODO
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      callback(err);
    } else {
      data = data.toString().split("\n");
      data.length = 1;
      console.log(data[0]);
      callback(null, data[0]);
    }
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  // TODO
  request(url, function (err, response) {
    if (err) {
      console.error(err);
      callback(err);
    } else {
      console.log('statusCode:', response && response.statusCode);
      callback(null, response.statusCode);
    }
  
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
