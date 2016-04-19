"use strict";

var app = angular.module('IssueTrackingSystem', ['ngRoute', 'ngNotify', 'ui.bootstrap.pagination']);

app.constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
app.constant('pageSize', 5);

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
        .when('/', {
            templateUrl: 'app/templates/dashboard.html',
            controller: 'IssueController',
            access: {
                requiresLogin: true
            }
        })
        .when('/profile/password', {
            templateUrl: 'app/templates/change-password.html',
            controller: 'AuthenticationController'
        })
        .when('/projects/add-issue', {
            templateUrl: 'app/templates/add-new-issue.html',
            controller: 'IssueController'
        })
        .when('/projects', {

        })
        .when('/projects/add', {
            templateUrl: 'app/templates/add-new-project.html',
            controller: 'ProjectController'
        })
        .otherwise({
            redirectTo: '/login'
        });
}]);

app.run(function ($rootScope, $location, authService) {
    $rootScope.$on('$locationChangeStart', function () {
        if (!authService.isLoggedIn() && $location.path().indexOf('/register') === -1) {
            $location.path('/login');
        }
    });
});