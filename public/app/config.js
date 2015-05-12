/*globals angular */

(function () {
    'use strict';

    var dataPaths = {
            'hospitalcosts'      : '/api/v1/hospitalcosts/',
            'heathcareProviders' : '/api/v1/hospitals/',
            'stateCities'        : '/api/v2/cities/'
        },

        routeData = [
            {
                'title'       : 'Compare Hospital Costs',
                'path'        : '/compare-costs',
                'controller'  : 'HealthcareCostsCompareController',
                'templateUrl' : '/app/partials/healthcareCostsCompare.html',
                'isDefault'   : true
            },
            {
                'title'       : 'Find Nearby Providers',
                'path'        : '/find-providers',
                'controller'  : 'HealthcareProvidersController',
                'templateUrl' : '/app/partials/healthcareProviders.html',
                'isDefault'   : false
            }
        ],

        routeProvider = function ($routeProvider) {
            var defaultIsConfigured = false;

            angular.forEach(routeData, function (route) {
                $routeProvider.when(route.path, {
                    'controller'    : route.controller,
                    'templateUrl'   : route.templateUrl
                });

                if (route.isDefault && !defaultIsConfigured) {
                    $routeProvider.otherwise({
                        redirectTo: route.path
                    });

                    defaultIsConfigured = true;
                }
            });
        };

    angular.module('app')
        .constant('dataPaths', dataPaths)
        .constant('routeData', routeData)
        .config(['$routeProvider', routeProvider]);
}());