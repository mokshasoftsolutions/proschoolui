angular.module('school_erp')
    .controller("BusRouteController", ['$http', '$scope', 'BusRouteServices', 'ngDialog', 'addStationServices', 'globalServices', 'addVehicleServices', function ($http, $scope, BusRouteServices, ngDialog, addStationServices, globalServices, addVehicleServices) {
        $scope.data = [];

        addVehicleServices.getVehicle()
            .success(function (data, status) {

                console.log(JSON.stringify(data));
                $scope.vehicles = data.vehicles;
                $scope.vehicle_id = data.vehicles[0].vehicle_id;
                //$scope.vehicle_code=data.vehicles[0].vehicle_code;
            })
            .error(function (data, success) {
            });



        $scope.getBusRoute = function () {
            //console.log(vehicle_code);
            BusRouteServices.getBusRoute()
                .success(function (data, status) {
                    console.log(JSON.stringify(data));
                    $scope.busRoutes = data.Bus_Route;

                    $scope.routeId = $scope.busRoutes[0].bus_route_id;
<<<<<<< HEAD
                    $scope.getBusRouteToStation($scope.routeId);
=======
>>>>>>> 3063d8978d8eca3b5913af595172c0022cb6e366
                })
                .error(function (data, success) {
                })
        }

        $scope.addBusRoute = function (data) {
            // $scope.vehicle_code = $scope.data.vehicle_code;
            // console.log($scope.vehicle_code);
            var BusRoutDetails = {
                route_title: $scope.data.route_title,
                vehicle_code: $scope.data.vehicle_code,

                // station_name: $scope.data.station,
                // pickup_time: $scope.data.pickup_time,
                // drop_time: $scope.data.drop_time
            }
            // $scope.vehicle_code = BusRoutDetails.vehicle_code;
            // console.log($scope.vehicle_code);
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



        // $scope.addTime = function (data) {
        //     var TimeDetails = {
        //         pickup_time: $scope.data.pickup_time,
        //         dropping_time: $scope.data.dropping_time
        //     }


        //     BusRouteServices.setTime(TimeDetails, $scope.routeId, $scope.stationId)
        //         .success(function (data, status) {
        //             ngDialog.open({
        //                 template: '<p> BusRoutes are Added Successfully.</p>',
        //                 plain: true
        //             });
        //             $scope.data = [];
        //             $scope.getBusRoute();
        //         })
        //         .error(function (data, success) {
        //             ngDialog.open({
        //                 template: '<p>Some Error Occured!</p>',
        //                 plain: true
        //             });
        //         })

        // }

        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }




        $scope.DeleteBusRoute = function (value) {
            $scope.editdata = angular.copy($scope.busRoutes[value]);
            $scope.busRoute_id = $scope.editdata.bus_route_id;
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
                vehicle_code: $scope.busRoute.vehicle_code,

                // station: $scope.busRoute.station,
                // pickup_time: $scope.busRoute.pickup_time,
                // drop_time: $scope.busRoute.drop_time
            }
            console.log(BusRoutDetails);
            $scope.busRoute_id = $scope.busRoute.bus_route_id;
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
        $scope.getBusRouteToStation = function (routeId) {
            //console.log(vehicle_code);
<<<<<<< HEAD
            // var arrLabels = new Array();
            $scope.busRoutesToStation = [];
            BusRouteServices.getBusRouteToStation(routeId)
                .success(function (data, status) {
                    console.log(JSON.stringify(data));

=======
           // var arrLabels = new Array();
           $scope.busRoutesToStation=[];
            BusRouteServices.getBusRouteToStation(routeId)
                .success(function (data, status) {
                    console.log(JSON.stringify(data));
                   
>>>>>>> 3063d8978d8eca3b5913af595172c0022cb6e366
                    $scope.busRoutesToStation = data.bus_routes;
                    console.log("message....");
                    console.log($scope.busRoutesToStation);


<<<<<<< HEAD
                    //     $scope.stationList = [];
                    //    //

                    //     $scope.busRoutesToStation.forEach(function (item) {
                    //         // $scope.stations = item.stations;
                    //         $scope.stationList.push(item.stations);

                    //     })
                    //     console.log($scope.stationList);
                  //  $scope.routeId = $scope.busRoutes[0].route_id;
=======
                //     $scope.stationList = [];
                //    //
                   
                //     $scope.busRoutesToStation.forEach(function (item) {
                //         // $scope.stations = item.stations;
                //         $scope.stationList.push(item.stations);

                //     })
                //     console.log($scope.stationList);
                    $scope.routeId = $scope.busRoutes[0].route_id;
>>>>>>> 3063d8978d8eca3b5913af595172c0022cb6e366
                })
                .error(function (data, success) {
                })
        }


        $scope.addBusRouteToStation = function (data) {
            $scope.routeId = $scope.data.route_title;
            console.log($scope.routeId)
            var BusRoutDetails = {
                //route_id: $scope.data.route_title,
                // vehicle_code: $scope.data.vehicle_code,

                station_name: $scope.data.station,
                pickup_time: $scope.data.pickup_time,
                drop_time: $scope.data.drop_time
            }
            // $scope.vehicle_code = BusRoutDetails.vehicle_code;
            // console.log($scope.vehicle_code);
            //service changed   $scope.routeId, $scope.stationId
            BusRouteServices.setBusRouteToStation(BusRoutDetails, $scope.routeId)
                .success(function (data, status) {

                    if (data == false || data=='false') {
                        ngDialog.open({
                            template: '<p>Station is Already Added</p>',
                            plain: true
                        });
                    }
                    else {
                        ngDialog.open({
                            template: '<p>Stations are Added Successfully.</p>',
                            plain: true
                        });
                    }
                    $scope.data = [];
                    $scope.getBusRouteToStation($scope.routeId);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }

        $scope.DeleteBusRouteToStation = function (value,station_name) {
            $scope.editdata = angular.copy($scope.busRoutesToStation[value]);
            $scope.busRoute_id = $scope.editdata.bus_route_id;
            console.log($scope.busRoute_id);
            BusRouteServices.DeleteBusRouteToStation($scope.busRoute_id,station_name)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Station is Deleted Successfully.</p>',
                        plain: true
                    });
                    $scope.editdata = [];
<<<<<<< HEAD
                    //$scope.getBusRoute();
=======
                    $scope.getBusRoute();
>>>>>>> 3063d8978d8eca3b5913af595172c0022cb6e366
                    $scope.getBusRouteToStation($scope.routeId);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })
        }

        // $scope.editdata = angular.copy($scope.data[value]);
        $scope.EditBusRouteToStation = function (value, busRoutes) {

            console.log("messsage");
            $scope.busRoutes = angular.copy($scope.busRoutesToStation[value]);
            var BusRoutDetails = {
                station: $scope.busRoutes.station_name,
                pickup_time: $scope.busRoutes.pickup_time,
                drop_time: $scope.busRoutes.drop_time
            }
            console.log(BusRoutDetails);
            $scope.busRoute_id = $scope.busRoutes.bus_route_id;
            console.log($scope.busRoute_id);
            $scope.stations_name=$scope.busRoutes.station_name;
            $scope.addEditBusRouteToStation(BusRoutDetails, $scope.busRoute_id, $scope.stations_name);
        }
        $scope.addEditBusRouteToStation = function (BusRoutDetails, busRoute_id,station_name) {
            BusRouteServices.EditBusRouteToStation(BusRoutDetails, busRoute_id,station_name)
                .success(function (data, status) {
                    // ngDialog.open({
                    //     template: '<p>Station is Edited Successfully.</p>',
                    //     plain: true
                    // });
                    $scope.editdata = [];
                    $scope.getBusRoute();
                    $scope.getBusRouteToStation($scope.routeId);
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

        $scope.getBusRoute();
        $scope.getStation();


<<<<<<< HEAD
        
=======
        $scope.getBusRouteToStation($scope.routeId);
>>>>>>> 3063d8978d8eca3b5913af595172c0022cb6e366
    }])

