/*globals angular */

(function () {
    'use strict';

    var hospitalCosts = function ($http, $q, dataPaths) {
            var formatGetPath = function (params) {
                    return dataPaths.hospitalcosts
                           + params.city_name_here + '/'
                           + params.state_abbr_here + '/'
                           + params.city_name_there + '/'
                           + params.state_abbr_there;
                },

                get = function (params) {
                    var deferred = $q.defer();

                    $http({
                        'method': 'GET',
                        'url'   : formatGetPath(params)
                    }).success(function (data) {
                        deferred.resolve(data);
                    }).error(function () {
                        deferred.reject('There were no results.');
                    });

                    return deferred.promise;
                };

            return {
                get : get
            };
        },

        healthcareProviders = function ($http, $q, dataPaths) {
            var formatGetPath = function (params) {
                    return dataPaths.heathcareProviders
                           + params.latitude + '/'
                           + params.longitude + '/'
                           + params.radius;
                },

                get = function (params) {
                    var deferred = $q.defer();

                    $http({
                        'method': 'GET',
                        'url'   : formatGetPath(params)
                    }).success(function (data) {
                        if (data.length) {
                            deferred.resolve(data);
                        } else {
                            deferred.reject('No providers found. Try increasing distance.');
                        }
                    }).error(function () {
                        deferred.reject('There were no results.');
                    });

                    return deferred.promise;
                };

            return {
                get : get
            };
        },

        geolocate = function ($q, $window) {
            var get = function () {
                    var deferred = $q.defer(),

                        options = {
                            maximumAge         : 15000,
                            timeout            : 15000,
                            enableHighAccuracy : false
                        },

                        success = function (data) {
                            deferred.resolve(data);
                        },

                        error = function () {
                            deferred.reject('There was a problem finding your location.');
                        };

                    $window.navigator.geolocation.getCurrentPosition(success, error, options);

                    return deferred.promise;
                };

            return get;
        },

        stateCities = function ($http, $q, dataPaths) {
            var states = [
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
                ];

            var formatGetPath = function (params) {
                    return dataPaths.stateCities
                           + params.state + '/'
                           + params.city;
                },

                get = function (params) {
                    var response,
                        deferred;

                    if (params && params.state) {
                        deferred = $q.defer();

                        $http({
                            'method': 'GET',
                            'url'   : formatGetPath(params)
                        }).success(function (data) {
                            deferred.resolve(data);
                        }).error(function () {
                            deferred.reject('Something went awry.');
                        });

                        response = deferred.promise;
                    } else {
                        response = states;
                    }

                    return response;
                };

            return {
                get: get
            };
        };

    angular.module('app').factory('hospitalCosts', ['$http', '$q', 'dataPaths', hospitalCosts])
                         .factory('healthcareProviders', ['$http', '$q', 'dataPaths', healthcareProviders])
                         .factory('geolocate', ['$q', '$window', geolocate])
                         .factory('stateCities', ['$http', '$q', 'dataPaths', stateCities]);
}());