datagridApp.directive('fieldLessThanLimit', [function () {
    return {
        restrict: 'A',
        require: 'ngModel',

        link: function($scope, elem, attrs, ngModelController) {
            //var parsedNgModel = $parse(attrs.ngModel);
            //console.log("fieldLessThanLimit", attrs.ngModel, parsedNgModel);

            var limit = Number.parseInt(attrs.fieldLessThanLimitValue) || 100,
                fieldLessThanLimit = function(field, limit) {
                    return field < limit;
                };

            // add a parser that will process each time the value is
            // parsed into the model when the user updates it.
            ngModelController.$parsers.unshift(function(value) {
                var valid;

                if (value) {
                    valid = fieldLessThanLimit(value, limit);
                    ngModelController.$setValidity('fieldLessThanValue', valid);
                }

                // if it's valid, return the value to the model,
                // otherwise return undefined.
                return valid ? value : undefined;
            });

            ngModelController.$formatters.unshift(function(field) {

                if (field) {
                    ngModelController.$setValidity('fieldLessThanValue', fieldLessThanLimit(field, limit));
                }

                return field;
            });
        }
    };
}]);
