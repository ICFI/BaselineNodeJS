var elasticsearch = require('elasticsearch');
var Promise = require("bluebird");
/*  evaluating need based on use of generic rest client */
/*




var client;

exports.createClient=function(uri) {
        return new elasticsearch.Client({
        host: uri,
        defer:true
    });
};

exports.testSearch = function()
{
        // Connect to this host using https, basic auth,
    // a path prefix, and static query string values
    return new elasticsearch.Client({
      host: 'https://85cok36t2u:49xswrcbt0@18f-3263339722.us-east-1.bonsai.io/sba/_search?q=farm',
      defer: true,
    });

}
exports.pingNode = function(client){
    client.ping({
      requestTimeout: 1000,
      // undocumented params are appended to the query string
      hello: "elasticsearch!"
    }, function (error) {
      if (error) {
        console.error('elasticsearch cluster is down!');
      } else {
        console.log('All is well');
      }
    });
}

exports.doSearch = function(client, queryparams){

    client.search({
      q: queryparams
    }).then(function (body) {
      return body.hits.hits;
    }, function (error) {
      return error.message;
    });
}*/