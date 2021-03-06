angular.module('school_erp')
    .factory('studentProfileServices', ['$http', 'globalServices', function ($http, globalServices) {
        var studentProfileServices = {};

        studentProfileServices.EditStudent_details = function (dataValue, student_id) {
            //console.log(dataValue);
            return $http({
                method: 'PUT',
                url: globalServices.globalValue.baseURL + 'api/edit_student_details/' + student_id,
                //url: 'http://192.168.1.10:4005/api/edit_payband/STN-1',
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };


        studentProfileServices.editStudentImage = function (dataValue, student_id, name) {
            //   console.log(student_id)
            return $http({
                method: 'POST',
                // url:'http://192.168.1.16:4005/api/schools',
                url: globalServices.globalValue.baseURL + 'api/student_photo_edit/' + student_id + '/' + name,
                data: dataValue,
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
        };

        studentProfileServices.editStudentDocument = function (dataValue, student_id, name) {
            //   console.log(student_id)
            return $http({
                method: 'POST',
                // url:'http://192.168.1.16:4005/api/schools',
                url: globalServices.globalValue.baseURL + 'api/student_Document_photo_edit/' + student_id + '/' + name,
                data: dataValue,
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
        };
        studentProfileServices.addStudentDocument = function (dataValue, student_id) {
            console.log(dataValue)
            return $http({
                method: 'POST',
                // url:'http://192.168.1.16:4005/api/schools',
                url: globalServices.globalValue.baseURL + 'api/add_student_Document_photo/' + student_id,
                data: dataValue,
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
        };
        studentProfileServices.deleteStudentDocument = function (student_id, name) {
            //console.log(dataValue)
            return $http({
                method: 'DELETE',

                url: globalServices.globalValue.baseURL + 'api/delete_student_Document_photo/' + student_id + '/' + name

            })
        };


        return studentProfileServices;

    }])