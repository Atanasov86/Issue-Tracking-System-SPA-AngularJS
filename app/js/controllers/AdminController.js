"use strict";

app.controller('AdminController', [
    '$scope',
    '$location',
    'userService',
    'notifyService',
    function ($scope, $location, userService, notifyService) {
        
        $scope.makeMeAdmin = function() {
            userService.makeMeAdmin(userId)
                .then(function (response){
                    //TODO: show success message with name of user
                    notifyService.success()
                }, function (error){
                    notifyService.error(error.Message);
                });
        }
    }
]);
