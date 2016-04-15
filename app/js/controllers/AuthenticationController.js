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
                .then(function (accessToken) {
                    sessionStorage.currentUser = user.Username;
                    sessionStorage.authToken = accessToken.data.access_token;

                    authService.isAdmin();

                    console.log(sessionStorage.isAdmin);
                    if (sessionStorage.isAdmin) {
                        $location.path('/home/admin');
                        // TODO : redirect ot admin dashboard
                    } else {
                        $location.path('/home/user');
                    }

                    notifyService.success('Login successful.');
                }, function (error) {
                    notifyService.error(error.data.error_description);
                })
        };

        $scope.register = function (user) {
            authService.register(user)
                .then(function () {
                    notifyService.success("Register successfully.");
                }, function (error) {
                    notifyService.error(error.data.ModelState[''][0]);
                })
        };

        $scope.logout = function () {
            sessionStorage.clear();
            notifyService.success("Logout successfully.")
        };        
    }]);
