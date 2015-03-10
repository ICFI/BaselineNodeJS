/*globals angular */

(function () {
    'use strict';

    var businessLenderData = function ($resource, dataPaths) {
            return $resource(dataPaths.businessLenderURI);
        };

    angular.module('app').factory('businessLenderData', [
        '$resource',
        'dataPaths',
        businessLenderData
    ]);
}());