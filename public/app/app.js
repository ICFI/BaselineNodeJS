/*globals angular */
var chart;

(function () {
    'use strict';

    angular.module('app', ['ngResource']);
}());

$(function () { 
    $('#results').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Cost Results'
        },
        xAxis: {
            categories: ['Here', 'There', 'National']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Costs',
            data: [100, 50, 75]
        }]
    });
});