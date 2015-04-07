"use strict";

var bodyParser = require("body-parser");
var ElasticSearchQuery = require("../domain/essearch-query-template.js");


module.exports = function(searchProxy, app) {
    app.use(bodyParser.json()); 
    app.get('/api/v1/essearch/:assistance?/:industry?/:state?', function(req, res) {
      var argTemplate = new ElasticSearchQuery();
      var oFilters = [];
      var args = argTemplate.getQuery();
      var filterTemplate = argTemplate.getFilter();
      
      var assistanceType = req.params.assistance;
      var stateName = req.params.state;
      var industryType = req.params.industry;
      
      if(stateName != null)
        oFilters.push({ "terms": { "state_name.raw": [ stateName ] } });
      if(assistanceType != null)
        oFilters.push({ "terms": { "loan_type.raw": [ assistanceType ] } });
      if(industryType != null)
        oFilters.push({ "terms": { "industry.raw": [ industryType ] } });   
      
      filterTemplate.bool.must=oFilters;
      
      args.query.filtered.filter = filterTemplate;

        searchProxy.doSearch('https://18f-3263339722.us-east-1.bonsai.io/sba/_search', args)
        .then(function(collection) {
            argTemplate = null;
            args = null;
            res.send(collection);
        });
    });
    
    app.get('/api/v1/hospitalcosts/:city_name_here?/:state_abbr_here?/:city_name_there?/:state_abbr_there?', function(req, res) {
      res.send({ average_cost_here: "150", average_cost_there: "125",  average_cost_nation: "140" });
    })
    
    app.get('/api/v2/hospitalcosts/:city_name_here?/:state_abbr_here?/:city_name_there?/:state_abbr_there?', function(req, res){
      // res.send({ average_cost_here: "999", average_cost_there: "999",  average_cost_nation: "999" });
      
      var elasticTemplate = new ElasticSearchQuery();
      var args = elasticTemplate.getHospitalCostsTemplate();
      searchProxy.setLocations(req.params);
      
      var city_here = req.params.city_name_here;
      var state_here = req.params.state_abbr_here;
      var city_there = req.params.city_name_there;
      var state_there = req.params.state_abbr_there;
      
      if(city_here != null)
         args.query.bool.must[1].match.provider_city = city_here;  
      if(state_here != null)   
         args.query.bool.must[0].match.provider_state = state_here;
      
      var results = {};
      results.average_cost_nation = '10000';
      
      var oCollection;
      
      searchProxy.doSearch('https://18f-3263339722.us-east-1.bonsai.io/health/_search', args)
        .then(function(collection) {
          oCollection = JSON.parse(collection);
            results.average_cost_here = oCollection.aggregations.city_avg;
        })
        .then(function(collection) {
          if(city_there != null)
             args.query.bool.must[1].match.provider_city = city_there;  
          if(state_there != null)   
             args.query.bool.must[0].match.provider_state = state_there;
          searchProxy.doSearch('https://18f-3263339722.us-east-1.bonsai.io/health/_search', args);   
        })
        .then(function(collection) {
            //oCollection = JSON.parse(collection);
            results.average_cost_there = oCollection.aggregations.city_avg;         
        })
        .then(function() {
          results.average_cost_nation='99999999';
        })
        .then(function(){
          res.send(results);
        });
        
    });
    
    app.get('/api/v3/hospitalcosts/:city_name_here?/:state_abbr_here?/:city_name_there?/:state_abbr_there?', function(req, res){
      searchProxy.setLocations(req.params)
      .then(function(locations){
        searchProxy.returnedData = [];
        searchProxy.executeSearch("https://18f-3263339722.us-east-1.bonsai.io/health/_search", locations);
      })
      .then(function(data){
          res.send(searchProxy.returnedData);
      });
    });
    
};
