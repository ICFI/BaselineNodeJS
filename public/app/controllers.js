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
                    'city_name_here' : $scope.city_name_here.title,
                    'state_abbr_here' : $scope.state_abbr_here,
                    'city_name_there' : $scope.city_name_there.title,
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
            },

            remoteUrlRequestFn = function (str) {
                var citySearchApi = '/api/v1/cities/%state%/'; // /api/v2/cities/VA/m

                console.log(citySearchApi.replace('%state%', $scope.state_abbr_here) + str);

                return citySearchApi.replace('%state%', $scope.state_abbr_here) + str;
            };

        $scope.searchResults = [];

        $scope.city_name_here = '';
        $scope.state_abbr_here = '';
        $scope.city_name_there = '';
        $scope.state_abbr_there = '';

        $scope.statusMessage     = '';
        $scope.statusType        = '';

        $scope.remoteUrlRequestFn = remoteUrlRequestFn;
        $scope.canSubmit = canSubmit;
        $scope.submit = submit;
    };

    angular.module('app').controller('HealthcareCompareController', [
        '$scope',
        'hospitalCosts',
        HealthcareCompareController
    ]);
}());