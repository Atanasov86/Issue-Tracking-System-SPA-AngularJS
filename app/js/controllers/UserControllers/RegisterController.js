"use strict";

app.controller('RegisterController', [
    '$scope',
    '$location',
    'authService',
    'notifyService',
    function ($scope, $location, authService, notifyService) {
        
        $scope.register = function (user) {
            authService.register(user)
                .then(function () {
                    notifyService.success("Register successfully.");
                    $location.path('/');
                }, function (error) {
                    notifyService.error(error.data.ModelState[''][0]);
                });
        };
    }
]);
