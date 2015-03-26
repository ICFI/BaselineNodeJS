/*globals angular */

(function () {
    'use strict';
    var inputStateCity = function () {
            return {
                restrict    : 'A',
                replace     : true,
                transclude  : true,
                templateUrl : "/app/partials/input-state-city.html"
            };
        };

    angular.module('app').directive('inputStateCity', inputStateCity);
}());