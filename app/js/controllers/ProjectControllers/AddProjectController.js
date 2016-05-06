"use strict";

app.controller('AddProjectController', [
    '$scope',
    '$location',
    'authService',
    'projectService',
    'userService',
    'notifyService',
    function ($scope, $location, authService, projectService, userService, notifyService) {
        var project = {};

        userService.getAllUsers()
            .then(function (response) {
                $scope.users = response;
            }, function (error) {
                notifyService.error('Failed to load users.', error);
            });

        $scope.addNewProject = function (projectData) {

            project = setProjectObject(projectData);

            projectService.addNewProject(project)
                .then(function (response) {
                    notifyService.success('Project successfully created.');                    
                    $location.path('projects/' + response.Id);
                }, function (error) {
                    notifyService.error('Failed to add project!', error);
                });

        };

        function setProjectObject(projectData) {
            var project = {};

            project.Name = projectData.Name;
            project.LeadId = projectData.LeadId;
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
