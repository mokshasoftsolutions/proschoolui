angular.module('school_erp')
.factory('chaptersServices',['$http', 'globalServices', function($http, globalServices){
    var chaptersServices = {};

    chaptersServices.getChapters = function(subjectId){
        return $http({
                    method: 'GET',
                    url: globalServices.globalValue.baseURL + 'api/course_works/'+subjectId
                })
    };

     chaptersServices.setChapters = function(dataValue,subjectId){
         console.log(dataValue);
        return $http({
                    method: 'POST',
                    url: globalServices.globalValue.baseURL + 'api/course_works/'+subjectId,
                    data: $.param(dataValue),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                })
      };

      chaptersServices.EditChapters = function(dataValue,lesson_id){
            console.log(dataValue);
             console.log("hello");
            return $http({
                        method: 'PUT',
                        url: globalServices.globalValue.baseURL + 'api/edit_course_work/'+lesson_id,
                        
                        data: $.param(dataValue),
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                    })
        };

      chaptersServices.DeleteChapters = function(lesson_id){
         
           return $http({
                    method: 'DELETE',
                    url: globalServices.globalValue.baseURL + 'api/delete_course_work/'+lesson_id,
                })
      };

       return chaptersServices;
    }]);  