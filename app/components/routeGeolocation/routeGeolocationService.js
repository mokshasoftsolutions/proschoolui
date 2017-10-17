angular.module('school_erp')
.factory('routeGeoLocationServices',['$http', 'globalServices', function($http, globalServices){
    var routeGeoLocationServices = {};

     routeGeoLocationServices.getGeolocation = function(vehicle_code) {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL+ 'api/get_single_tracking/'+vehicle_code
                //url: globalServices.globalValue.baseURL + 'api/getDeviceCodeDetails/'+vehicle_code
            })
        };

    
     routeGeoLocationServices.getAllGeolocations = function() {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL+ 'api/get_all_tracking'
                //url: globalServices.globalValue.baseURL + 'api/getDeviceCodeDetails/'+vehicle_code
            })
        };
    
    return routeGeoLocationServices;
    }]);  