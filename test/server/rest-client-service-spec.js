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
         resolve([{"took":4,"timed_out":false,"_shards":{"total":1,"successful":1,"failed":0},"hits":{"total":1,"max_score":0.6793474,"hits":[{"_index":"sba","_type":"sba_state","_id":"AUvmMVcaL8y6AC8FYJt-","_score":0.6793474,"_source":
                      {
                        "url": "http://www.fsa.usda.gov/FSA/webapp?area=home&subject=prsu&topic=flp-fp",
                        "title": "Farm Storage Facility Loan Program",
                        "state_name": null,
                        "is_disaster": "0",
                        "is_disabled": "0",
                        "is_development": "0",
                        "is_contractor": "0",
                        "industry": "Agriculture",
                        "gov_type": "Federal",
                        "description": "Provides low-interest financing for producers to build or upgrade farm storage and handling facilities.",
                        "agency": "U.S. Dept of Agriculture",
                        "is_exporting": "0",
                        "is_general_purpose": "0",
                        "is_green": "0",
                        "is_military": "0",
                        "is_minority": "0",
                        "is_rural": "0",
                        "is_woman": "0",
                        "loan_type": "Loan"
                      }
                    }]}}]);
      });
   },
};


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
});

