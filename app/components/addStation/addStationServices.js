
angular.module('school_erp')
.factory('addStationServices',['$http', 'globalServices', function($http, globalServices){
    var addStationServices = {};

    addStationServices.getStation = function(){
        return $http({
                    method: 'GET',
                    url: globalServices.globalValue.baseURL + 'api/transport_stations/'+globalServices.globalValue.school_id
                })
    };

     addStationServices.setStation = function(dataValue){
         console.log(dataValue);
        return $http({
                    method: 'POST',
                    url: globalServices.globalValue.baseURL + 'api/transport_stations/'+globalServices.globalValue.school_id,
                    data: $.param(dataValue),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                })
      };

    addStationServices.EditStation = function(dataValue,station_id){
            console.log(dataValue);
            return $http({
                        method: 'PUT',
                        url: globalServices.globalValue.baseURL + 'api/edit_station/'+station_id,
                         //url: 'http://192.168.1.10:4005/api/edit_station/STN-1',
                        data: $.param(dataValue),
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                    })
        };
         addStationServices.DeleteStation = function(station_id){
           return $http({
                    method: 'DELETE',
                    url: globalServices.globalValue.baseURL + 'api/delete_station/'+station_id
                })
         }
       return addStationServices;
    }]);  