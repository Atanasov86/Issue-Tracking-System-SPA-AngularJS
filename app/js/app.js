"use strict";

var app = angular.module('IssueTrackingSystem', ['ngRoute']);

app.constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'app/templates/login.html',
            controller: 'AuthenticationController'
        })
        .when('/register', {
            templateUrl: 'app/templates/register.html',
            controller: 'AuthenticationController'
        })
        .when('/home', {
            templateUrl: 'app/templates/dashboard.html',
            // controller: 'HomeController'
        })
        .otherwise({
            redirectTo: '/login'
        });
}]);
