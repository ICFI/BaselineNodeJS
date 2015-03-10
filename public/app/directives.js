/*globals angular */

(function () {
    'use strict';
    var searchCriteriaItem = function () {
            return {
                restrict    : 'A',
                replace     : false,
                template    : '{{criteria.key}}: {{criteria.value}} <button type="button" class="close" aria-label="Close" ng-click="handleClick(criteria)")><span aria-hidden="true"> &times;</span></button>',
                scope       : {
                    handleClick : '&',
                    criteria: '='
                }
            };
        };

    angular.module('app').directive('searchCriteriaItem', [
        searchCriteriaItem
    ]);
}());