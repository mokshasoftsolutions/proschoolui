angular.module('school_erp')
.factory('schoolEventsServices',['$http', 'globalServices', function($http, globalServices){
    var schoolEventsServices = {};

    schoolEventsServices.getEvents = function(){
        return $http({
                    method: 'GET',
                    url: globalServices.globalValue.baseURL + 'api/schoolevents/'+globalServices.globalValue.school_id
                })
    };

     schoolEventsServices.setEvents = function(dataValue){
         console.log(dataValue);
        return $http({
                    method: 'POST',
                    url: globalServices.globalValue.baseURL + 'api/schoolevents/'+globalServices.globalValue.school_id,
                    data: $.param(dataValue),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                })
      };

    //   classWiseServices.EditTimeTable = function(dataValue){
    //         console.log(dataValue);
    //         return $http({
    //                     method: 'PUT',
    //                     url: globalServices.globalValue.baseURL + '',
    //                     data: $.param(dataValue),
    //                     headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
    //                 })
    //     };

       return schoolEventsServices;
    }]);  