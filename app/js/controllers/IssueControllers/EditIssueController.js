"use strict";

app.controller('EditIssueController', [
    '$scope',
    '$location',
    '$routeParams',
    'issueService',
    'projectService',
    'userService',
    'authService',
    'notifyService',
    '_',
    function($scope, $location, $routeParams, issueService, projectService, userService, authService, notifyService, _){

        var currentUser = authService.getCurrentUser().username;

        userService.getAllUsers()
            .then(function(users){
                $scope.users = users;
            }, function () {
                notifyService.error('Cannot load users.');
            });

        issueService.getIssueById($routeParams.id)
            .then(function (issueData) {

                issueData.DueDate = new Date(issueData.DueDate);
                issueData.LabelsAsString = _(issueData.Labels).map(function (l) {
                    return l.Name;
                }).join(', ');
                console.log(issueData);
                $scope.issueData = issueData;
                $scope.isAssignee = issueData.Assignee.Username === currentUser;

                projectService.getProjectById(issueData.Project.Id)
                    .then(function (projectData) {
                        $scope.priorities = projectData.Priorities;
                        console.log($scope.priorities);
                        $scope.isProjectLead = projectData.Lead.Username === currentUser;
                        $scope.isAdmin = authService.isAdmin();
                    }, function(){
                        notifyService.error('Cannot load project.');
                    });

            }, function () {
                notifyService.error('Cannot load this issue.');
            });

        $scope.editIssue = function (issueData) {

            var issue = setIssueObject(issueData);
            console.log(issue);
            issueService.editIssue(issue)

                .then(function (response) {
                    notifyService.success('Successfully edited issue.');
                    $location.path('issues/' + issue.Id);
                }, function () {
                    notifyService.error('Cannot edit this issue');
                });

        };

        function setIssueObject(issueData) {
            var issue = {};
            issue.Title = issueData.Title;
            issue.Id = issueData.Id;
            issue.AssigneeId = issueData.Assignee.Id;
            issue.DueDate = new Date(issueData.DueDate);
            issue.Description = issueData.Description;
            issue.PriorityId = parseInt(issueData.Priority.Id);
            issue.ProjectId = parseInt(issueData.Project.Id);
            issue.Labels = [];
            issueData.LabelsAsString.split(',').forEach(function (l) {
                issue.Labels.push({Name: l.trim()});
            });

            return issue;
        }
    }
]);
