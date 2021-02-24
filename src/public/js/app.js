var gateways = angular.module('gateways', ['ngRoute']);
gateways.config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.
        when('/index', {
            templateUrl: '/pages/index.html'
        }).
        when('/gateway', {
            templateUrl: '/pages/gateway.html',
        }).
        when('/peripheral', {
            templateUrl: '/pages/peripheral.html',
        }).
        otherwise('/index');
    }
]);