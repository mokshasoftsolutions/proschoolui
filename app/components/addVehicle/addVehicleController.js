angular.module('school_erp')
    .controller("addVehicleController", ['$http', '$scope','$rootScope','globalServices', 'addVehicleServices', 'ngDialog', function ($http, $scope,$rootScope, globalServices,addVehicleServices, ngDialog) {
        $scope.vehicles = [];
        $scope.data = [];
        $scope.engineType = [{ id: 'Diesel', type: 'Diesel' }, { id: 'Petrol', type: 'Petrol' }, { id: 'Gass', type: 'Gass' }]
       

        $scope.getVehicleDetails = function () {
            addVehicleServices.getVehicleDetails()
                .success(function (data, status) {
                    $scope.vehiclesList = data.vehicles;

                    $scope.vehicles = [];
                    index = 0;
                    $scope.vehiclesList.forEach(function (element) {

                        var obj = {
                            id: index++,
                            vehicle_details_id: element.vehicle_details_id,
                            vehicle_name: element.vehicle_name,
                            vehicle_number: element.vehicle_number,
                            chassis_number: element.chassis_number,
                            engine_number: element.engine_number,
                            vehicle_type: element.vehicle_type,



                        }
                        $scope.vehicles.push(obj);
                        // console.log(JSON.stringify(data));
                        // $scope.station_id = $scope.data[].station_id;
                         console.log($scope.vehicles);
                    })
                    // console.log(JSON.stringify(data))
                })
                .error(function (data, success) {
                });
        }


       




        $scope.addVehicleDetails = function (data) {
            var VehicleDetails = {
                vehicle_number: $scope.data.number,
                vehicle_name: $scope.data.name,
                chassis_number: $scope.data.chassis_no,
                engine_number: $scope.data.engine_no,
                vehicle_type: $scope.data.type,
                insurence_company_name: $scope.data.inc_name,
                number: $scope.data.insurence_no,
                valid_from: $scope.data.valid_date,
                valid_to: $scope.data.exp_date,
                amount: $scope.data.inc_amount,
                finance_company_name: $scope.data.company_name,
                finance_amount: $scope.data.amount,
                finance_from: $scope.data.from_date,
                finance_to: $scope.data.to_date,
                finance_remind: $scope.data.remind,
                date: $scope.data.date,
                emi: $scope.data.emi,
                finance_to: $scope.data.to_date,
                engine_oil: $scope.data.engine_oil,
                filled_date: $scope.data.filled_date,
                maintenence_remind: $scope.data.oil_remind,
            }
            addVehicleServices.setVehicleDetails(VehicleDetails)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Vehicle is Added Successfully.</p>',
                        plain: true
                    });
                    $scope.data = [];
                    $scope.getVehicleDetails();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }

        $scope.DeleteVehicle = function (value) {
            $scope.editdata = angular.copy($scope.vehicles[value]);
            $scope.vehicle_id = $scope.editdata.vehicle_details_id;
            // console.log($scope.vehicle_id);
            addVehicleServices.DeleteVehicle($scope.vehicle_id)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Vehicle is Deleted Successfully.</p>',
                        plain: true
                    });
                    $scope.editdata = [];
                    $scope.getVehicleDetails();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })
        }

        // $scope.editdata = angular.copy($scope.data[value]);
        $scope.EditVehicle = function (value, station) {

            // console.log("messsage");
            $scope.vehicle = angular.copy($scope.vehicles[value]);
            var VehicleDetails = {
                vehicle_name: $scope.vehicle.vehicle_name,
                vehicle_number: $scope.vehicle.vehicle_number,
                chassis_number: $scope.vehicle.chassis_number,
                engine_number: $scope.vehicle.engine_number,
                vehicle_type: $scope.vehicle.vehicle_type,
            }
            //  console.log(VehicleDetails);
            $scope.vehicle_id = $scope.vehicle.vehicle_details_id;
            // console.log($scope.vehicle_id);
            $scope.addEditVehicle(VehicleDetails, $scope.vehicle_id);
        }
        $scope.addEditVehicle = function (VehicleDetails, vehicle_id) {
            addVehicleServices.EditVehicle(VehicleDetails, vehicle_id)
                .success(function (data, status) {
                    //ngDialog.open({
                    //   template: '<p>Station is Edited Successfully.</p>',
                    //   plain: true
                    // });
                    $scope.editdata = [];
                    $scope.getVehicleDetails();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }

        $rootScope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }

        // $scope.getVehicle();
        $scope.getVehicleDetails();
    }]);   