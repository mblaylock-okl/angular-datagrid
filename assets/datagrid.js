var datagridApp = angular.module("DatagridApp", []);;datagridApp.directive('datagridCell', ['$timeout', '$compile', function ($timeout, $compile) {
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

}]);;datagridApp.directive('datagridContainer', ['$timeout', function($timeout) {

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
}]);;datagridApp.controller('datagridCtrl', ['$scope', function ($scope) {


    $scope.metadata = {
        'thumbnail_image': {
            editable: true,
            header: '',
            html_template: 'img',
            path: 'sku_image'
        },
        'item_name': {
            header: 'Product Name',
            html_template: 'text',
            path: 'product_description.name',
        },
        'vendor_name': {
            header: 'Vendor',
            html_template: 'text',
            path: 'vendor.name'
        },
        'okl_sku': {
            header: 'OKL SKU',
            html_template: 'text',
            path: 'okl_sku'
        },
        'vendor_sku': {
            header: 'Vendor SKU',
            html_template: 'text',
            path: 'sku.vendor_sku'
        },
        'last_updated_sku_date': {
            header: 'SKU Updated Date',
            html_template: 'text'
        },
        'last_updated_sku_by': {
            header: 'SKU Updated By',
            html_template: 'text'
        },
        'last_updated_commitment_date': {
            header: 'Commitments Updated Date',
            html_template: 'text'
        },
        'last_updated_commitment_by': {
            header: 'Commitments Updated By',
            html_template: 'text'
        },
        'original_wholesale': {
            header: 'Original Wholesale',
            html_template: 'text',
            path: 'sku.wholesale'
        },
        'original_msrp': {
            header: 'MSRP',
            html_template: 'text',
            path: 'sku.retail',
            validations: {
                'field-less-than-limit' : {
                    'value': 10
                }
            },
            editable: true
        },
        'okl_cost': {
            header: 'OKL Cost',
            html_template: 'text',
            path: 'sku.cost'
        },
        'commitment_start': {
            header: 'Commitment Start',
            html_template: 'list',
            path: 'inv_commitments',
            sub_html_template: 'text',
            sub_path: 'time_period_start'
        },
        'commitment_end': {
            header: 'Commitment End',
            html_template: 'list',
            path: 'inv_commitments',
            sub_html_template: 'text',
            sub_path: 'time_period_end',
        }
        //'commitment_vendor_reserve': {
        //    header: 'Commitment Start',
        //    html_template: 'text',
        //    path: 'sku.cost'
        //}
    };

    $scope.metadataOrdered = [
        $scope.metadata.thumbnail_image,
        $scope.metadata.item_name,
        $scope.metadata.vendor_name,
        $scope.metadata.okl_sku,
        $scope.metadata.vendor_sku,
        $scope.metadata.last_updated_sku_date,
        $scope.metadata.last_updated_sku_by,
        $scope.metadata.last_updated_commitment_date,
        $scope.metadata.last_updated_commitment_by,
        $scope.metadata.original_wholesale,
        $scope.metadata.original_msrp,
        $scope.metadata.okl_cost,
        $scope.metadata.commitment_start,
        $scope.metadata.commitment_end
    ];

    $scope.skuExampleReformat = {
        'sku_image': 'https://okl.scene7.com/is/image/OKL/Product_PRV10413_Image_1?$medium$',
        'okl_sku': '12345',
        'sku_shipping.is_white_glove': true,
        'sku_shipping.is_free_shipping': false,
        'sku_shipping.is_virtual_delivery': false,
        'sku_shipping.is_ormd': true,
        'sku_shipping.is_ship_as_is': true,
        'sku_shipping.is_returnable': false,
        'sku_shipping.is_perishable': false,
        'sku_shipping.is_non_merchandise': false,
        'sku_shipping.estimated_shipping_cost': 12.50,
        'sku.is_vintage': true,
        'sku.non_taxable': false,
        'sku.vendor_sku': '12345',
        'sku.wholesale': null,
        'sku.retail': 100,
        'sku.cost': 13.50,
        'sku.price': 27.99,
        'sku.unit_of_measure': 1,
        'sku.is_non_taxable': false,
        'sku.modified_date': '2014-12-01',
        'sku.modified_by': null,
        'vendor_payment.lead_payment': null,
        'vendor.name': 'acme',
        'vendor_address.address1': 'twotwotwain st.',
        'vendor_address.address2': null,
        'vendor_address.city': 'oakland',
        'vendor_address.state': 'ca',
        'vendor_address.zip': '94105',
        'product_shipping.lead_time': null,
        'product_description.name': 'The couch',

        'inv_ats.sell_multiple': 1,
        'inv_ats.whs_avai_qty': 1,
        'inv_ats.erp_phys_avail': 1,
        'inv_ats.imp_ats': 1,

        'inv_commitments': [
            {
                id: 1,
                time_period_start: '2014-12-01T00:00:00',
                time_period_end: '2014-12-01T12:01:01',
                update_at: '2014-12-01T05:01:01',
                last_updated_user_id: 12,
                ship_method: 'fast'
            },
            {
                id: 2,
                time_period_start: '2014-12-11T00:00:00',
                time_period_end: '2014-12-11T12:01:01',
                update_at: '2014-12-01T15:01:01',
                last_updated_user_id: 12,
                ship_method: 'fast'
            }
        ]
    };

    $scope.skuExample = {
        sku_image: 'https://okl.scene7.com/is/image/OKL/Product_PRV10413_Image_1?$medium$',
        okl_sku: '12345',
        sku_shipping: {
            is_white_glove: true,
            is_free_shipping: false,
            is_virtual_delivery: false,
            is_ormd: true,
            is_ship_as_is: true,
            is_returnable: false,
            is_perishable: false,
            is_non_merchandise: false,
            estimated_shipping_cost: 12.50
        },
        sku: {
            is_vintage: true,
            non_taxable: false,
            vendor_sku: '12345',
            wholesale: null,
            retail: 50,
            cost: 13.50,
            price: 27.99,
            unit_of_measure: 1,
            is_non_taxable: false,
            modified_date: '2014-12-01',
            modified_by: null
        },
        vendor_payment: {
            lead_time: null
        },
        vendor: {
            name: 'acme'
        },
        vendor_address: {
            address1: 'twotwotwain st.',
            address2: null,
            city: 'oakland',
            state: 'ca',
            zip: '94105',
        },
        product_shipping: {
            lead_time: null
        },
        product_description: {
            name: 'The couch'
        },
        inv_ats: {
            sell_multiple: 1,
            whs_avai_qty: 1,
            erp_phys_avail: 1,
            imp_ats: 1
        },
        inv_commitments: [
            {
                id: 1,
                time_period_start: '2014-12-01T00:00:00',
                time_period_end: '2014-12-01T12:01:01',
                update_at: '2014-12-01T05:01:01',
                last_updated_user_id: 12,
                ship_method: 'fast'
            },
            {
                id: 2,
                time_period_start: '2014-12-11T00:00:00',
                time_period_end: '2014-12-11T12:01:01',
                update_at: '2014-12-01T15:01:01',
                last_updated_user_id: 12,
                ship_method: 'fast'
            }
        ]
    };

    $scope.data = {
        metadata: $scope.metadataOrdered,
        rows: [
            angular.copy($scope.skuExampleReformat),
            angular.copy($scope.skuExampleReformat),
            angular.copy($scope.skuExampleReformat),
            angular.copy($scope.skuExampleReformat),
            angular.copy($scope.skuExampleReformat),
            angular.copy($scope.skuExampleReformat),
            angular.copy($scope.skuExampleReformat),
            angular.copy($scope.skuExampleReformat),
            angular.copy($scope.skuExampleReformat),
            angular.copy($scope.skuExampleReformat),
            angular.copy($scope.skuExampleReformat),
            angular.copy($scope.skuExampleReformat),
            angular.copy($scope.skuExampleReformat)
        ]
    };


}
]);;datagridApp.directive('datagrid', ['$timeout', '$q', function($timeout, $q) {
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

            //console.log("metadata=", $scope.metadata);
            $scope.metadataFixed = $scope.metadata.slice(0, $scope.lastFixedColumn);
            //console.log("metadataFixed=", $scope.metadataFixed);
            $scope.metadataScrollable = $scope.metadata.slice($scope.lastFixedColumn);
            //console.log("metadataScrollable=", $scope.metadataScrollable);


            //Async load of the inner directives
            var q1 = $q.defer(),
                q2 = $q.defer();



            $scope.onLoadFixedArea = function() {
                return q1.resolve();
            };

            $scope.onLoadScrollableArea = function() {
                return q2.resolve();
            };

            $q.all([q1.promise, q2.promise]).then(function(result){
                console.log("all promises good!", result);
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

}]);;datagridApp.directive('fieldLessThanLimit', [function () {
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
;datagridApp.filter('startAt', function () {
    return function (items, index) {
        return items.slice(index);
    };
});
