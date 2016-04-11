"use strict";

var app = angular.module('IssueTrackingSystem', ['ngRoute']);

app.constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/api/');

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'app/templates/login.html',
            controller: 'loginController'
        })
        .when('/register', {
            templateUrl: 'app/templates/register.html',
            controller: 'registerController'
        })
        .otherwise({
            redirectTo: '/login'
        });
}]);
