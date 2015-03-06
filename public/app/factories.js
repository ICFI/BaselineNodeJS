/*globals angular */

(function () {
    'use strict';

    var demoData = function ($resource, dataPaths) {
        return $resource(dataPaths.demo);
    };

    angular.module('app').factory('demoData', [
        '$resource',
        'dataPaths',
        demoData
    ]);
}());