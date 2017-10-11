angular.module('school_erp')
.factory('routeGeoLocationServices',['$http', 'globalServices', function($http, globalServices){
    var routeGeoLocationServices = {};

     routeGeoLocationServices.getGeolocation = function(vehicle_code) {
            return $http({
                method: 'GET',
                url: "http://192.168.1.4:2016/api/netcomp/getDeviceCodeDetails/"+vehicle_code
                //url: globalServices.globalValue.baseURL + 'api/getDeviceCodeDetails/'+vehicle_code
            })
        };

    
     routeGeoLocationServices.getAllGeolocations = function(vehicle_code) {
            return $http({
                method: 'GET',
                url: "http://192.168.1.4:2016/api/netcomp/getDeviceCodeDetails/"+vehicle_code
                //url: globalServices.globalValue.baseURL + 'api/getDeviceCodeDetails/'+vehicle_code
            })
        };
    
    return routeGeoLocationServices;
    }]);  