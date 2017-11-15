angular.module('school_erp')
    .factory('BusRouteServices', ['$http', 'globalServices', function ($http, globalServices) {
        var BusRouteServices = {};

        BusRouteServices.getBusRoute = function () {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/bus_route_title/'+globalServices.globalValue.school_id
            })
        };
        BusRouteServices.setBusRoute = function (dataValue) {
            console.log(dataValue);
            return $http({
                method: 'POST',
                
                url: globalServices.globalValue.baseURL + 'api/bus_route_title/'+globalServices.globalValue.school_id+'/',
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };

          BusRouteServices.getBusRouteToStation = function (routeId) {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/addorupdatestationstobusroute/'+routeId
            })
        };
        // api service changed   routeId, stationId
        BusRouteServices.setBusRouteToStation = function (dataValue,routeId) {
            console.log(dataValue);
            return $http({
                method: 'POST',
                
                url: globalServices.globalValue.baseURL + 'api/addorupdatestationstobusroute/'+routeId,
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };

        BusRouteServices.getTime = function (routeId, stationId) {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/station_to_bus_route/' + routeId + '/' + stationId,
            })
        };


        BusRouteServices.setTime = function (dataValue, routeId, stationId) {
            console.log(dataValue);
            return $http({
                method: 'POST',
                url: globalServices.globalValue.baseURL + 'api/station_to_bus_route/' + routeId + '/' + stationId,
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };


        BusRouteServices.EditBusRoute = function (dataValue, busRoute_id) {
            console.log(dataValue);
            return $http({
                method: 'PUT',
                url: globalServices.globalValue.baseURL + 'api/edit_bus_route_title/' + busRoute_id,

                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };
        BusRouteServices.DeleteBusRoute = function (busRoute_id) {
            return $http({
                method: 'DELETE',
                url: globalServices.globalValue.baseURL + 'api/delete_bus_route_title/' + busRoute_id
            })
        }
         BusRouteServices.EditBusRouteToStation = function (dataValue, busRoute_id,station) {
            console.log(dataValue);
            return $http({
                method: 'PUT',
                url: globalServices.globalValue.baseURL + 'api/edit_bus_route_station/' + busRoute_id+'/'+station,

                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };
        BusRouteServices.DeleteBusRouteToStation = function (busRoute_id,station) {
            return $http({
                method: 'PUT',
                url: globalServices.globalValue.baseURL + 'api/delete_bus_route_station/' + busRoute_id+ '/'+station
            })
        }

        return BusRouteServices;
    }]);  