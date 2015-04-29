var express = require("express");
var app = express();
var expect = require("chai").expect;
var request = require("supertest");
var Promise = require("bluebird");
var bodyParser = require("body-parser");
var ElasticSearchQuery = require("../../server/domain/essearch-query-template.js");



var searchImpl = {
   doSearch: function(){
      return new Promise( function(resolve, reject) {
         resolve([{
    "_shards": {
        "failed": 0,
        "successful": 1,
        "total": 1
    },
    "aggregations": {
        "city_avg": {
            "value": 6382.669839652174
        },
        "city_sum": {
            "value": 146801.406312
        }
    },
    "hits": {
        "hits": [],
        "max_score": 0.0,
        "total": 23
    },
    "timed_out": false,
    "took": 1
}]);
      });
   },
   parseTypeAhead : function(params){
  var retVal = {}
  retVal.collection = [];
  var i =0;
  for(var s in params){
    retVal.collection[i] = {key: params[s].key};
    i++;
  }
  return retVal;
}
}

var stateReturn = {
    took: 3,
    timed_out: false,
    _shards: {
        total: 1,
        successful: 1,
        failed: 0
    },
    hits: {
        total: 18524,
        max_score: 0,
        hits: [
            
        ]
    },
    aggregations: {
        autocomplete: {
            doc_count_error_upper_bound: 0,
            sum_other_doc_count: 0,
            buckets: [
                {
                    key: "MA",
                    doc_count: 3191
                },
                {
                    key: "MD",
                    doc_count: 2799
                },
                {
                    key: "ME",
                    doc_count: 598
                },
                {
                    key: "MI",
                    doc_count: 4298
                },
                {
                    key: "MN",
                    doc_count: 1906
                },
                {
                    key: "MO",
                    doc_count: 3266
                },
                {
                    key: "MS",
                    doc_count: 2037
                },
                {
                    key: "MT",
                    doc_count: 429
                }
            ]
        }
    }
}

var elasticService = require("../../server/services/rest-client-service")(searchImpl, app);



