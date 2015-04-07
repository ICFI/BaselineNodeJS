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
// export the class
module.exports = ElasticSearchQuery;