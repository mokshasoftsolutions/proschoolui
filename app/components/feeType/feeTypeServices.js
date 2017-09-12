angular.module('school_erp')
.factory('feeTypeServices',['$http', 'globalServices', function($http, globalServices){
    var feeTypeServices = {};

    feeTypeServices.getFeeType = function(){
        return $http({
                    method: 'GET',
                    url: globalServices.globalValue.baseURL + 'api/feetypes/SCH-9271'
                })
    };

     feeTypeServices.setFeeType = function(dataValue){
         console.log(dataValue);
        return $http({
                    method: 'POST',
                    url: globalServices.globalValue.baseURL + 'api/feetypes/SCH-9271',
                    data: $.param(dataValue),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                })
      };

    //   feeTypeServices.EditChapters = function(dataValue,lesson_id){
    //         console.log(dataValue);
    //          console.log("hello");
    //         return $http({
    //                     method: 'PUT',
    //                     url: globalServices.globalValue.baseURL + 'api/edit_course_work/'+lesson_id,
                        
    //                     data: $.param(dataValue),
    //                     headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
    //                 })
    //     };

    //   feeTypeServices.DeleteChapters = function(lesson_id){
         
    //        return $http({
    //                 method: 'DELETE',
    //                 url: globalServices.globalValue.baseURL + 'api/delete_course_work/'+lesson_id,
    //             })
    //   };

       return feeTypeServices;
    }]);  