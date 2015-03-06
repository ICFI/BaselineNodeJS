/*globals angular */

(function () {
    'use strict';

    var DemoCtrl = function ($scope, $resource, demoData, dataPaths) {
        var assistanceOptions = [
                {
                    'name'  : 'Select Assistance Type',
                    'value' : ''
                },
                {
                    'name'  : 'Grants',
                    'value' : 'grants'
                },
                {
                    'name'  : 'Loans',
                    'value' : 'loans'
                }
            ],
            industryOptions = [
                {
                    'name'  : 'Select Industry Type',
                    'value' : ''
                },
                {
                    'name'  : 'Agriculture',
                    'value' : 'agriculture'
                },
                {
                    'name'  : 'Environment',
                    'value' : 'environment'
                },
                {
                    'name'  : 'Manufacturing',
                    'value' : 'manufacturing'
                },
                {
                    'name'  : 'Child Care',
                    'value' : 'loans'
                }
            ],
            stateOptions = [
                {
                    'name'  : 'Select State',
                    'value' : ''
                },
                {
                    'name'  : 'Maryland',
                    'value' : 'md'
                },
                {
                    'name'  : 'Virginia',
                    'value' : 'va'
                }
            ],
            setIndustryOptions = function (selectedOption) {
                if (selectedOption.value === assistanceOptions[0].value) {
                    $scope.industryOptions   = industryOptions.slice(0, 1);
                } else {
                    $scope.industryOptions   = industryOptions;
                }

                $scope.industry          = industryOptions[0];
            },
            setStateOptions = function (selectedOption) {
                if (selectedOption.value === industryOptions[0].value) {
                    $scope.stateOptions      = stateOptions.slice(0, 1);
                } else {
                    $scope.stateOptions      = stateOptions;
                }

                $scope.state             = stateOptions[0];
            },
            search = function () {
                var data = {};
                $scope.searchCriteria = [];

                if ($scope.assistance !== assistanceOptions[0]) {
                    $scope.searchCriteria.push({
                        'key'   : 'Assistance',
                        'index' : 'assistance',
                        'value' : $scope.assistance.value
                    });
                    data.assistance = $scope.assistance.value;
                }

                if ($scope.industry !== industryOptions[0]) {
                    $scope.searchCriteria.push({
                        'key'   : 'Industry',
                        'index' : 'industry',
                        'value' : $scope.industry.value
                    });
                    data.industry = $scope.industry.value;
                }

                if ($scope.state !== stateOptions[0]) {
                    $scope.searchCriteria.push({
                        'key'   : 'State',
                        'index' : 'state',
                        'value' : $scope.state.value
                    });
                    data.state = $scope.state.value;
                }

                $scope.searchData = data;
            },
            removeCriteria = function (criteria) {
                console.log('criteria');
                switch (criteria) {
                case 'assistance':
                    $scope.assistance = assistanceOptions[0];
                    break;
                case 'industry':
                    $scope.industry = industryOptions[0];
                    break;
                case 'state':
                    $scope.state = stateOptions[0];
                    break;
                }
            };

        $scope.searchCriteria    = [];
        $scope.searchData        = {};
        $scope.$watch('searchData', function (newSearch) {
            console.log(newSearch);
            if (newSearch.assistance) {

            }
        });

        $scope.assistanceOptions = assistanceOptions;
        $scope.assistance        = assistanceOptions[0];
        $scope.$watch('assistance', setIndustryOptions);

        $scope.industryOptions   = industryOptions.slice(0, 1);
        $scope.industry          = industryOptions[0];
        $scope.$watch('industry', setStateOptions);

        $scope.stateOptions      = stateOptions.slice(0, 1);
        $scope.state             = stateOptions[0];

        $scope.removeCriteria = removeCriteria;
        $scope.submit = search;
    };

    angular.module('app').controller('demoCtrl', [
        '$scope',
        '$resource',
        'demoData',
        'dataPaths',
        DemoCtrl
    ]);
}());