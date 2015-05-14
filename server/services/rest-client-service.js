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
    
    app.get('/api/v0/hospitalcosts/:city_name_here?/:state_abbr_here?/:city_name_there?/:state_abbr_there?', function(req, res) {
      res.send({ average_cost_here: "150", average_cost_there: "125",  average_cost_nation: "140" });
    })
    
    app.get('/api/v1/hospitalcosts/:city_name_here?/:state_abbr_here?/:city_name_there?/:state_abbr_there?', function(req, res){
        searchProxy.setLocations(req.params)
        .then(searchProxy.executeHospitalSearch)
        .then(searchProxy.parseHospitalSearchResults)
        .then(function(data){
            res.send(data);
        });
    });
    
    app.get('/api/v0/states/:letters', function(req, res) {
        res.send({collection:[{value:"MA"},
                                {value:"MD"},
                                {value:"ME"},
                                {value:"MI"},
                                {value:"MN"},
                                {value:"MO"},
                                {value:"MS"},
                                {value:"MT"}
                                ]})
    });
    
        app.get('/api/v0/cities/:state/:letters', function(req, res) {
        res.send({collection:[{value:"MACOMB"},
                                {value:"MACON"},
                                {value:"MADERA"},
                                {value:"MADISON"},
                                {value:"MADISONVILLE"},
                                {value:"MAGEE"},
                                {value:"MAGNOLIA"},
                                {value:"MALONE"},
                                {value:"MANY MORE"}
                                ]})
    });
    
    app.get('/api/v1/states/:letters', function(req, res) {
      var searchString = req.params.letters.toUpperCase();
      var elasticTemplate = new ElasticSearchQuery();
      var args = elasticTemplate.getStateTypeAhead();
      
      args.aggs.autocomplete.terms.include.pattern = searchString + '.*';
      args.query.prefix['provider_state.raw'].value = searchString.substr(0, 1);

      searchProxy.doSearch("https://18f-3263339722.us-east-1.bonsai.io/health/_search", args)
        .then(searchProxy.parseTypeAhead)
        .then(function(collection){
        res.send(collection);
        });
    });
    
    app.get('/api/v1/cities/:letters', function(req, res) {
      var searchString = req.params.letters.toUpperCase();
      var elasticTemplate = new ElasticSearchQuery();
      var args = elasticTemplate.getCityTypeAhead();
      
      args.aggs.autocomplete.terms.include.pattern = searchString + '.*';
      args.query.prefix['provider_city.raw'].value = searchString.substr(0, 1);

      searchProxy.doSearch("https://18f-3263339722.us-east-1.bonsai.io/health/_search", args)
        .then(searchProxy.parseTypeAhead)
        .then(function(collection){
        res.send(collection);
        });
    });   
     app.get('/api/v2/cities/:state/:letters', function(req, res) {
      var searchString = req.params.letters.toUpperCase();
      var elasticTemplate = new ElasticSearchQuery();
      var args = elasticTemplate.getCityTypeAhead();
      
      args.aggs.autocomplete.terms.include.pattern = searchString + '.*';
      args.query.bool.must[0].prefix['provider_city.raw'].value = searchString.substr(0, 1);
      args.query.bool.must[1].match['provider_state.raw'] = req.params.state;

      searchProxy.doSearch("https://18f-3263339722.us-east-1.bonsai.io/health/_search", args)
        .then(searchProxy.parseTypeAhead)
        .then(function(collection){
        res.send(collection);
        });
    });
    
    //PASTE HERE  app.get...
};
