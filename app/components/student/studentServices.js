angular.module('school_erp')
    .factory('studentServices', ['$http', 'globalServices', function ($http, globalServices) {
        var studentServices = {};

        studentServices.getStudent = function (classSecValue) {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/students/' + classSecValue
            })
        };


        studentServices.setStudent = function (dataValue, classSecToAdd) {
            return $http({
                method: 'POST',
                url: globalServices.globalValue.baseURL + 'api/students/' + classSecToAdd,
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
        };


        //   studentServices.setParent = function(parentDetails,studentId){       
        //     return $http({
        //                 method: 'POST',
        //                 url: globalServices.globalValue.baseURL + 'api/add_parent/'+studentId,
        //                 data: $.param(parentDetails),
        //                 headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        //             })
        //   };

        //    studentServices.setStudentaddress = function(Studentaddress,studentId){       
        //     return $http({
        //                 method: 'POST',
        //                 url: globalServices.globalValue.baseURL + 'api/add_parent/'+studentId,
        //                 data: $.param(Studentaddress),
        //                 headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        //             })
        //   };

        studentServices.setAttendance = function (dataValue, classToAdd) {
            return $http({
                method: 'POST',
                url: globalServices.globalValue.baseURL + 'api/attendance/' + classToAdd,
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
        };

        studentServices.getStudents = function (classSecValue) {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/students/' + classSecValue
            })
        };


        studentServices.setBulkAttendance = function (dataValue, classVal, section) {
            var test = {
                "employees": dataValue,
            };
            console.log(dataValue);
            return $http({
                method: 'POST',
                url: globalServices.globalValue.baseURL + 'api/attendancebulk/' + classVal + '/' + section + '/' + 'SCH-9271',
                data: $.param(test),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };

        studentServices.EditStudent = function (dataValue, student_id) {
            console.log(dataValue);
            return $http({
                    method: 'PUT',
                    //url: globalServices.globalValue.baseURL + 'book_edit/:book_id/:name/:value',
                    url: globalServices.globalValue.baseURL + 'api/edit_students/'+student_id,
                    data: $.param(dataValue),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };

        studentServices.DeleteStudent = function(student_id){
           return $http({
                    method: 'DELETE',
                    url: globalServices.globalValue.baseURL + 'api/delete_student/'+student_id,
                })
        };


        return studentServices;

    }]);