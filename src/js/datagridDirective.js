datagridApp.directive('datagrid', [function(){
    return {
        restrict: "EA",
        replace: true,
        templateUrl: function (tElement, tAttrs) {
            if (tAttrs.templateUrl === undefined) {
                return "template/datagrid.tmpl.html";
            } else {
                return tAttrs.templateUrl;
            }
        },
        scope: {
            datasource: '=', //data structure that specifies the header and rows
            lastFixedColumn: '@' //index of the last fixed column
        },
        controller: ['$scope', '$element', function ($scope, $element) {

            $scope.datasource = $scope.datasource || { rows: [], metadata: [] };
            $scope.lastFixedColumn = $scope.lastFixedColumn || 3;

            $scope.rows = $scope.datasource.rows;
            $scope.metadata = $scope.datasource.metadata;

            // Aux methods
            $scope.getColumnValue = function(row, path) {
                path = path || '';
                var fields = path.split(".");
                var columnValue = row;

                fields.forEach(function(cField){
                    columnValue = columnValue[cField];
                });

                return columnValue;
            };

        }],
        link: function ($scope, $element, attrs) {

            $scope.$fixedArea = $element.find('.container-left > .body');
            $scope.$scrollableArea = $element.find('.container-right > .body');
            $scope.$scrollableAreaHeader = $element.find('.container-right > .header-container');


            var onMousewheel = function (event) {
                var wheelDeltaY = (event.webkitDirectionInvertedFromDevice) ? event.originalEvent.wheelDelta : -event.originalEvent.wheelDelta;
                var scrollTop = $scope.$fixedArea.scrollTop() + wheelDeltaY;
                if (scrollTop > 0) {
                    $scope.$scrollableArea.scrollTop(scrollTop);
                    $scope.$fixedArea.scrollTop(scrollTop);
                }
            };

            var onScroll = (function($verticalSyncTarget, $horizontalSyncTarget) {
                return function(e) {
                    //sync both containers scrolling top and bottom
                    $verticalSyncTarget.scrollTop($(e.target).scrollTop());

                    //sync header and body in the container
                    $horizontalSyncTarget.scrollLeft($(e.target).scrollLeft());
                };
            })($scope.$fixedArea, $scope.$scrollableAreaHeader);


            $scope.$fixedArea.on('mousewheel', onMousewheel);
            $scope.$scrollableArea.on('scroll', onScroll);

            $element.on('$destroy', function() {
                $scope.$fixedArea.off(onMousewheel);
                $scope.$scrollableArea.off(onScroll);
            });
        }
    };

}]);