describe("The Elastic Search REST client service wrapper", function() {
   it("should search the remote server returning a result as an array", function(done){
   request(app).get('/api/v1/essearch/farm')
   .expect('Content-Type', /json/)
   .end(function(err, res){
      expect(res.body).to.be.a('Array');
      done();
      });
   });
   /* removing test until we have search terms from user input. Query template was modfied for match_all */
   /*
   it("should be able to modify the core query object based on input params", function(done){
      var args = new ElasticSearchQuery();
      var argTemplate = args.getQuery();
      var pre = argTemplate.query.filtered.query.bool.should[0].query_string.query;
      
      argTemplate.query.filtered.query.bool.should[0].query_string.query = 'Docking Bay 7';
      var post = argTemplate.query.filtered.query.bool.should[0].query_string.query;
      expect(pre).to.be.a('string');
      expect('*').to.equal(pre);
      expect(post).to.be.a('string');
      expect('Docking Bay 7').to.equal(post);
      
      done();
   })*/
    
   it("should be able to add filter criteria to the a query template object", function(done){
      var args = new ElasticSearchQuery();
      var stateName = "Virginia";
      var assistanceType = "Loan";
      var industryType = "Child Care";
      var oFilters = [];
      
      var argTemplate = args.getQuery();
      var filterTemplate = args.getFilter();
      
      //argTemplate.query.filtered.filter = filterTemplate;
      if(stateName.length>0)
         oFilters.push({ "terms": { "state_name.raw": [ stateName ] } });
      if(assistanceType.length>0)
         oFilters.push({ "terms": { "loan_type.raw": [ assistanceType ] } });
      if(industryType.length>0)
         oFilters.push({ "terms": { "industry.raw": [ industryType ] } });   
      
      filterTemplate.bool.must=oFilters;
      
      argTemplate.query.filtered.filter = filterTemplate;
      expect(argTemplate.query.filtered.filter.bool.must.length).to.equal(3);
      expect(stateName).to.equal(argTemplate.query.filtered.filter.bool.must[0].terms["state_name.raw"].toString());
      expect(assistanceType).to.equal(argTemplate.query.filtered.filter.bool.must[1].terms["loan_type.raw"].toString());
      expect(industryType).to.equal(argTemplate.query.filtered.filter.bool.must[2].terms["industry.raw"].toString());
      
      done();
   })
   
   describe("The Elastic Hospital Costs Search REST client service wrapper", function() {
      it("should be able to create an instance of the ElasticSearchQuery template", function(done){
         var stateName = "STATE";
         var cityName = "CITY";
         var elasticTemplate = new ElasticSearchQuery();
         var args = elasticTemplate.getHospitalCostsTemplate();
         
         expect(stateName).to.equal(args.query.bool.must[0].match.provider_state.toString());
         expect(cityName).to.equal(args.query.bool.must[1].match.provider_city.toString());
         done();
      });
      
      it("should be able to update state and city based on params", function(done){
         var stateName = "VA";
         var cityName = "Fairfax";
         var elasticTemplate = new ElasticSearchQuery();
         var args = elasticTemplate.getHospitalCostsTemplate();
         
         args.query.bool.must[0].match.provider_state = stateName;
         args.query.bool.must[1].match.provider_city = cityName;
         expect(stateName).to.equal(args.query.bool.must[0].match.provider_state.toString());
         expect(cityName).to.equal(args.query.bool.must[1].match.provider_city.toString());
         done();
      });
      
      it("should return the average cost for the city queried", function(done){
         
         searchImpl.doSearch()
         .then(function(collection){
            expect(6382.669839652174).to.deep.equal(collection[0].aggregations.city_avg.value);
            done();
         })

      });
   });
   
      describe("The state type ahead helper", function() {
         it("should be able to create an instance of the ElasticSearchQuery template", function(done){
            var elasticTemplate = new ElasticSearchQuery();
            var args = elasticTemplate.getStateTypeAhead();
            
            expect(args).to.be.an('object');
         
            done();
         });
         
         it("should be updated with a desired search string", function(done){
            var stateString = "N";
             var elasticTemplate = new ElasticSearchQuery();
            var args = elasticTemplate.getStateTypeAhead();   
            //console.log(args);
            //GOOD console.log(args.aggs.autocomplete.terms.include.pattern) == "M.*";
            //GOOD console.log(args.query.prefix['provider_state.raw'].value) == "M";
            args.aggs.autocomplete.terms.include.pattern = stateString + '.*';
            args.query.prefix['provider_state.raw'].value = stateString.substr(0, 1);
            expect("N.*").to.deep.equal(args.aggs.autocomplete.terms.include.pattern);
            expect("N").to.deep.equal(args.query.prefix['provider_state.raw'].value);
            done();
         });
         
         it("should be able to reduce raw results to a consolidated JSON result set with a length of 8", function(done){
            var returnedValues = stateReturn.aggregations.autocomplete.buckets;
            var retVal = searchImpl.parseTypeAhead(returnedValues);
            expect(retVal.collection).to.have.length(8);
            done();
         });

      });
   
      describe("The city type ahead helper", function() {
         it("should be able to create an instance of the ElasticSearchQuery template", function(done){
            var elasticTemplate = new ElasticSearchQuery();
            var args = elasticTemplate.getCityTypeAhead();
            
            //expect args to be an object
            expect(args).to.be.an('object');
            done();
         });
         
         it("should be updated with a desired search string", function(done){
            var cityString = "Map";  //targeting Maple
            var stateString = "MD";
             var elasticTemplate = new ElasticSearchQuery();
            var args = elasticTemplate.getCityTypeAhead();   
            //console.log(args);
            //GOOD console.log(args.aggs.autocomplete.terms.include.pattern) == "M.*";
            //GOOD console.log(args.query.prefix['provider_state.raw'].value) == "M";
            args.aggs.autocomplete.terms.include.pattern = cityString + '.*';
            args.query.bool.must[0].prefix['provider_city.raw'].value = cityString.substr(0, 1);
            args.query.bool.must[1].match['provider_state.raw'] = stateString;
            expect("Map.*").to.deep.equal(args.aggs.autocomplete.terms.include.pattern);
            expect("M").to.deep.equal(args.query.bool.must[0].prefix['provider_city.raw'].value);
            done();
         });

      });      
});

