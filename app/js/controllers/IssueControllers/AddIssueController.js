"use strict";

app.controller('AddIssueController', [
    '$scope',
    '$location',
    'authService',
    'projectService',
    'issueService',
    'userService',
    'notifyService',
    function ($scope, $location, authService, projectService, issueService, userService, notifyService) {

        userService.getAllUsers()
            .then(function (data) {
                $scope.users = data;
            }, function (error) {
                notifyService.error('Failed to load users.', error);
            });

        projectService.getAllProjects()
            .then(function(projects){
                console.log(projects);
                $scope.projects = projects;
            }, function(error){
                notifyService.error('Failed to load projects', error);
            });


        $scope.addNewIssue = function (issueData) {

            issueService.addIssue(issueData)
                .then(function (response) {
                    console.log(response);
                }, function (error) {
                    console.log(error);
                });
        };
    }
]);
