var express = require("express");
var app = express();
var expect = require("chai").expect;
var request = require("supertest");
var Promise = require("bluebird");

var searchuri = {
   dosearch: function(){
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

var elasticService = require("../../server/services/elasticsearch-service")(searchuri, app);



describe("elasticsearch service search", function() {
   it("should search the remote server returning a result as an array", function(done){
   request(app).get('/api/v1/search')
   .expect('Content-Type', /json/)
   .end(function(err, res){
      expect(res.body).to.be.a('Array');
      done();
      });
   });
});

