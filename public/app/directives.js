/*globals angular */

(function () {
    'use strict';
    var searchCriteriaItem = function () {
            return {
                restrict    : 'A',
                replace     : false,
                template    : '{{key}}: {{value}} <button type="button" class="close" aria-label="Close" ng-click="handleClick(criteria)")><span aria-hidden="true"> &times;</span></button>',
                scope       : {
                    handleClick : '&',
                    key         : '@',
                    value       : '@'
                },
                link : function (scope) {
                    console.log('hi', scope);
                }
            };
        };

    angular.module('app').directive('searchCriteriaItem', [
        searchCriteriaItem
    ]);
}());