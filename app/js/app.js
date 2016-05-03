"use strict";

var app = angular.module('IssueTrackingSystem', [
    'ngRoute',
    'ngNotify',
    'ui.bootstrap.pagination',
    'underscore',
    'localytics.directives',
    'angular-loading-bar']);

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
            controller: 'IssueController'
        })
        .when('/profile/password', {
            templateUrl: 'app/templates/change-password.html',
            controller: 'AuthenticationController'
        })
        .when('/issues/:id', {
            templateUrl: 'app/templates/issue.html',
            controller: 'ViewIssueController'
        })
        .when('/issues/:id/edit', {
            templateUrl: 'app/templates/edit-issue.html',
            controller: 'EditIssueController'
        })
        .when('/projects/:id/add-issue', {
            templateUrl: 'app/templates/add-issue.html',
            controller: 'IssueController'
        })
        .when('/projects', {
            templateUrl: 'app/templates/all-projects.html',
            controller: 'ProjectController'
        })
        .when('/projects/add', {
            templateUrl: 'app/templates/add-project.html',
            controller: 'AddProjectController'
        })
        .when('/projects/:id', {
            templateUrl: 'app/templates/project.html',
            controller: 'ViewProjectController'
        })
        .when('/projects/:id/edit', {
            templateUrl: 'app/templates/edit-project.html',
            controller: 'EditProjectController'
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
