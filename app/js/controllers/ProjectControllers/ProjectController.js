"use strict";

app.controller('ProjectController', [
    '$scope',
    '$location',
    '$routeParams',
    'notifyService',
    'projectService',
    'authService',
    'issueService',
    '_',
    function ($scope, $location, $routeParams, notifyService, projectService) {
        $scope.projectParams = {
            'pageSize': 9,
            'startPage': 1
        };

        $scope.getAllProjects = function () {
            projectService.getAllProjects($scope.projectParams)
                .then(function (response) {
                    $scope.projects = response;
                    console.log(response);
                    $scope.totalProjects = response.TotalCount;
                }, function (error) {
                    notifyService.error('Cannot load projects...', error);
                });
        };

        $scope.getProjectsByLeadId = function () {
            projectService.getProjectsByLeadId()
                .then(function (response) {
                    $scope.allUserProjects = response.data;
                }, function(){
                    notifyService.error('Cannot load projects.');
                });
        };

        $scope.viewProject = function (projectId) {
            $location.path('/projects/' + projectId);
        };

        $scope.getProjectsByLeadId();
        $scope.getAllProjects();
    }
]);
