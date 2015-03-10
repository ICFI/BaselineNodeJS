var Promise = require("bluebird");
var Client = require('node-rest-client').Client;

var options_auth={user:"85cok36t2u",password:"49xswrcbt0"};

exports.doSearch = function(url, args, callback) {
  var client = new Client(options_auth);
    return new Promise(function(resolve) {
        client.get(url, args, function(data, response) {
            resolve(data);
        });
    });
  };
