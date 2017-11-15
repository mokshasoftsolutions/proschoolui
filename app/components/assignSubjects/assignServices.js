angular.module('school_erp')
    .factory('assignServices', ['$http', 'globalServices', function ($http, globalServices) {
        var assignServices = {};

        assignServices.setTeacher = function (dataValue,secId) {
            console.log(dataValue);
            return $http({
                method: 'POST',
                 url: globalServices.globalValue.baseURL + 'api/addorupdatesubjectstoteacher/'+globalServices.globalValue.school_id+'/'+secId,
                //  url:globalServices.globalValue.baseURL +'api/add_subjects_to_teacher/'+teacher_id,
             
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };

        assignServices.getTeacher = function () {
            //console.log(dataValue,teacherId);
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/listsubjectstoteacher/'+globalServices.globalValue.school_id

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

        assignServices.DeleteAssignSubject = function (teacher_id,subject_id) {

            return $http({
                method: 'PUT',
                url: globalServices.globalValue.baseURL + 'api/delete_subject_teacher/' + teacher_id+'/'+subject_id
            })
        };

        return assignServices;
    }])