angular.module('school_erp')
    .controller("addStationController", ['$http', '$scope', '$rootScope', 'addStationServices', 'ngDialog', function ($http, $scope, $rootScope, addStationServices, ngDialog) {
        $scope.data = [];

        $scope.getStation = function () {
            addStationServices.getStation()
                .success(function (data, status) {
                    $scope.data = data.stations;
                    // console.log(JSON.stringify(data));
                    // $scope.station_id = $scope.data[].station_id;
                    // console.log($scope.station_id);

                })
                .error(function (data, success) {
                });
        }

        $scope.addStation = function (data) {
            var StationDetails = {
                station_name: $scope.data.station_name,
                station_code: $scope.data.station_code,
                station_geo_location: $scope.data.station_geo_location
            }
            addStationServices.setStation(StationDetails)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Station is Added Successfully.</p>',
                        plain: true
                    });
                    $scope.data = [];
                    $scope.getStation();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }
        // $scope.EditStation = function (value) {
        //     $rootScope.editdata = angular.copy($scope.data[value]);
        // }


        $scope.DeleteStation = function (value) {
            $scope.editdata = angular.copy($scope.data[value]);
            $scope.station_id = $scope.editdata.station_id;
            console.log($scope.station_id);
            addStationServices.DeleteStation($scope.station_id)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Station is Deleted Successfully.</p>',
                        plain: true
                    });
                    $scope.editdata = [];
                    $scope.getStation();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })
        }

        // $scope.editdata = angular.copy($scope.data[value]);
        $scope.EditStation = function (value,station) {

            console.log("messsage");
            $scope.station = angular.copy($scope.data[value]);
            var StationDetails = {
                station_name: $scope.station.station_name,
                station_code: $scope.station.station_code,
                station_geo_location: $scope.station.station_geo_location
            }
            console.log(StationDetails);
            $scope.station_id = $scope.station.station_id;
            console.log($scope.station_id);
            $scope.addEditStation(StationDetails ,$scope.station_id);
        }
        $scope.addEditStation = function (StationDetails ,station_id) {
            addStationServices.EditStation(StationDetails, station_id)
                .success(function (data, status) {
                    // ngDialog.open({
                    //     template: '<p>Station is Edited Successfully.</p>',
                    //     plain: true
                    // });
                    $scope.editdata = [];
                    $scope.getStation();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }

        $scope.getStation();


        // editableOptions.theme = 'bs3';
        // editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
        // editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';

    }])

