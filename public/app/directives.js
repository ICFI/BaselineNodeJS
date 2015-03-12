/*globals angular */

(function () {
    'use strict';
    var searchCriteriaItem = function () {
            return {
                restrict    : 'A',
                replace     : false,
                template    : '{{criteria.key}}: {{criteria.name}}', //' <button type="button" class="close" aria-label="Close" ng-click="handleClick(criteria)")><span aria-hidden="true"> &times;</span></button>',
                scope       : {
                    handleClick : '&',
                    criteria: '='
                }
            };
        },

        status = function () {
            return {
                restrict    : 'E',
                replace     : true,
                template    : '<p class="alert" ng-if="statusMessage.length" ng-class="statusType">{{statusMessage}}</p>',
                scope       : {
                    statusType      : '=',
                    statusMessage   : '='
                }
            };
        };

    angular.module('app').directive('searchCriteriaItem', searchCriteriaItem)
                         .directive('status', status);
}());