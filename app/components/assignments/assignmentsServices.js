angular.module('school_erp')
.factory('assignmentsServices',['$http', 'globalServices', function($http, globalServices){
    var assignmentsServices = {};

    assignmentsServices.getAssignments = function(sectionId,lessonId){
        return $http({
                    method: 'GET',
                    url: globalServices.globalValue.baseURL + 'api/assignment/'+sectionId +'/'+ lessonId
                })
    };

     assignmentsServices.setAssignments = function(dataValue, sectionId, lessonId){
         console.log(dataValue);
        return $http({
                    method: 'POST',
                    url: globalServices.globalValue.baseURL + 'api/assignment/'+sectionId +'/'+ lessonId,
                    data: $.param(dataValue),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                })
      };

    assignmentsServices.EditAssignments = function(dataValue, assignment_id){
            console.log(dataValue);
            return $http({
                        method: 'PUT',
                        url: globalServices.globalValue.baseURL + 'api/edit_assignments/'+ assignment_id,
                        data: $.param(dataValue),
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                    })
        };

      assignmentsServices.DeleteAssignments = function(assignment_id){
           return $http({
                    method: 'DELETE',
                    url: globalServices.globalValue.baseURL + 'api/delete_assignments/'+assignment_id,
                })
      };

       return assignmentsServices;
    }]);  