/*globals angular, google */

(function () {
    'use strict';
    var asyncGoogleMap = function () {
            var script = document.createElement('script');

            script.type = 'text/javascript';
            script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&callback=initialize';

            document.body.appendChild(script);
        },

        inputStateCity = function (stateCities) {
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
        },

        googleMap = function ($q) {
            // AIzaSyBFbmMx8JD9al6ziNFFHPeDBp5MOZvfsG0
            return {
                restrict    : 'E',
                replace     : true,
                template    : '<div id="map-canvas"></div>',
                scope       : {
                    markerData : '=',
                    latitude   : '=',
                    longitude  : '='
                },
                compile     : function (tElem, tAttrs) {
                    var map,

                        mapReady = $q.defer(),

                        markers = [],

                        clearMarkers = function () {
                            angular.forEach(markers, function (marker) {
                                marker.setMap(null);
                                marker = null;
                            });

                            markers.length = 0;
                        };

                    asyncGoogleMap();

                    window.initialize = function () {
                        var mapOptions = {
                                zoom   : 8,
                                center : new google.maps.LatLng(-34.397, 150.644)
                            };

                        map = new google.maps.Map(tElem[0], mapOptions);

                        mapReady.resolve();
                    };

                    return function link(scope, iElem, iAttrs) {
                        scope.$watch('markerData', function (newMarkers) {
                            mapReady.promise.then(function () {
                                clearMarkers();

                                if (scope.latitude !== null && scope.longitude !== null) {
                                    map.panTo(new google.maps.LatLng(scope.latitude, scope.longitude));
                                    console.log('panTo');
                                }

                                angular.forEach(newMarkers, function (marker) {
                                    var m = new google.maps.Marker({
                                        position : new google.maps.LatLng(marker.lat, marker.lon),
                                        map      : map,
                                        title    : marker.name
                                    });

                                    m.setMap(map);

                                    markers.push(m);
                                });
                            });
                        });
                    };
                }
            };
        };

    angular.module('app').directive('inputStateCity', ['stateCities', inputStateCity])
                         .directive('compareChart', [compareChart])
                         .directive('googleMap', ['$q', googleMap])
                         .directive('status', [status]);
}());