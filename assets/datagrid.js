var datagridApp = angular.module("DatagridApp", []);;datagridApp.controller('datagridCtrl', ['$scope', function ($scope) {


    $scope.metadata = {
        'thumbnail_image': {
            header: '',
            html_template: 'img',
            path: 'sku_image'
        },
        'item_name': {
            header: 'Product Name',
            html_template: 'text',
            path: 'product_description.name',
            validation: 'present'

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
            path: 'sku.msrp'
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
            sub_path: 'time_period_end'
        }
        //'commitment_vendor_reserve': {
        //    header: 'Commitment Start',
        //    html_template: 'text',
        //    path: 'sku.cost'
        //}
    };

    $scope.displayOrder = [
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

    $scope.data = {
        order: $scope.displayOrder,
        rows: [
            {
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
                    retail: null,
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
            },
            {
                sku_image: 'https://okl.scene7.com/is/image/OKL/Product_PRV10413_Image_1?$medium$',
                okl_sku: '123456',
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
                    retail: null,
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
            }
        ]
    };


}
]);;datagridApp.directive('datagrid', [function(){
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

            $scope.datasource = $scope.datasource || { headers: [], rows: [], order: [] };
            $scope.lastFixedColumn = $scope.lastFixedColumn || 3;

            $scope.headers = $scope.datasource.headers;
            $scope.rows = $scope.datasource.rows;
            $scope.displayOrder = $scope.datasource.order;

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

}]);;datagridApp.filter('startAt', function () {
    return function (items, index) {
        return items.slice(index);
    };
});
