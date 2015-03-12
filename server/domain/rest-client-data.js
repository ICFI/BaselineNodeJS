var Promise = require("bluebird");
var Client = require('node-rest-client').Client;

var options_auth={user:"85cok36t2u",password:"49xswrcbt0"};

var oData;

exports.returnedData = oData;

exports.doSearch = function(url, args) {
  var client = new Client(options_auth);
    return new Promise(function(resolve, reject) {
        try {
             var restArgs = {
                data: { },
                headers:{"Content-Type": "application/json"} 
              };
            restArgs.data = args;
            client.post(url, restArgs, function(data, response) {
              //console.log(JSON.stringify(restArgs));
              oData = data;
              resolve(data);
            })
         }catch (e) {
          // reject the promise with caught error
          reject(e);
        };
    });
  };
