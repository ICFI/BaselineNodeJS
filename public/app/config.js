/*globals angular */

(function () {
    'use strict';

    var dataPaths = {
        'hospitalcosts' : '/api/v1/hospitalcosts/',
        'stateCities'   : '/api/v1/stateCities/'
    };

    angular.module('app').constant('dataPaths', dataPaths);
}());