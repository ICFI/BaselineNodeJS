var Promise = require("bluebird");
var Client = require('node-rest-client').Client;

var options_auth={user:"85cok36t2u",password:"49xswrcbt0"};

var client = new Client(options_auth);

//exports.testSearch = testSearch;

var oData;

exports.data=oData;

exports.testSearch = function(uri, query) {
    var args ={
        q:query, // data passed to REST method (only useful in POST, PUT or PATCH methods)
      };
    client.get(uri, args, function(data, response){
        // parsed response body as js object
        oData = data;
    })
}