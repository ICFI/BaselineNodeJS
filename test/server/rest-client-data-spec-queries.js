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
// export the class
module.exports = ElasticSearchQuery;