angular.module('school_erp')
.factory('feeTypeServices',['$http', 'globalServices', function($http, globalServices){
    var feeTypeServices = {};

    feeTypeServices.getFeeType = function(){
        return $http({
                    method: 'GET',
                    url: globalServices.globalValue.baseURL + 'api/fee_types/'+globalServices.globalValue.school_id
                })
    };

     feeTypeServices.setFeeType = function(dataValue){
         console.log(dataValue);
        return $http({
                    method: 'POST',
                    url: globalServices.globalValue.baseURL + 'api/fee_types/'+globalServices.globalValue.school_id,
                    data: $.param(dataValue),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                })
      };

      feeTypeServices.EditFeeType = function(dataValue,fee_types_id){
            console.log(dataValue);
             console.log("hello");
            return $http({
                        method: 'PUT',
                        url: globalServices.globalValue.baseURL + 'api/edit_fee_types/'+fee_types_id,
                        
                        data: $.param(dataValue),
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                    })
        };

      feeTypeServices.DeleteFeeType = function(fee_types_id){
         
           return $http({
                    method: 'DELETE',
                    url: globalServices.globalValue.baseURL + 'api/delete_fee_types/'+fee_types_id,
                })
      };

       return feeTypeServices;
    }]);  