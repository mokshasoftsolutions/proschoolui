angular.module('school_erp')
.factory('feeMasterServices',['$http', 'globalServices', function($http, globalServices){
    var feeMasterServices = {};

    feeMasterServices.getFeeMaster = function(){
        return $http({
                    method: 'GET',
                    url: globalServices.globalValue.baseURL + 'api/fee_master/'+globalServices.globalValue.school_id
                })
    };

     feeMasterServices.setFeeMaster = function(dataValue){
         console.log(dataValue);
        return $http({
                    method: 'POST',
                    url: globalServices.globalValue.baseURL + 'api/fee_master/'+globalServices.globalValue.school_id,
                    data: $.param(dataValue),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                })
      };

      feeMasterServices.EditFeeMaster = function(dataValue,fee_master_id){
            console.log(dataValue);
             console.log("hello");
            return $http({
                        method: 'PUT',
                        url: globalServices.globalValue.baseURL + 'api/edit_fee_master/'+fee_master_id,
                        
                        data: $.param(dataValue),
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                    })
        };

      feeMasterServices.DeleteFeeMaster = function(fee_master_id){
         
           return $http({
                    method: 'DELETE',
                    url: globalServices.globalValue.baseURL + 'api/delete_fee_master/'+fee_master_id,
                })
      };

       return feeMasterServices;
    }]);  