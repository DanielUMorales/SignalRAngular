angular.module('app').controller('mainCtrl',
    function ($scope, $modal) {
        $scope.openProgress = function (direction) {
            $scope.direction = direction;

            $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                scope: $scope
            });
        }
    }
);

angular.module('app').controller('ModalInstanceCtrl', function ($scope, $modalInstance) {
    var isForward = $scope.direction === "forward";

    $scope.max = 100;

    $scope.dynamic = isForward ? 0 : 100;

    $.connection.progress.client.addProgress = function (percentage) {
        $scope.dynamic = percentage;

        console.log($scope.dynamic);

        $scope.$apply();

        var limit = isForward ? 100 : 0;

        if (Number($scope.dynamic) === limit) {
            setTimeout(
                function () {
                    $modalInstance.close();
                }, 1000);
        }
    };

    $.connection.hub.logging = true;

    $.connection.hub.start().done(
        function () {
            if (isForward) {
                $.connection.progress.server.longRunningProcess($scope.max);
            } else {
                $.connection.progress.server.longRunningProcessInReverse($scope.max);
            }
        }
    );

    $.connection.hub.error(function (err) {
        console.log("An error ocurred: " + err);
    });
});