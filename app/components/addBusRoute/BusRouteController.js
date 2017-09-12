angular.module('school_erp')
    .controller("BusRouteController", ['$http', '$scope', 'BusRouteServices', 'ngDialog', 'addStationServices', 'globalServices', 'addVehicleServices', function ($http, $scope, BusRouteServices, ngDialog, addStationServices, globalServices, addVehicleServices) {
        $scope.data = [];
        $scope.getBusRoute = function () {
            BusRouteServices.getBusRoute()
                .success(function (data, status) {
                    console.log(JSON.stringify(data));
                    $scope.busRoutes = data.bus_routes;
                    $scope.routeId = $scope.busRoutes[0].route_id;
                })
                .error(function (data, success) {
                })
        }
        $scope.getStation = function () {


            addStationServices.getStation()
                .success(function (data, status) {
                    console.log(JSON.stringify(data));
                    $scope.stations = data.stations;
                    $scope.stationId = data.stations[0].station_id;
                    // $scope.station_name=$scope.stations[0].station_name;
                    // console.log($scope.station_name);

                    //  $scope.stationId = $scope.stations[0].station_id;
                })
                .error(function (data, success) {
                });

        }
        $scope.addBusRoute = function (data) {
            var BusRoutDetails = {
                route_title: $scope.data.route_title,
                vehicle_code: $scope.data.vehicle_code,

                station: $scope.data.station,
                pickup_time: $scope.data.pickup_time,
                drop_time: $scope.data.drop_time
            }
            //service changed   $scope.routeId, $scope.stationId
            BusRouteServices.setBusRoute(BusRoutDetails)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Stations are Added Successfully.</p>',
                        plain: true
                    });
                    $scope.data = [];
                    $scope.getBusRoute();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }

        // $scope.conformDelete= function(){
        //      ngDialog.open({
        //                 template: '<p>Are you sure you want to delete this item?</p>',
        //                 plain: true
        //             });

        // }



        $scope.addTime = function (data) {
            var TimeDetails = {
                pickup_time: $scope.data.pickup_time,
                dropping_time: $scope.data.dropping_time
            }

            
            BusRouteServices.setTime(TimeDetails, $scope.routeId, $scope.stationId)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p> BusRoutes are Added Successfully.</p>',
                        plain: true
                    });
                    $scope.data = [];
                    $scope.getBusRoute();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }

        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }


        addVehicleServices.getVehicle()
            .success(function (data, status) {

                console.log(JSON.stringify(data));
                $scope.vehicles = data.vehicles;
                $scope.vehicle_id = data.vehicles[0].vehicle_id;
            })
            .error(function (data, success) {
            });


        $scope.DeleteBusRoute = function (value) {
            $scope.editdata = angular.copy($scope.busRoutes[value]);
            $scope.busRoute_id = $scope.editdata.route_id;
            console.log($scope.busRoute_id);
            BusRouteServices.DeleteBusRoute($scope.busRoute_id)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Station is Deleted Successfully.</p>',
                        plain: true
                    });
                    $scope.editdata = [];
                    $scope.getBusRoute();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })
        }

        // $scope.editdata = angular.copy($scope.data[value]);
        $scope.EditBusRoute = function (value, busRoute) {

            console.log("messsage");
            $scope.busRoute = angular.copy($scope.busRoutes[value]);
            var BusRoutDetails = {
                route_title: $scope.busRoute.route_title,
                vehicle_name: $scope.busRoute.vehicle_name,

                station: $scope.busRoute.station,
                pickup_time: $scope.busRoute.pickup_time,
                drop_time: $scope.busRoute.drop_time
            }
            console.log(BusRoutDetails);
            $scope.busRoute_id = $scope.busRoute.route_id;
            console.log($scope.busRoute_id);
            $scope.addEditBusRoute(BusRoutDetails, $scope.busRoute_id);
        }
        $scope.addEditBusRoute = function (BusRoutDetails, busRoute_id) {
            BusRouteServices.EditBusRoute(BusRoutDetails, busRoute_id)
                .success(function (data, status) {
                    // ngDialog.open({
                    //     template: '<p>Station is Edited Successfully.</p>',
                    //     plain: true
                    // });
                    $scope.editdata = [];
                    $scope.getBusRoute();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }


        // addStationServices.getStation()
        // .success(function(data, status){
        //     $scope.data = data.stations;
        // })
        // .error(function(data,success){
        // });
        $scope.getStation();

        $scope.getBusRoute();
    }])

