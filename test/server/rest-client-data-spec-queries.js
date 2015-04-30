// Constructor
function ElasticSearchQuery() {
  // initialize instance properties
  this.genericArgs = {
          "query": {
            "filtered": {
              "query": {
                "bool": {
                  "should": [
                    {
                      "query_string": {
                        "query": "child"
                      }
                    }
                  ]
                }
              },
              "filter": {
                "bool": {
                  "must": [
                    {
                      "terms": {
                        "loan_type.raw": [
                          "Loan"
                        ]
                      }
                    },
                                {
                      "terms": {
                        "state_name.raw": [
                          "Virginia"
                        ]
                      }
                    },
                                {
                      "terms": {
                        "industry.raw": [
                          "Child Care"
                        ]
                      }
                    }
                  ]
                }
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
  this.assistanceTypeArgs = {
          "query": {
            "filtered": {
              "query": {
                "bool": {
                  "should": [
                    {
                      "query_string": {
                        "query": "child"
                      }
                    }
                  ]
                }
              },
              "filter": {
                "bool": {
                  "must": [
                    {
                      "terms": {
                        "loan_type.raw": [
                          "Loan"
                        ]
                      }
                    }
                  ]
                }
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
  this.stateArgs = {
          "query": {
            "filtered": {
              "query": {
                "bool": {
                  "should": [
                    {
                      "query_string": {
                        "query": "child"
                      }
                    }
                  ]
                }
              },
              "filter": {
                "bool": {
                  "must": [
                    {
                      "terms": {
                        "state_name.raw": [
                          "Virginia"
                        ]
                      }
                    }
                  ]
                }
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
        
  this.industryArgs = {
          "query": {
            "filtered": {
              "query": {
                "bool": {
                  "should": [
                    {
                      "query_string": {
                        "query": "child"
                      }
                    }
                  ]
                }
              },
              "filter": {
                "bool": {
                  "must": [
                    {
                    "terms": {
                        "industry.raw": [
                          "Child Care"
                        ]
                      }
                    }
                  ]
                }
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
            };

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
ElasticSearchQuery.prototype.getGenericQuery = function() {
  return this.genericArgs;
};

ElasticSearchQuery.prototype.getAssistanceTypeQuery = function() {
  return this.assistanceTypeArgs;
};
ElasticSearchQuery.prototype.getStateQuery = function() {
  return this.stateArgs;
};
ElasticSearchQuery.prototype.getIndustryQuery = function() {
  return this.industryArgs;
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