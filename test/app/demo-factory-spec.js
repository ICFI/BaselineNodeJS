/*global describe, expect, beforeEach, it, inject*/

describe("businessLenderData", function () {
    var businessLenderData, $httpBackend, queryHandler;

    beforeEach(module('app'));

    beforeEach(inject(function (_businessLenderData_, _$httpBackend_) {
        $httpBackend = _$httpBackend_;
        businessLenderData = _businessLenderData_;
        queryHandler = $httpBackend.when('GET', '/api/v1/essearch/?assistance=loans')
            .respond({
                "hits" : {
                    "hits": [
                        {
                            "_id" : "sba_loan-2",
                            "_source" : {
                                "title"      : "Fisheries Finance Program",
                                "state_name" : "null",
                                "agency"     : "National Oceanic and Atmospheric Administration (NOAA)"
                            }
                        }
                    ]
                }
            });
    }));

    it("should fetch data from /api/v1/essearch/", function () {
        var results;

        businessLenderData.query({
            'assistance' : 'loans'
        }).then(
            function (queryResults) {
                results = queryResults;
            }
        );
        $httpBackend.flush();

        expect(results).to.have.length(1);

        expect(results[0].id).to.equal("sba_loan-2");
        expect(results[0].title).to.equal("Fisheries Finance Program");
        expect(results[0].source).to.equal("National Oceanic and Atmospheric Administration (NOAA)");
        expect(results[0].state).to.equal("");
    });

    it("should return error message on failure", function () {
        var message;

        queryHandler.respond('401', '');

        businessLenderData.query({
            'assistance' : 'loans'
        }).then(
            function () { },
            function (errorMessage) {
                message = errorMessage;
            }
        );
        $httpBackend.flush();

        expect(message).to.equal('Something went awry.');
    });
});