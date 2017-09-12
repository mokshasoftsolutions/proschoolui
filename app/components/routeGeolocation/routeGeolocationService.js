angular.module('school_erp')
.factory('routeGeoLocationServices',['$http', 'globalServices', function($http, globalServices){
    var routeGeoLocationServices = {};

    routeGeoLocationServices.getNoticeBoard = function() {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/noticeboard/SCH-9271'
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