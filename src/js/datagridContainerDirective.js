datagridApp.directive('datagridContainer', ['$timeout', function($timeout) {

    return {
        restrict: "EA",
        require: "^datagrid",
        replace: true,
        templateUrl: function (tElement, tAttrs) {
            if (tAttrs.templateUrl === undefined) {
                return "template/datagridContainer.tmpl.html";
            } else {
                return tAttrs.templateUrl;
            }
        },

        scope: {
            metadata: '=', // container metadata
            rows: '=', // container datasource
            cssClass: '@',
            bodyStyle: '=',
            onLoad: '&'
        },
        controller: ['$scope', '$element', function ($scope, $element) {
            //console.log("metadata=", $scope.metadata);
            //console.log("datasource=", $scope.rows);
            //console.log("cssClass=", $scope.cssClass);
        }],

        link: function($scope, $elem, attrs) {
            $timeout(function() {
                $scope.onLoad()();
            });
        }
    };
}]);