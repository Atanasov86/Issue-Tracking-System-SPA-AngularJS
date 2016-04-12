"use strict";

app.controller('AuthenticationController', [
    '$scope',
    'authService',
    '$location',
    function ($scope, authService, $location) {
        $scope.login = function (user) {
            authService.login(user)
                .then(function (accessToken) {
                    sessionStorage.currentUser = user.Username;
                    sessionStorage.authToken = accessToken.data.access_token;
                    $location.path('/home');
                }, function (error) {
                    console.log(error)
                })
        };
        
        $scope.register = function (user) {
            authService.register(user)
                .then(function (registeredUser) {
                    console.log(registeredUser)
                }, function (error) {
                    console.log(error);
                })
        }
}]);
