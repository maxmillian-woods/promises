/**
 * Create the promise returning `Async` suffixed versions of the functions below,
 * Promisify them if you can, otherwise roll your own promise returning function
 */

var fs = require('fs');
var request = require('request');
var crypto = require('crypto');
var Promise = require('bluebird');

// (1) Asyncronous HTTP request
var getGitHubProfile = function (user, callback) {
  var options = {
    url: 'https://api.github.com/users/' + user,
    headers: {
      'User-Agent': 'request'
    },
    json: true // will JSON.parse(body) for us
  };

  return new Promise((resolve, reject) => {
    request.get(options, function (err, res, body) {
      if (err) {
        reject(err);
      } else if (body.message) {
        reject(new Error('Failed to get GitHub profile: ' + body.message), null);
      } else {
        resolve(body);
      }
    });
  });
};

var getGitHubProfileAsync = getGitHubProfile; // TODO


// (2) Asyncronous token generation
var generateRandomToken = function (callback) {
  return new Promise( (resolve, reject) => {
    crypto.randomBytes(20, function (err, buffer) {
      if (err) {
        reject(err);
      }
      resolve(buffer.toString('hex'));
    });
  });
};

var generateRandomTokenAsync = generateRandomToken; // TODO


// (3) Asyncronous file manipulation
var readFileAndMakeItFunny = function (filePath, callback) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', function (err, file) {
      if (err) {
        reject(err);
      } else {
        var funnyFile = file.split('\n')
          .map(function (line) {
            return line + ' lol';
          })
          .join('\n');
        resolve(funnyFile);
      }
    });
  });
};

var readFileAndMakeItFunnyAsync = readFileAndMakeItFunny; // TODO

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getGitHubProfileAsync: getGitHubProfileAsync,
  generateRandomTokenAsync: generateRandomTokenAsync,
  readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync
};