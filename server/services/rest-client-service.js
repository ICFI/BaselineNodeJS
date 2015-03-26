var bodyParser = require("body-parser");
var ElasticSearchQuery = require("../domain/essearch-query-template.js");

var primaryUri = '';



module.exports = function(searchProxy, app) {
    app.use(bodyParser.json()); 
    app.get('/api/v1/essearch/:assistance?/:industry?/:state?', function(req, res) {
      var argTemplate = new ElasticSearchQuery();
      //console.log(JSON.stringify(argTemplate));
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
      //console.log(JSON.stringify(args));
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
}
