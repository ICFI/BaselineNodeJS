/*globals angular */

(function () {
    'use strict';

    var HeaderController = function ($scope, $rootScope, $location, routeData) {
            var setPageTitle = function () {
                    var index = routeData.length,
                        routeFound = false,
                        path;

                    while (index && !routeFound) {
                        path = routeData[index - 1].path;
                        if ($location.path() === path) {
                            $scope.pagetitle = routeData[index - 1].title;
                            routeFound = true;
                        }

                        index -= 1;
                    }
                };

            $scope.$location = $location;
            $scope.routeData = routeData;

            $rootScope.$on("$routeChangeSuccess", function () {
                setPageTitle();
            });
        },

        HealthcareCostsCompareController = function ($scope, hospitalCosts) {
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
                        'city_name_here'   : $scope.city_name_here.title,
                        'state_abbr_here'  : $scope.state_abbr_here,
                        'city_name_there'  : $scope.city_name_there.title,
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

            $scope.searchResults    = [];

            $scope.city_name_here   = '';
            $scope.state_abbr_here  = '';
            $scope.city_name_there  = '';
            $scope.state_abbr_there = '';

            $scope.statusMessage    = '';
            $scope.statusType       = '';

            $scope.canSubmit        = canSubmit;
            $scope.submit           = submit;
        },

        HealthcareProvidersController = function ($scope, healthcareProviders, geolocate) {
            var setStatus = function (message, type) {
                    $scope.statusMessage     = message;
                    $scope.statusType        = type;
                },

                clearStatus = function () {
                    setStatus('', '');
                },

                radii = [
                    {
                        'option': '5 miles',
                        'value' : '5mi'
                    },
                    {
                        'option': '15 miles',
                        'value' : '15mi'
                    },
                    {
                        'option': '30 miles',
                        'value' : '30mi'
                    },
                    {
                        'option': '50 miles',
                        'value' : '50mi'
                    }
                ],

                canSubmit = function () {
                    return ($scope.latitude !== null && $scope.longitude !== null);
                },

                submit = function () {
                    healthcareProviders.get({
                        'latitude'  : $scope.latitude,
                        'longitude' : $scope.longitude,
                        'radius'    : $scope.radius
                    }).then(
                        function (data) {
                            clearStatus();
                            $scope.markers = data;
                        },
                        function (message) {
                            $scope.markers = [];
                            setStatus(message, 'alert-danger');
                        }
                    );
                },

                useLocation = function () {
                    $scope.isGeolocating = true;

                    geolocate().then(
                        function (location) {
                            $scope.latitude      = location.coords.latitude;
                            $scope.longitude     = location.coords.longitude;
                            $scope.isGeolocating = false;
                            submit();
                        },
                        function (message) {
                            $scope.isGeolocating = false;
                            setStatus(message, 'alert-danger');
                        }
                    );
                };

            $scope.statusMessage = '';
            $scope.statusType    = '';

            $scope.radii         = radii;
            $scope.radius        = radii[2].value;

            $scope.latitude      = null;
            $scope.longitude     = null;

            $scope.isGeolocating = false;
            $scope.useLocation   = useLocation;

            $scope.canSubmit     = canSubmit;
            $scope.submit        = submit;

            $scope.markers       = [];
        };

    angular.module('app').controller('HeaderController', [
        '$scope',
        '$rootScope',
        '$location',
        'routeData',
        HeaderController
    ]);

    angular.module('app').controller('HealthcareCostsCompareController', [
        '$scope',
        'hospitalCosts',
        HealthcareCostsCompareController
    ]);

    angular.module('app').controller('HealthcareProvidersController', [
        '$scope',
        'healthcareProviders',
        'geolocate',
        HealthcareProvidersController
    ]);
}());