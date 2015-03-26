/*globals angular */

(function () {
    'use strict';

    var hospitalCosts = function ($http, $q, dataPaths) {
        /*
            var transformLenderData = function (lenderData) {
                    var lenders = [];

                    angular.forEach(lenderData, function (value) {
                        var id, title, source, state;

                        console.log("id: %s, type: %s, title: %s, source: %s, state: %s", value._id, value._type, value._source.title, value._source.agency, value._source.state_name);

                        id     = value._id;

                        switch (value._type) {
                        case 'sba_loan': 
                            title  = value._source.title;
                            source = value._source.agency;
                            state  = (value._source.state_name !== "null") ? value._source.state_name : '';
                            break;
                        default:
                            title  = value._source.dc_title;
                            source = value._source.description;
                            state  = (value._source.state !== "null") ? value._source.state : '';
                            break;
                        }

                        lenders.push(angular.extend({}, {
                            "id"     : id,
                            "title"  : title,
                            "source" : source,
                            "state"  : state
                        }));
                    });

                    return lenders;
                },

                query = function (queryParams) {
                    var deferred = $q.defer();

                    $http({
                        'method': 'GET',
                        'url'   : dataPaths.businessLenderURI,
                        'params': queryParams
                    }).success(function (data) {
                        if (data.hits && data.hits.hits) {
                            deferred.resolve(transformLenderData(data.hits.hits));
                        } else {
                            deferred.reject('Something went awry.');
                        }
                    }).error(function () {
                        deferred.reject('Something went awry.');
                    });

                    return deferred.promise;
                };

            return {
                query : query
            };
            */

            return {};
        },

        cityState = function ($http, $q, $dataPaths) {

        };

    angular.module('app').factory('hospitalCosts', ['$http', '$q', 'dataPaths', hospitalCosts])
                                  .factory('cityState', ['$http', '$q', 'dataPaths', cityState]);
}());