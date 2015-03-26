/*globals angular */

(function () {
    'use strict';

    var dataPaths = {
        'businessLenderURI'  : '/api/v1/essearch/',
        'stateCities'        : '/api/v1/stateCities/'
    };

    angular.module('app').constant('dataPaths', dataPaths);
}());