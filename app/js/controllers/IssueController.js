"use strict";

app.controller('IssueController', [
    '$scope',
    '$location',
    'issueService',
    'notifyService',
    'pageSize',
    function ($scope, $location, issueService, notifyService, pageSize) {
        $scope.pageStart = 1;
        $scope.pageSize = pageSize;

        $scope.getAllMyIssues = function () {
            issueService.getAllMyIssues()
                .then(function (response) {
                    $scope.issues = response.data;
                    $scope.AllIssues = response.data.TotalPages * $scope.pageSize;

                }, function () {
                    notifyService.error('Cannot load issues.');
                });
        };
        
        $scope.getProjectIssuesById = function (projectId) {

        };

        $scope.getIssueById = function (issueId) {
            issueService.getIssueById(issueId)
                .then(function (issueData) {
                    $scope.issueData = issueData;
                }, function (error) {
                    notifyService.error(error.Message);
                });
        };

        $scope.getIssueByGivenFilter = function () {

        };

        $scope.addNewIssue = function (issue) {
            
        };

        $scope.editIssue = function (issue) {

        };

        $scope.changeIssueLabelStatus = function (issueId) {

        };

        $scope.getAllIssueComment = function (issueId) {

        };

        $scope.addNewIssueComment = function () {

        };

        $scope.getAllMyIssues();
    }
]);