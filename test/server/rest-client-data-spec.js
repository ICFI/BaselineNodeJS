var expect = require("chai").expect;
var Promise = require("bluebird"); //
var searchData = require("../../server/domain/rest-client-data.js");

var ElasticSearchQuery = require("./rest-client-data-spec-queries.js");

var args = new ElasticSearchQuery();

var hospitalGeoResults = {
    "timed_out": false,
    "hits": {
        "max_score": 1,
        "total": 971,
        "hits": [
            {
                "_index": "health-geo",
                "_id": "inpatient-1935",
                "_score": 1,
                "fields": {
                    "provider_city": [
                        "ALEXANDRIA"
                    ],
                    "provider_name": [
                        "INOVA ALEXANDRIA HOSPITAL"
                    ],
                    "lon": [
                        "-77.10468212"
                    ],
                    "lat": [
                        "38.82405122"
                    ],
                    "provider_state": [
                        "VA"
                    ]
                },
                "_type": "inpatient"
            },
            {
                "_index": "health-geo",
                "_id": "inpatient-3460",
                "_score": 1,
                "fields": {
                    "provider_city": [
                        "FAIRFAX"
                    ],
                    "provider_name": [
                        "INOVA FAIR OAKS HOSPITAL"
                    ],
                    "lon": [
                        "-77.37919145"
                    ],
                    "lat": [
                        "38.88470687"
                    ],
                    "provider_state": [
                        "VA"
                    ]
                },
                "_type": "inpatient"
            }
        ]
    }
};
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
    
    it("should be able to define an array of search locations and get a length of 2", function(done){
        var reqParams = {city_name_here: "FAIRFAX", state_here: "VA", city_name_there: "KNOXVILLE", state_there: "TN" };
        searchData.setLocations(reqParams)
        .then(function(data){
            expect(data).to.have.length(2);
            done(); 
        });
    });
    
    it("should be able to execute the search with multiple params", function(done){
        var reqParams = {city_name_here: "FAIRFAX", state_here: "VA", city_name_there: "KNOXVILLE", state_there: "TN" };
        //var reqParams = {city_name_here: "FAIRFAX", state_here: "VA" };

  
        searchData.setLocations(reqParams)
        .then(searchData.executeHospitalSearch)
        .then(function(data){
            expect(data).to.have.length(2);
            done();
        });

    });
    it("should be able to parse the results of the resulting dataset for the return values", function(done){
        var reqParams = {city_name_here: "FAIRFAX", state_here: "VA", city_name_there: "KNOXVILLE", state_there: "TN" };
        //var reqParams = {city_name_here: "FAIRFAX", state_here: "VA" };

  
        searchData.setLocations(reqParams)
        .then(searchData.executeHospitalSearch)
        .then(searchData.parseHospitalSearchResults)
        .then(function(data){
            //console.log(data.average_cost_here);
            expect(data.average_cost_here).to.be.at.least(1);
            expect(data.average_cost_there).to.be.at.least(1);
            expect(data.average_cost_nation).to.be.at.least(1);
            done();
        });

    });    
    

});

      describe("The state type ahead helper", function() {
      
         it("should return a list of states given a prefix and search string subset", function(done){
            var searchString = "M";
            var elasticTemplate = new ElasticSearchQuery();
            var args = elasticTemplate.getStateTypeAhead();
         
            args.aggs.autocomplete.terms.include.pattern = searchString + '.*';
            args.query.prefix['provider_state.raw'].value = searchString.substr(0, 1);
            searchData.doSearch("https://18f-3263339722.us-east-1.bonsai.io/health/_search", args)
            .then(function(collection) {
                expect(collection.length).to.be.at.least(1);
            })
            .catch(function(e) {
                console.error("Exception: " + e);
            });
            done();
         });

      });
      
      describe("The city type ahead helper", function() {
         it("should be able to create an instance of the ElasticSearchQuery template", function(done){
            var searchString = "M";
            var stateString = "MD";
            var elasticTemplate = new ElasticSearchQuery();
            var args = elasticTemplate.getCityTypeAhead();
         
            args.aggs.autocomplete.terms.include.pattern = searchString + '.*';
            args.query.bool.must[0].prefix['provider_city.raw'].value = searchString.substr(0, 1);
            args.query.bool.must[1].match['provider_state.raw'] = stateString;

            done();
         });
         
         
         it("should return a list of cities given a prefix and search string subset", function(done){
             
            var searchString = "M";
            var stateString = "MD";
            var elasticTemplate = new ElasticSearchQuery();
            var args = elasticTemplate.getCityTypeAhead();
         
            args.aggs.autocomplete.terms.include.pattern = searchString + '.*';
            //console.log("arz here: " + JSON.stringify(args.query.bool.must[1]));
            args.query.bool.must[0].prefix['provider_city.raw'].value = searchString.substr(0, 1);
            args.query.bool.must[1].match['provider_state.raw'] = stateString;
            searchData.doSearch("https://18f-3263339722.us-east-1.bonsai.io/health/_search", args)
            .then(function(collection) {
                expect(collection.length).to.be.at.least(1);
            })
            .catch(function(e) {
                console.error("Exception: " + e);
            });
            done();
         });

      });  
      
      describe("The geospatial query", function(){
         it("should be able to create an instance of the query and populate values", function(done){
             //29.9574629,-90.0629541
             //distance 10mi
             var myLat = '29.9574629';
             var myLon = '-90.0629541';
             var myDist = '10mi';
             
            var elasticTemplate = new ElasticSearchQuery();
            var args = elasticTemplate.getGeoQuery();
            args.query.filtered.filter.geo_distance.location.lat=myLat;
            args.query.filtered.filter.geo_distance.location.lon=myLon;
            args.query.filtered.filter.geo_distance.distance=myDist;
            expect(myLat).to.deep.equal(args.query.filtered.filter.geo_distance.location.lat);
            expect(myLon).to.deep.equal(args.query.filtered.filter.geo_distance.location.lon);
            expect(myDist).to.deep.equal(args.query.filtered.filter.geo_distance.distance);
            done();
         });
         
         it("should be able to execute the query and return a list of facilities within the geo boundaries specified", function(done){
             
            var elasticTemplate = new ElasticSearchQuery();
            var args = elasticTemplate.getGeoQuery();
            //static query is defined for Vienna VA with 5mi which covers INOVA Fairfax Hospital
            searchData.doSearch("https://18f-3263339722.us-east-1.bonsai.io/health/_search", args)
            .then(function(collection) {
                expect(collection.length).to.be.at.least(1);
                done();
            })
            .catch(function(e) {
                console.error("Exception: " + e);
            });
         });
         
         it("should be able to parse the returned JSON result from the ElasticSearch index and transform it to a meaningful result", function(done){
             var curResults = JSON.stringify(hospitalGeoResults);
             
             searchData.parseHospitalGeoRecords(curResults)
             .then(function(data){
                expect(data).to.have.length(2);
                expect(data[0].name).to.equal("INOVA ALEXANDRIA HOSPITAL");
                expect(data[1].name).to.equal("INOVA FAIR OAKS HOSPITAL");
                done();
             })
             .catch(function(e) {
                console.error("Exception: " + e);
                done();
            });
         });
      });