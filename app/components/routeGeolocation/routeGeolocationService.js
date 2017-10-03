angular.module('school_erp')
.factory('routeGeoLocationServices',['$http', 'globalServices', function($http, globalServices){
    var routeGeoLocationServices = {};

     routeGeoLocationServices.getGeolocation = function(vehicle_code) {
            return $http({
                method: 'GET',
                url: "http://192.168.1.4:2016/api/netcomp/getAllDevicesDetails"+vehicle_code
                //url: globalServices.globalValue.baseURL + 'api/noticeboard/SCH-9271'
            })
        };

    routeGeoLocationServices.setNoticeBoard = function(dataValue) {
            console.log(dataValue);
            return $http({
                method: 'POST',
                url: globalServices.globalValue.baseURL + 'api/noticeboard/SCH-9271',
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
    };   
    return routeGeoLocationServices;
    }]);  