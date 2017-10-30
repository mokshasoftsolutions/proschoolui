angular.module('school_erp')
    .factory('assignServices', ['$http', 'globalServices', function ($http, globalServices) {
        var assignServices = {};

        assignServices.setTeacher = function (dataValue) {
            console.log(dataValue);
            return $http({
                method: 'POST',
                 url: globalServices.globalValue.baseURL + 'api/addorupdatesubjectstoteacher/'+globalServices.globalValue.school_id,
                //  url:globalServices.globalValue.baseURL +'api/add_subjects_to_teacher/'+teacher_id,
             
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };

        assignServices.getTeacher = function (secId) {
            //console.log(dataValue,teacherId);
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/addsubjectstoteacher/'+secId

            })
        };

        // assignServices.EditAssignSubject = function (dataValue, teacher_id) {
        //     console.log(dataValue);
        //     console.log("hello");
        //     return $http({
        //         method: 'PUT',
        //         url: globalServices.globalValue.baseURL + 'api/edit_teachers/' + teacher_id,

        //         data: $.param(dataValue),
        //         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        //     })
        // };

        assignServices.DeleteAssignSubject = function (teacher_id) {

            return $http({
                method: 'DELETE',
                url: globalServices.globalValue.baseURL + 'api/delete_teacher/' + teacher_id,
            })
        };

        return assignServices;
    }])