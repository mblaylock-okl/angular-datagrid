datagridApp.directive('datagrid', ['$timeout', '$q', function($timeout, $q) {
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
            $scope.lastFixedColumn = $scope.lastFixedColumn || 2;

            $scope.rows = $scope.datasource.rows;
            $scope.metadata = $scope.datasource.metadata;

            $scope.metadataFixed = $scope.metadata.slice(0, $scope.lastFixedColumn);
            $scope.metadataScrollable = $scope.metadata.slice($scope.lastFixedColumn);

            //Async load of the inner directives because we are using urlTemplates
            //Only when both areas are loaded we can add event listeners
            var q1 = $q.defer(),
                q2 = $q.defer();

            $scope.onLoadFixedArea = function() {
                return q1.resolve();
            };

            $scope.onLoadScrollableArea = function() {
                return q2.resolve();
            };

            $q.all([q1.promise, q2.promise]).then(function(){
                $scope.initializeDOM();
            });

        }],
        link: function ($scope, $element) {

            var onMousewheel = function ($fixedArea, $scrollableArea) {
                return function (event) {
                    var wheelDeltaY = (event.webkitDirectionInvertedFromDevice) ? event.originalEvent.wheelDelta : -event.originalEvent.wheelDelta;
                    var scrollTop = $fixedArea.scrollTop() + wheelDeltaY;
                    if (scrollTop > 0) {
                        $scrollableArea.scrollTop(scrollTop);
                        $fixedArea.scrollTop(scrollTop);
                    }
                };
            };

            var onScroll = function($fixedArea, $scrollableAreaHeader) {
                return function(e) {
                    //sync both containers scrolling top and bottom
                    $fixedArea.scrollTop($(e.target).scrollTop());

                    //sync header and body in the container
                    $scrollableAreaHeader.scrollLeft($(e.target).scrollLeft());
                };
            };

            $scope.initializeDOM = function() {
                console.log("datagrid directive", $element.find('.container-fixed > .body').length);
                $scope.$fixedArea = $element.find('.container-fixed > .body');
                $scope.$scrollableArea = $element.find('.container-scrollable > .body');
                $scope.$scrollableAreaHeader = $element.find('.container-scrollable > .header-container');

                $scope.$fixedArea.on('mousewheel', onMousewheel($scope.$fixedArea, $scope.$scrollableArea));
                $scope.$scrollableArea.on('scroll', onScroll($scope.$fixedArea, $scope.$scrollableAreaHeader));
            };

            $scope.$watch(function () {
                return $scope.$fixedArea && $scope.$fixedArea.width();
            }, function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    $scope.fixedAreaWidth = {left: newValue + 'px'};
                }
            });

            // clear the event listeners
            $element.on('$destroy', function() {
                $scope.$fixedArea.off(onMousewheel);
                $scope.$scrollableArea.off(onScroll);
            });
        }
    };

}]);