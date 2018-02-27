angular.module('school_erp')
    .factory("queryServices", ['$http', 'globalServices', function ($http, globalServices) {
        var queryServices = {};
        // registrationServices.globalValue = {
        //         baseURL: 'http://192.168.1.11:4005/',

        //     }

        queryServices.getQuery = function (school_id) {
            return $http({
                method: 'GET',
               
                url: globalServices.globalValue.baseURL + 'api/websiteQuery_moksha' 
            })
        };
        queryServices.sendQuery = function (dataValue,date) {
            //  console.log("message")
            return $http({
                method: 'POST',                
                url: globalServices.globalValue.baseURL + 'api/websiteQuery_moksha/'+date, 
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
        };   
     
     
        return queryServices;
    }])