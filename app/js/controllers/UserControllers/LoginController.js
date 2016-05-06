"use strict";

app.controller('LoginController', [
    '$scope',
    '$location',
    'authService',
    'notifyService',
    function ($scope, $location, authService, notifyService) {
        
        $scope.login = function (user) {
            authService.login(user)
                .then(function () {
                    $location.path('/');
                    notifyService.success('Login successfully.');
                }, function (error) {
                    notifyService.error(error.data.error_description);
                });
        };
    }
]);
