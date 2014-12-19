datagridApp.directive('datagridCell', ['$timeout', '$compile', function ($timeout, $compile) {
    return {
        restrict: "EA",
        replace: true,
        templateUrl: function (tElement, tAttrs) {
            if (tAttrs.templateUrl === undefined) {
                return "template/datagridCell.tmpl.html";
            } else {
                return tAttrs.templateUrl;
            }
        },
        scope: {
            metadata: '=', // row metadata
            datasource: '=' // data structure that represents one row
        },
        controller: ['$scope', '$element', function ($scope, $element) {
            $scope.addValidations = function ($ngModelElem) {
                var validations = getValidations(),
                    validationName, validationNameDOMAttribute, validationParameters, validationParameter, validationParameterDOMAttribute;
                for (validationName in validations) {
                    validationNameDOMAttribute = "data-" + validationName;
                    $ngModelElem[0].setAttribute(validationNameDOMAttribute, true);

                    validationParameters = validations[validationName];
                    for (validationParameter in validationParameters) {
                        validationParameterDOMAttribute = validationNameDOMAttribute + "-" + validationParameter;
                        $ngModelElem[0].setAttribute(validationParameterDOMAttribute, validationParameters[validationParameter]);
                    }
                }
            };

            //aux
            function getValidations() {
                return $scope.metadata.validations || {};
            }

        }],
        link: function ($scope, $element, attrs) {
            var $ngModel;

            $timeout(function() {
                $ngModel = $element.find('[ng-model]');
                $scope.addValidations($ngModel);
                $compile(angular.element($ngModel[0]))($scope);
            });

            $element.on('$destroy', function() {
            });
        }
    };

}]);