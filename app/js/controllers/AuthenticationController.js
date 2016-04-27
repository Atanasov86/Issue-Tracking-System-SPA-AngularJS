"use strict";

app.controller('AuthenticationController', [
    '$scope',
    'authService',
    '$location',
    'notifyService',
    function ($scope, authService, $location, notifyService) {

        $scope.authService = authService;

        $scope.login = function (user) {
            authService.login(user)
                .then(function () {
                    $location.path('/');
                    notifyService.success('Login successfully.');
                }, function (error) {
                    notifyService.error(error.data.error_description);
                });
        };

        $scope.register = function (user) {
            authService.register(user)
                .then(function () {
                    notifyService.success("Register successfully.");
                }, function (error) {
                    notifyService.error(error.data.ModelState[''][0]);
                });
        };

        $scope.logout = function () {
            sessionStorage.clear();
            notifyService.success("Logout successfully.");
        };

        $scope.changePassword = function (passwordData) {
            authService.changePassword(passwordData)
                .then(function () {
                    notifyService.success('Password has been changed successfully.');
                    $location.path('/');
                }, function (error) {                    
                    notifyService.error(error.data.ModelState[''][0]);
                });
        };
    }
]);