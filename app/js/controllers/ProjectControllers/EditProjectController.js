"use strict";

app.controller('EditProjectController', [
    '$scope',
    '$location',
    '$routeParams',
    'projectService',
    'userService',
    'notifyService',
    '_',
    function ($scope, $location, $routeParams, projectService, userService, notifyService, _) {

        userService.getAllUsers()
            .then(function (response) {
                $scope.users = response;
            }, function (error) {
                notifyService.error('Failed to load users.', error);
            });

        projectService.getProjectById($routeParams.id)
            .then(function (projectData) {
                $scope.projectData = projectData;
                $scope.projectData.Priorities = _(projectData.Priorities).map(p => p.Name).join(', ');
                $scope.projectData.Labels = _(projectData.Labels).map(l => l.Name).join(', ');
            }, function (error) {
                notifyService.error('Failed to load project.', error);
            });

        $scope.editProject = function (projectData) {
            var project = setProjectObject(projectData);
            console.log(project);
            projectService.editProjectById(project)
                .then(function (data){
                    notifyService.success('Successfully edited project.');
                    $location.path("projects/" + $routeParams.id);
                }, function (error) {
                    notifyService.error(error.Message);
                });
        };

        function setProjectObject(projectData) {
            var project = {};

            project.Name = projectData.Name;
            project.LeadId = projectData.Lead.Id;
            project.Id = projectData.Id;
            project.ProjectKey = projectData.ProjectKey;
            project.Description = projectData.Description;
            project.Priorities = [];
            project.Labels = [];

            projectData.Priorities.split(',').forEach(function (p) {
                project.Priorities.push({Name: p.trim()});
            });
            projectData.Labels.split(',').forEach(function (l) {
                project.Labels.push({Name: l.trim()});
            });

            return project;
        }
            
    }
]);
