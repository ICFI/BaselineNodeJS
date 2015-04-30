// Constructor
function ElasticSearchQuery() {
  // initialize instance properties
  this.queryTemplate = {
        "query": {
            "filtered": {
                "query": {
                    "match_all": {}
                }
            }
        },
        "highlight": {
            "fields": {
                "title": {},
                "description": {}
            },
            "fragment_size": 150,
            "pre_tags": [
                "<em class=\"highlight\">"
            ],
            "post_tags": [
                "</em>"
            ]
        },
        "size": 500,
        "sort": [
            {
                "_score": {
                    "order": "desc",
                    "ignore_unmapped": true
                }
            }
        ]
    };
    
    this.filterTemplate = { "bool": { } };
    
    
    this.hospitalCostsTemplate = {
      "query": {
            "bool": {
              "must": [
                { "match": {"provider_state": "STATE" } },
                { "match": {"provider_city": "CITY" } }
              ]
            }
    
      },
 	"aggs" : {
        	"city_avg" : { "avg" : { "field" : "average_total_payments.number" } },
	        "city_sum" : { "sum" : { "field" : "average_total_payments.number" } }
    },
    "size" : 0
    };
    
    this.stateTypeAhead = {
              "size": 0,
              "aggs": {
                "autocomplete": {
                  "terms": {
                    "field": "provider_state.raw",
                    "order": {
                      "_term": "asc"
                    },
                    "include": {
                      "pattern": "M.*"
                    },
                    "size" : 30
                  }
                }
              },
              "query": {
                "prefix": {
                  "provider_state.raw": {  "value": "M"    }
                }
              }
            }

    this.cityTypeAhead = {
              "size": 0,
              "aggs": {
                "autocomplete": {
                  "terms": {
                    "field": "provider_city.raw",
                    "order": {
                      "_term": "asc"
                    },
                    "include": {
                      "pattern": "M.*"
                    },
                    "size" : 30
                  }
                }
              },
                "query": {
                  "bool": {
                      "must": [
                          {
                              "prefix": {
                                  "provider_city.raw": {
                                      "value": "B"
                                  }
                              }
                          },
                          {
                              "match": {
                                  "provider_state.raw": "MA"
                              }
                          }
                      ]
                  }
              }
            };
            
            this.geoQuery = {
                  "query": {
                    "filtered" : {
                        "query" : {
                            "match_all" : {}
                        },
                        "filter" : {
                            "geo_distance" : {
                                "distance" : "5mi",
                                "location" : {
                                    "lat" : 38.9000,
                                    "lon" : -77.2667
                                }
                            }
                        }
                    }
                  },
                  "fields" : ["provider_name", "provider_city", "provider_state", "location"]
                };            
}

// class methods
ElasticSearchQuery.prototype.getQuery = function() {
  return this.queryTemplate;
};

ElasticSearchQuery.prototype.getFilter = function() {
  return this.filterTemplate;
};

ElasticSearchQuery.prototype.getHospitalCostsTemplate = function () {
    return this.hospitalCostsTemplate;
};

ElasticSearchQuery.prototype.getStateTypeAhead = function () {
    return this.stateTypeAhead;
};
ElasticSearchQuery.prototype.getCityTypeAhead = function () {
    return this.cityTypeAhead;
};

ElasticSearchQuery.prototype.getGeoQuery = function () {
    return this.geoQuery;
};
// export the class
module.exports = ElasticSearchQuery;