"use strict";

app.controller('AddIssueToProjectController', [
    '$scope',
    '$location',
    '$routeParams',
    'issueService',
    'projectService',
    'userService',
    'notifyService',
    function($scope, $location, $routeParams, issueService, projectService, userService, notifyService){

        userService.getAllUsers()
            .then(function (users) {
                $scope.users = users;
            }, function (error) {
                notifyService.error('Cannot load users.', error);
            });

        projectService.getProjectById($routeParams.id)
            .then(function(projectData){
                $scope.project = projectData;
                $scope.priorities = projectData.Priorities;
            }, function(error){
                notifyService.error('Cannot load project.', error);
            });
        
        $scope.addNewIssue = function (issueData) {
            var issue = setIssueObject(issueData);
            issueService.addIssue(issue)
                .then(function(response){
                    notifyService.success('Successfully created issue.');
                    $location.path('projects/' + $scope.project.Id);
                }, function(error){
                    notifyService.error('Cannot add issue to project.', error);
                });
        };

        function setIssueObject(issueData) {
            var issue = {};
            issue.Title = issueData.Title;
            issue.AssigneeId = issueData.AssigneeId;
            issue.DueDate = new Date(issueData.DueDate);
            issue.Description = issueData.Description;
            issue.PriorityId = parseInt(issueData.PriorityId);
            issue.ProjectId = parseInt($routeParams.id);
            issue.Labels = [];
            issueData.Labels.split(',').forEach(function (l) {
                issue.Labels.push({Name: l.trim()});
            });

            return issue;
        }
    }
]);
