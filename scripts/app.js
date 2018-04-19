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
	    .when('/', {
	        templateUrl: 'views/loading.html',
	        controller: 'loadingController'
	    })
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'homeController'
        })
        .when('/player', {
            templateUrl: 'views/player.html',
            controller: 'playerController'
        })
        
});