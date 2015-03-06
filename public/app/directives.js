/*globals angular */

(function () {
    'use strict';
    var directiveOne = function ($log) {
            return {
                restrict    : 'A',
                replace     : false,
                scope       : true,
                link        : function () {
                    $log.info('test');
                }
            };
        };

    angular.module('app').directive('directiveOne', [
        '$log',
        directiveOne
    ]);
}());