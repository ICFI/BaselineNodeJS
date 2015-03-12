/*globals angular */

(function () {
    'use strict';

    var businessLenderData = function ($http, $q, dataPaths) {
            var transformLenderData = function (lenderData) {
                    var lenders = [];

                    angular.forEach(lenderData, function (value) {
                        lenders.push(angular.extend({}, {
                            id     : value._id,
                            title  : value._source.title,
                            source : value._source.agency,
                            state  : (value._source.state_name !== "null") ? value._source.state_name : ''
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
        };

    angular.module('app').factory('businessLenderData', ['$http', '$q', 'dataPaths', businessLenderData]);
}());