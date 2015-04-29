"use strict";


var Promise = require("bluebird");
var Client = require('node-rest-client').Client;
var ElasticSearchQuery = require("./essearch-query-template.js");

var BaseUrl = "https://18f-3263339722.us-east-1.bonsai.io/sba/_search";

var options_auth={user:"85cok36t2u",password:"49xswrcbt0"};


var searchTerms = [];
var searchResults = [];

//exports.returnedData = searchResults;
exports.doSearch = executeRestClient;


var isEven = function(someNumber){
    return (someNumber%2 == 0) ? true : false;
};


exports.parseTypeAhead = function(params){
  return new Promise(function(resolve, reject){
    try{
      //console.log(JSON.parse(params));
      var vals = JSON.parse(params)
      var lookupVals = vals.aggregations.autocomplete.buckets
      var retVal = {}
      retVal.collection = [];
      var i =0;
      for(var s in lookupVals){
        retVal.collection[i] = {key: lookupVals[s].key};
        i++;
      }
      resolve(retVal)
    }
    catch (e) {
      // reject the promise with caught error
      reject(e);
    }
  });
}

exports.parseHospitalSearchResults = function(cityrecords){
    return new Promise(function(resolve, reject){
      //console.log(cityrecords);
      try{
        for(var n in cityrecords){
          var curCity = JSON.parse(cityrecords[n])
          //console.log();
          console.log(curCity.aggregations.city_avg.value)
        }
        resolve(cityrecords);
      }
      catch (e) {
        // reject the promise with caught error
        reject(e);
      }
    })
}

//set collection to search
exports.setLocations = function(params){
  var i = 0;
  var x = 0;
  var locations = [];
  var location = {};
    return new Promise(function(resolve, reject){
      try{
        for (var property in params) {
          if (params.hasOwnProperty(property)) {
            if(isEven(i)){
              location.city = params[property];
            } else {
              location.state = params[property];
              locations.push(location);
              location={};        
              x++;
            }
          }
          i++;
        }
        resolve(locations);
      } 
      catch (e) {
        // reject the promise with caught error
        reject(e);
      }

  });
  
};


exports.executeHospitalSearch = function(locations)
{
  var url = "https://18f-3263339722.us-east-1.bonsai.io/health/_search";
  
  searchResults = [];
  var elasticTemplate = new ElasticSearchQuery();
  var args = elasticTemplate.getHospitalCostsTemplate();
      return Promise.map(locations, function(term){
        var elasticTemplate = new ElasticSearchQuery();
        var args = elasticTemplate.getHospitalCostsTemplate();
        args.query.bool.must[0].match.provider_state = term.state;
        args.query.bool.must[1].match.provider_city = term.city;
        return new Promise(function(resolve, reject) {
          try {
            executeRestClient(url, args)
            .then(function(data){
              resolve(data);
            })
            }catch (e) {
                // reject the promise with caught error
                console.log(e);
                reject(e);
              }
        })        
      });  

}


function executeRestClient(url, args) {

  var client = new Client(options_auth);
    return new Promise(function(resolve, reject) {
        try {
             var restArgs = {
                data: { },
                headers:{"Content-Type": "application/json"} 
              };
            restArgs.data = args;
            client.post(url, restArgs, function(data, response) {
              //searchResults.push(data);
              resolve(data);
            });
         }catch (e) {
          // reject the promise with caught error
          console.log(e);
          reject(e);
        }
    });
  }
  

