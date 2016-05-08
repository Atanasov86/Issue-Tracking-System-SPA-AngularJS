"use strict";

app.directive('loading', ['$http', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs, ctrl) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };

            scope.$watch(scope.isLoading, function (isLoading) {
                if (isLoading) {
                    $(elem).show();
                    $(elem).parent().addClass("loading");
                } else {
                    $(elem).hide();
                    $(elem).parent().removeClass("loading");
                }
            });
        }
    };

}]);