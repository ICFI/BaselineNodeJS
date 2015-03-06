/*globals angular */

(function () {
    'use strict';

    var DemoCtrl = function ($scope, $resource, demoData, dataPaths) {
        $scope.demoData = $resource(dataPaths.demo).query();

        $scope.submit = function () {
            var item = {
                title : $scope.title,
                description : $scope.description
            };

            demoData.save(item);
            $scope.title = '';
            $scope.description = '';
            $scope.demoData.push(item);
        };
    };

    angular.module('app').controller('demoCtrl', [
        '$scope',
        '$resource',
        'demoData',
        'dataPaths',
        DemoCtrl
    ]);
}());