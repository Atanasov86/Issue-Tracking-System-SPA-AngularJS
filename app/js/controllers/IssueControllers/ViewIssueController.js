"use strict";

app.controller('ViewIssueController', [
    '$scope',
    '$location',
    '$routeParams',
    'issueService',
    'authService',
    'projectService',
    'commentService',
    'notifyService',
    '_',
    function ($scope, $location, $routeParams, issueService, authService, projectService, commentService, notifyService, _) {
        
        $scope.isDisabled = true;

        $scope.isAdmin = authService.isAdmin();

        var currentUser = authService.getCurrentUser().username;
        
        issueService.getIssueById($routeParams.id)
            .then(function (issueData) {
                $scope.issueData = issueData;

                $scope.issueDate = new Date(issueData.DueDate);

                $scope.issueLabels = _(issueData.Labels).map(function (l) {
                    return l.Name;
                }).join(', ');

                projectService.getProjectById(issueData.Project.Id)
                    .then(function (projectData) {
                        $scope.isProjectLead = projectData.Lead.Username === currentUser;
                    }, function error(err) {
                        notifyService.error("Failed loading data...", err);
                    });

                $scope.isAssignee = issueData.Assignee.Username === currentUser;

            }, function (error) {
                notifyService.error(error.Message);
            });

        commentService.getCommentsByIssueId($routeParams.id)
            .then(function (commentData) {
                $scope.comments = commentData;
                console.log(commentData);
            }, function (error) {
                console.log(error);
            });
    }
]);
