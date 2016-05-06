"use strict";

var app = angular.module('IssueTrackingSystem', [
    'ngRoute',
    'ngNotify',
    'ui.bootstrap.pagination',
    'underscore',
    'localytics.directives',
    'angular-loading-bar']);

app.constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
app.constant('pageSize', 10);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/templates/home.html',
            controller: 'AuthenticationController'
        })
        .when('/login', {
            templateUrl: 'app/templates/welcome/login.html',
            controller: 'AuthenticationController'
        })
        .when('/register', {
            templateUrl: 'app/templates/welcome/register.html',
            controller: 'AuthenticationController'
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
        .when('/projects/add-issue', {
          templateUrl: 'app/templates/add-issue.html',
          controller: 'AddIssueController'
        })
        .when('/projects/:id/add-issue', {
            templateUrl: 'app/templates/add-issue.html',
            controller: 'AddIssueToProjectController'
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
            redirectTo: '/'
        });
}]);

app.run(function ($rootScope, $location, authService) {
    $rootScope.$on('$locationChangeStart', function () {
        if ((!authService.isLoggedIn() && $location.path().indexOf('/login') === -1) && (!authService.isLoggedIn() && $location.path().indexOf('/register') === -1)) {
            $location.path('/');
        }
    });
});
