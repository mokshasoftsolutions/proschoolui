angular.module('school_erp')
.controller("addVehicleController",['$http','$scope','addVehicleServices','ngDialog', function($http, $scope, addVehicleServices, ngDialog){
        $scope.vehicles = [];
        $scope.data = [];
        $scope.getVehicle = function(){
        addVehicleServices.getVehicle()
        .success(function(data, status){
            $scope.vehicles = data.vehicles;
           console.log(JSON.stringify(data))
        })
        .error(function(data,success){
        });
    }

           $scope.addVehicle= function(data){
            var VehicleDetails ={
                vehicle_code:$scope.data.vehicle_code,
                vehicle_name:$scope.data.vehicle_name,
            }
            addVehicleServices.setVehicle(VehicleDetails)   
            .success(function(data, status){
                ngDialog.open({
                template: '<p>Vehicle is Added Successfully.</p>',
                plain: true
                });
                $scope.data = [];
                $scope.getVehicle();
            })
            .error(function(data,success){
                ngDialog.open({
                template: '<p>Some Error Occured!</p>',
                plain: true
                });
            })
           
        }

        $scope.DeleteVehicle = function (value) {
            $scope.editdata = angular.copy($scope.vehicles[value]);
            $scope.vehicle_id = $scope.editdata.vehicle_id;
            console.log($scope.vehicle_id);
            addVehicleServices.DeleteVehicle($scope.vehicle_id)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Vehicle is Deleted Successfully.</p>',
                        plain: true
                    });
                    $scope.editdata = [];
                    $scope.getVehicle();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })
        }

        // $scope.editdata = angular.copy($scope.data[value]);
        $scope.EditVehicle = function (value,station) {

            console.log("messsage");
            $scope.vehicle = angular.copy($scope.vehicles[value]);
            var VehicleDetails = {
                vehicle_name: $scope.vehicle.vehicle_name,
                vehicle_code: $scope.vehicle.vehicle_code,
            }
            console.log(VehicleDetails);
            $scope.vehicle_id = $scope.vehicle.vehicle_id;
            console.log($scope.vehicle_id);
            $scope.addEditVehicle(VehicleDetails ,$scope.vehicle_id);
        }
        $scope.addEditVehicle = function (VehicleDetails ,vehicle_id) {
            addVehicleServices.EditVehicle(VehicleDetails, vehicle_id)
                .success(function (data, status) {
                    //ngDialog.open({
                    //   template: '<p>Station is Edited Successfully.</p>',
                    //   plain: true
                    // });
                    $scope.editdata = [];
                    $scope.getVehicle();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }



        $scope.getVehicle();
}]);   