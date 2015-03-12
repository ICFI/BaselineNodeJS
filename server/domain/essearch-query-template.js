// Constructor
function ElasticSearchQuery() {
  // initialize instance properties
  this.queryTemplate = {
    "query": {
        "filtered": {
            "query": {
                "bool": {
                    "should": [
                        {
                            "query_string": {
                                "query": "*"
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

this.filterTemplate = { "bool": { } };
}
// class methods
ElasticSearchQuery.prototype.getQuery = function() {
  return this.queryTemplate;
};

ElasticSearchQuery.prototype.getFilter = function() {
  return this.filterTemplate;
};
// export the class
module.exports = ElasticSearchQuery;