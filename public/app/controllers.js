/*globals angular */

(function () {
    'use strict';

    var HealthcareCompareController = function ($scope, hospitalCosts) {
        var setStatus = function (message, type) {
                $scope.statusMessage     = message;
                $scope.statusType        = type;
            },

            clearStatus = function () {
                setStatus('', '');
            },

            submit = function () {
                $scope.searchResults = [];

                var params = {
                    'city_name_here' : $scope.city_name_here,
                    'state_abbr_here' : $scope.state_abbr_here,
                    'city_name_there' : $scope.city_name_there,
                    'state_abbr_there' : $scope.state_abbr_there
                };

                hospitalCosts.get(params).then(
                    function (data) {
                        clearStatus();
                        $scope.searchResults.push(data);
                    },
                    function (message) {
                        setStatus(message, 'alert-danger');
                    }
                );
            },

            canSubmit = function () {
                var ifCanSubmit = ($scope.city_name_here !== '') && ($scope.state_abbr_here !== '') && ($scope.city_name_there !== '') && ($scope.state_abbr_there !== '');

                return ifCanSubmit;
            };

        $scope.searchResults = [];

        $scope.city_name_here = '';
        $scope.state_abbr_here = '';
        $scope.city_name_there = '';
        $scope.state_abbr_there = '';

        $scope.statusMessage     = '';
        $scope.statusType        = '';

        $scope.canSubmit = canSubmit;
        $scope.submit = submit;
    };

    angular.module('app').controller('HealthcareCompareController', [
        '$scope',
        'hospitalCosts',
        HealthcareCompareController
    ]);
}());