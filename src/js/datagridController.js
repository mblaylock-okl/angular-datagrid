datagridApp.controller('datagridCtrl', ['$scope', function ($scope) {


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
            path: 'product_description___name'
        },
        'vendor_name': {
            header: 'Vendor',
            html_template: 'text',
            path: 'vendor___name'
        },
        'okl_sku': {
            header: 'OKL SKU',
            html_template: 'text',
            path: 'okl_sku'
        },
        'vendor_sku': {
            header: 'Vendor SKU',
            html_template: 'text',
            path: 'sku___vendor_sku'
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
            path: 'sku___wholesale'
        },
        'original_msrp': {
            header: 'MSRP',
            html_template: 'text',
            path: 'sku___retail',
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
            sub_path: 'time_period_end'
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
        'sku_shipping___is_white_glove': true,
        'sku_shipping___is_free_shipping': false,
        'sku_shipping___is_virtual_delivery': false,
        'sku_shipping___is_ormd': true,
        'sku_shipping___is_ship_as_is': true,
        'sku_shipping___is_returnable': false,
        'sku_shipping___is_perishable': false,
        'sku_shipping___is_non_merchandise': false,
        'sku_shipping.estimated_shipping_cost': 12.50,
        'sku___is_vintage': true,
        'sku___non_taxable': false,
        'sku___vendor_sku': '12345',
        'sku___wholesale': null,
        'sku___retail': 100,
        'sku___cost': 13.50,
        'sku___price': 27.99,
        'sku___unit_of_measure': 1,
        'sku___is_non_taxable': false,
        'sku___modified_date': '2014-12-01',
        'sku___modified_by': null,
        'vendor_payment___lead_payment': null,
        'vendor___name': 'acme',
        'vendor_address___address1': 'twotwotwain st.',
        'vendor_address___address2': null,
        'vendor_address___city': 'oakland',
        'vendor_address___state': 'ca',
        'vendor_address___zip': '94105',
        'product_shipping___lead_time': null,
        'product_description___name': 'The couch',

        'inv_ats___sell_multiple': 1,
        'inv_ats___whs_avai_qty': 1,
        'inv_ats___erp_phys_avail': 1,
        'inv_ats___imp_ats': 1,

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
]);