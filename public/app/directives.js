/*globals angular */

(function () {
    'use strict';
    var inputStateCity = function (stateCities) {
            return {
                restrict    : 'A',
                replace     : true,
                transclude  : true,
                scope       : {
                    'state' : '=',
                    'city'  : '=',
                    'id'    : '@'
                },
                templateUrl : '/app/partials/input-state-city.html',
                link : function (scope) {
                    var stateList = stateCities.get().slice();

                    stateList.unshift({
                        "name": "Select a State",
                        "abbreviation": ""
                    });

                    scope.isCityDisabled = function () {
                        return scope.state === stateList[0].abbreviation;
                    };

                    scope.states = stateList;
                    scope.state = stateList[0].abbreviation;
                }
            };
        },

        compareChart = function () {
            return {
                restrict    : 'A',
                replace     : false,
                transclude  : true,
                scope       : {
                    'compareData' : '='
                },
                template : '<div id="chart"></div>',
                link : function (scope) {
                    $('#chart').highcharts({
                        chart: {
                            type: 'bar'
                        },
                        title: {
                            text: 'Cost Results'
                        },
                        xAxis: {
                            categories: ['Here', 'There', 'National Average']
                        },
                        yAxis: {
                            title: {
                                text: ''
                            }
                        },
                        series: [{
                            name: 'Costs',
                            data: [parseInt(scope.compareData.average_cost_here, 10), parseInt(scope.compareData.average_cost_there, 10), parseInt(scope.compareData.average_cost_nation, 10)]
                        }]
                    });
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

    angular.module('app').directive('inputStateCity', ['stateCities', inputStateCity])
                         .directive('compareChart', [compareChart])
                         .directive('status', [status]);
}());