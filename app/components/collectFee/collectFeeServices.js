angular.module('school_erp')
.factory('collectFeeServices',['$http', 'globalServices', function($http, globalServices){
    var collectFeeServices = {};

    collectFeeServices.getFee = function(student_id){
        return $http({
                    method: 'GET',
                    url: globalServices.globalValue.baseURL + 'api/fee_collection/'+student_id
                })
    };

    collectFeeServices.getFeeTypes = function(classId){
        return $http({
                    method: 'GET',
                    url: globalServices.globalValue.baseURL + 'api/feetypes/'+globalServices.globalValue.school_id+'/'+classId
                })
    };

    collectFeeServices.getFeeReports = function(secId,feeTypeId){
        return $http({
                    method: 'GET',
                    url: globalServices.globalValue.baseURL + 'api/section_student_fee_paid_details/'+secId+'/'+feeTypeId
                })
    };
    
    collectFeeServices.getFeeByDay = function(select_date){
        return $http({
                    method: 'GET',
                    url: globalServices.globalValue.baseURL + 'api/fee_by_Date/'+select_date+'/'+globalServices.globalValue.school_id
                })
    };
     collectFeeServices.setFee = function(dataValue,student_id){
         console.log(dataValue);
        return $http({
                    method: 'POST',
                    url: globalServices.globalValue.baseURL + 'api/fee_collection/'+student_id,
                    data: $.param(dataValue),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                })
      };
       
       

      collectFeeServices.EditFeeMaster = function(dataValue,fee_master_id){
            console.log(dataValue);
             console.log("hello");
            return $http({
                        method: 'PUT',
                        url: globalServices.globalValue.baseURL + 'api/edit_fee_master/'+fee_master_id,
                        
                        data: $.param(dataValue),
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                    })
        };

      collectFeeServices.DeleteFeeMaster = function(fee_master_id){
         
           return $http({
                    method: 'DELETE',
                    url: globalServices.globalValue.baseURL + 'api/delete_fee_master/'+fee_master_id,
                })
      };

       return collectFeeServices;
    }]);  