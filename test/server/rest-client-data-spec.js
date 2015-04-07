var expect = require("chai").expect;
var Promise = require("bluebird"); //
var searchData = require("../../server/domain/rest-client-data.js");

var ElasticSearchQuery = require("./rest-client-data-spec-queries.js");

var args = new ElasticSearchQuery();

describe("The Elastic Search API Interface", function() {
    
 var val;
    it("should connect and search based on a known query param", function(done){
    /* args ={
            q:"farm", // data passed to REST method (only useful in POST, PUT or PATCH methods)
          };
    */
        searchData.doSearch("https://18f-3263339722.us-east-1.bonsai.io/sba/_search", args.genericArgs)
        .then(function(collection) {
            expect(collection.length).to.be.at.least(1);
            done();
        })
    });
    it("should filter results based on assistance type (loan, grant)", function(done){

        //var args = JSON.parse('{"query": { "match": {"_type" : "sba_loan"} }}');
        searchData.doSearch("https://18f-3263339722.us-east-1.bonsai.io/sba/_search", args.assistanceTypeArgs)
        .then(function(collection) {
            expect(collection.length).to.be.at.least(1);
        })
        .catch(function(e) {
            console.error("Exception: " + e);
        });
        done();
    });


    it("should filter results based on the industry", function(done){
        searchData.doSearch("https://18f-3263339722.us-east-1.bonsai.io/sba/_search", args.industryArgs)
        .then(function(collection) {
            expect(collection.length).to.be.at.least(1);
            done();
        })
    });
    
    it("should filter results based on state name", function(done){
        searchData.doSearch("https://18f-3263339722.us-east-1.bonsai.io/sba/_search", args.stateArgs)
        .then(function(collection) {
            expect(collection.length).to.be.at.least(1);
            done();
        })
    });
    
    it("should be able to define an array of search locations", function(done){
        var reqParams = {city_name_here: "FAIRFAX", state_here: "VA", city_name_there: "KNOXVILLE", state_there: "TN" };
        searchData.setLocations(reqParams);
        expect(searchData.getLocations().length).to.equal(2);
        done(); 

    });
    
    it("should be able to execute the search with multiple params", function(done){
        var reqParams = {city_name_here: "FAIRFAX", state_here: "VA", city_name_there: "KNOXVILLE", state_there: "TN" };
        var results;
      searchData.setLocations(reqParams)
      .then(function(locations){
        searchData.executeSearch("https://18f-3263339722.us-east-1.bonsai.io/health/_search", locations);
      })
      .then(function(data){
         console.log("ARZ HERE: data=" + JSON.stringify(data));
         done();
      });

    });

});