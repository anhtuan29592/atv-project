'use strict';
var app = angular.module('app.style1', [
    'ngSanitize',
    'ngRoute',
    'caph.ui',
    'caph.media'
]).config(['focusControllerProvider', function(focusControllerProvider) {
    focusControllerProvider.setInitialDepth(1);
}]).config(function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'homeController'
        })
});