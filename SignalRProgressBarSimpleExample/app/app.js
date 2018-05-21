var app;
(function () {
    app = angular.module('app', []);

    angular.module('app', ['ui.bootstrap']);
    angular.module('app').value('progress', $.connection.progress);
})();