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
        },
        controller: ['$scope', '$element', function ($scope, $element) {


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