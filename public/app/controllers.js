/*globals angular */

(function () {
    'use strict';

    var DemoCtrl = function ($scope, businessLenderData) {
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

            setStatus = function (message, type) {
                $scope.statusMessage     = message;
                $scope.statusType        = type;
            },

            clearStatus = function () {
                setStatus('', '');
            },

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

            submit = function () {
                var data = {};
                $scope.searchCriteria = [];

                if ($scope.assistance !== assistanceOptions[0]) {
                    $scope.searchCriteria.push({
                        'key'   : 'Assistance',
                        'index' : 'assistance',
                        'name' : $scope.assistance.name
                    });
                    data.assistance = $scope.assistance.value;
                }

                if ($scope.industry !== industryOptions[0]) {
                    $scope.searchCriteria.push({
                        'key'   : 'Industry',
                        'index' : 'industry',
                        'name' : $scope.industry.name
                    });
                    data.industry = $scope.industry.value;
                }

                if ($scope.state !== stateOptions[0]) {
                    $scope.searchCriteria.push({
                        'key'   : 'State',
                        'index' : 'state',
                        'name' : $scope.state.name
                    });
                    data.state = $scope.state.value;
                }

                $scope.searchData = data;
            };

            /* out of scope
            removeCriteria = function (criteria) {
                switch (criteria.index) {
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

                $scope.submit();
            };
            */

        $scope.statusMessage     = '';
        $scope.statusType        = '';

        $scope.searchBusy        = false;
        $scope.searchCriteria    = [];
        $scope.searchData        = {};
        $scope.searchResults     = [];

        $scope.$watch('searchData', function (newSearch) {
            if (newSearch.assistance) {
                $scope.searchBusy = true;
                $scope.searchResults = [];

                setStatus('Search in progress', 'alert-info');

                businessLenderData.query($scope.searchData).then(
                    function (results) {
                        $scope.searchResults = results;
                        $scope.searchBusy = false;
                        if (results.length > 0) {
                            clearStatus();
                        } else {
                            setStatus('Your search yielded no results.', 'alert-warning');
                        }
                    },
                    function (message) {
                        $scope.searchBusy = false;
                        setStatus(message, 'alert-danger');
                    }
                );
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

        // $scope.removeCriteria = removeCriteria;
        $scope.submit = submit;
    };

    angular.module('app').controller('demoCtrl', [
        '$scope',
        'businessLenderData',
        DemoCtrl
    ]);
}());