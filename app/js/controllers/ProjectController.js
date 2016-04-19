"use strict";

app.controller('ProjectController', [
    '$scope',
    '$location',
    'projectService',
    'issueService',
    function ($scope, $location, projectService, issueService) {

        $scope.getProjectsByLeadId = function () {
            projectService.getProjectsByLeadId()
                .then(function (data) {
                    $scope.projects = data;
                });
        };

        $scope.getAllProject = function () {
            issueService.getAllMyIssues()
                .then(function (response) {
                    var currentUserProjectsWithAsignedIssue = [];
                    response.data.Issues.forEach(function (el) {
                        if (currentUserProjectsWithAsignedIssue.indexOf(el.Project) === -1){
                            currentUserProjectsWithAsignedIssue.push(el.Project);
                        }


                    });
                    var filteredProjects = currentUserProjectsWithAsignedIssue.filter(function (obj1, obj2) {
                        return obj1.Id !== obj2.Id;
                    });
                    $scope.ProjectsWithAsignedIssue = currentUserProjectsWithAsignedIssue;
                });
        };

        $scope.getAllProject();
    }
]);



