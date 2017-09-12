angular.module('school_erp')
    .factory('subjectsServices', ['$http', 'globalServices', function($http, globalServices) {
        var subjectsServices = {};

        subjectsServices.getSubjects = function(secID) {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/subjects/' + secID
            })
        };

        subjectsServices.setSubjects = function(dataValue, secID) {
            console.log(dataValue);
            return $http({
                method: 'POST',
                url: globalServices.globalValue.baseURL + 'api/subjects/' + secID,
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };

        subjectsServices.EditSubjects = function(dataValue,subject_id){
            console.log(dataValue);
            return $http({
                        method: 'PUT',
                        url: globalServices.globalValue.baseURL + 'api/edit_subjects/'+subject_id,
                        
                        data: $.param(dataValue),
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                    })
        };

      subjectsServices.DeleteSubjects = function(subject_id){
           return $http({
                    method: 'DELETE',
                    url: globalServices.globalValue.baseURL + 'api/delete_subjects/'+subject_id,
                })
      };
      
        return subjectsServices;
    }]);