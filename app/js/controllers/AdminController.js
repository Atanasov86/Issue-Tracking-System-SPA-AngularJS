"use strict";

app.controller('AdminController', [
    '$scope',
    '$location',
    'userService',
    'notifyService',
    function ($scope, $location, userService, notifyService) {

        userService.getAllUsers()
            .then(function(users){
                $scope.allUsers = users;
            }, function(error){
                notifyService.error('Cannot load users.');
            });

        $scope.makeMeAdmin = function(user) {
            var admin = {
                userId: user.Id
            };
            userService.makeMeAdmin(admin)
                .then(function (response){
                    notifyService.success('User ' + user.Username + 'now is admin.');
                }, function (error){
                    notifyService.error(error.Message);
                });
        };
    }
]);
