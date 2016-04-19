"use strict";

app.factory('notifyService', [
    'ngNotify',
    function (ngNotify) {

        ngNotify.config({
            theme: 'pure',
            position: 'top',
            duration: 1000
        });


        function success(msg) {
            ngNotify.set(msg, 'success');
        }

        function error(msg) {
            ngNotify.set(msg, 'error');
        }

        function info(msg) {
            ngNotify.set(msg, 'info');
        }

        return {
            success: success,
            error: error,
            info: info
        };
    }
]);




