angular.module('WebposApp').controller('InventoryController', function($rootScope, $scope, $http, $timeout, $log, Inventory, CallApi, BuildUrl) {

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();


        inventories.forEach(function(inventory) {
            Inventory.addInventory(inventory);
            Inventory.setInventorySelect(inventory);
        });


        // $log.info(Inventory); 
        $scope.inventories = Inventory.listInventory;
        // console.log($scope.invoice);

    });

    CallApi.callRestApiGet('inventories').then(function(data){
        $scope.inventories = data.data.data;
        data.data.data.forEach(function(inventory) {
            Inventory.addInventory(inventory);
            Inventory.setInventorySelect(inventory);
        });
    });

    $scope.openPopup = function(productId){
        var api1 = 'products/sales/' + productId;
        var api2 = 'products/transactions/' + productId;
        CallApi.callRestApiGet(api1).then(function(data){
            $scope.saleProduct = data.data.data[0];
            console.log($scope.saleProduct);
            $scope.listSale = data.data.data[0].ql_invoices;
        });

        CallApi.callRestApiGet(api2).then(function(data){
            $scope.nhapProduct = data.data.data[0];
            $scope.listNhap = data.data.data[0].ql_invoices;
            console.log($scope.listProduct);
        });
    };

    $scope.searchInventory = function(){
        var text = $('#searchInventory input').val();
        console.log(text);
        CallApi.callRestApiGet("inventories/filter?product_name=" + text).then(function(data){
            $scope.inventories = data.data.data;
        });
    };
});