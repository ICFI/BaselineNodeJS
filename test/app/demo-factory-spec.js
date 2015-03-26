/*global describe, expect, beforeEach, it, inject*/

describe("businessLenderData", function () {
    //var businessLenderData, $httpBackend, queryHandler;

    beforeEach(module('app'));

    // beforeEach(inject(function (_businessLenderData_, _$httpBackend_) {
    //     $httpBackend = _$httpBackend_;
    //     businessLenderData = _businessLenderData_;
    //     queryHandler = $httpBackend.when('GET', '/api/v1/essearch/?assistance=loans')
    //         .respond({
    //             "hits" : {
    //                 "hits": [
    //                     {
    //                         "_id" : "sba_loan-2",
    //                         "_source" : {
    //                             "title"      : "Fisheries Finance Program",
    //                             "state_name" : "null",
    //                             "agency"     : "National Oceanic and Atmospheric Administration (NOAA)"
    //                         }
    //                     }
    //                 ]
    //             }
    //         });
    // }));

    it("should be true", function () {
        expect(true).to.equal(true);
    });

    /*
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
    */
});

describe("stateCities", function () {
    var stateCities, $httpBackend, queryHandler;

    beforeEach(module('app'));

    beforeEach(inject(function (_stateCities_, _$httpBackend_) {
        $httpBackend = _$httpBackend_;
        stateCities = _stateCities_;
        queryHandler = $httpBackend.when('GET', '/api/v1/stateCities/')
            .respond({
                "states" : [
                    {
                        "name": "Alabama",
                        "abbreviation": "AL"
                    },
                    {
                        "name": "Alaska",
                        "abbreviation": "AK"
                    },
                    {
                        "name": "American Samoa",
                        "abbreviation": "AS"
                    },
                    {
                        "name": "Arizona",
                        "abbreviation": "AZ"
                    },
                    {
                        "name": "Arkansas",
                        "abbreviation": "AR"
                    },
                    {
                        "name": "California",
                        "abbreviation": "CA"
                    },
                    {
                        "name": "Colorado",
                        "abbreviation": "CO"
                    },
                    {
                        "name": "Connecticut",
                        "abbreviation": "CT"
                    },
                    {
                        "name": "Delaware",
                        "abbreviation": "DE"
                    },
                    {
                        "name": "District Of Columbia",
                        "abbreviation": "DC"
                    },
                    {
                        "name": "Federated States Of Micronesia",
                        "abbreviation": "FM"
                    },
                    {
                        "name": "Florida",
                        "abbreviation": "FL"
                    },
                    {
                        "name": "Georgia",
                        "abbreviation": "GA"
                    },
                    {
                        "name": "Guam",
                        "abbreviation": "GU"
                    },
                    {
                        "name": "Hawaii",
                        "abbreviation": "HI"
                    },
                    {
                        "name": "Idaho",
                        "abbreviation": "ID"
                    },
                    {
                        "name": "Illinois",
                        "abbreviation": "IL"
                    },
                    {
                        "name": "Indiana",
                        "abbreviation": "IN"
                    },
                    {
                        "name": "Iowa",
                        "abbreviation": "IA"
                    },
                    {
                        "name": "Kansas",
                        "abbreviation": "KS"
                    },
                    {
                        "name": "Kentucky",
                        "abbreviation": "KY"
                    },
                    {
                        "name": "Louisiana",
                        "abbreviation": "LA"
                    },
                    {
                        "name": "Maine",
                        "abbreviation": "ME"
                    },
                    {
                        "name": "Marshall Islands",
                        "abbreviation": "MH"
                    },
                    {
                        "name": "Maryland",
                        "abbreviation": "MD"
                    },
                    {
                        "name": "Massachusetts",
                        "abbreviation": "MA"
                    },
                    {
                        "name": "Michigan",
                        "abbreviation": "MI"
                    },
                    {
                        "name": "Minnesota",
                        "abbreviation": "MN"
                    },
                    {
                        "name": "Mississippi",
                        "abbreviation": "MS"
                    },
                    {
                        "name": "Missouri",
                        "abbreviation": "MO"
                    },
                    {
                        "name": "Montana",
                        "abbreviation": "MT"
                    },
                    {
                        "name": "Nebraska",
                        "abbreviation": "NE"
                    },
                    {
                        "name": "Nevada",
                        "abbreviation": "NV"
                    },
                    {
                        "name": "New Hampshire",
                        "abbreviation": "NH"
                    },
                    {
                        "name": "New Jersey",
                        "abbreviation": "NJ"
                    },
                    {
                        "name": "New Mexico",
                        "abbreviation": "NM"
                    },
                    {
                        "name": "New York",
                        "abbreviation": "NY"
                    },
                    {
                        "name": "North Carolina",
                        "abbreviation": "NC"
                    },
                    {
                        "name": "North Dakota",
                        "abbreviation": "ND"
                    },
                    {
                        "name": "Northern Mariana Islands",
                        "abbreviation": "MP"
                    },
                    {
                        "name": "Ohio",
                        "abbreviation": "OH"
                    },
                    {
                        "name": "Oklahoma",
                        "abbreviation": "OK"
                    },
                    {
                        "name": "Oregon",
                        "abbreviation": "OR"
                    },
                    {
                        "name": "Palau",
                        "abbreviation": "PW"
                    },
                    {
                        "name": "Pennsylvania",
                        "abbreviation": "PA"
                    },
                    {
                        "name": "Puerto Rico",
                        "abbreviation": "PR"
                    },
                    {
                        "name": "Rhode Island",
                        "abbreviation": "RI"
                    },
                    {
                        "name": "South Carolina",
                        "abbreviation": "SC"
                    },
                    {
                        "name": "South Dakota",
                        "abbreviation": "SD"
                    },
                    {
                        "name": "Tennessee",
                        "abbreviation": "TN"
                    },
                    {
                        "name": "Texas",
                        "abbreviation": "TX"
                    },
                    {
                        "name": "Utah",
                        "abbreviation": "UT"
                    },
                    {
                        "name": "Vermont",
                        "abbreviation": "VT"
                    },
                    {
                        "name": "Virgin Islands",
                        "abbreviation": "VI"
                    },
                    {
                        "name": "Virginia",
                        "abbreviation": "VA"
                    },
                    {
                        "name": "Washington",
                        "abbreviation": "WA"
                    },
                    {
                        "name": "West Virginia",
                        "abbreviation": "WV"
                    },
                    {
                        "name": "Wisconsin",
                        "abbreviation": "WI"
                    },
                    {
                        "name": "Wyoming",
                        "abbreviation": "WY"
                    }
                ]
            });
    }));

    it("should fetch state data from /api/v1/stateCities/", function () {
        var results;

        results = stateCities.get();

        expect(results).to.have.length(59);
    });

});