angular.module('school_erp')
    .factory('studentServices', ['$http', 'globalServices', function ($http, globalServices) {
        var studentServices = {};
        console.log(globalServices.globalValue);    

        studentServices.getStudent = function (classSecValue) {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/students/' + classSecValue
            })
        };


        studentServices.setStudent = function (dataValue, classSecToAdd) {
             dataValue.school_id = globalServices.globalValue.school_id;
            return $http({
                method: 'POST',
                url: globalServices.globalValue.baseURL + 'api/students/' + classSecToAdd,
                 data:  dataValue,
                headers: { 'Content-Type': 'application/json' }
            })
        };

        studentServices.getStudentById = function (student_id) {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/student_details/' + student_id
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

        studentServices.getStudentsAttendance = function (classSecValue) {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/students/' + classSecValue
            })
        };

        studentServices.getAttendenceByDay = function (select_date, class_id, section_id) {
            return $http({
                method: 'GET',
                //url: "http://192.168.1.6:4005/api/examevaluationlistbystudentid/263/456"
                url: globalServices.globalValue.baseURL + 'api/attendancechartbydate/' + select_date + '/' + class_id + '/' + section_id
            })
        };

        studentServices.getAttendenceByMonth = function (month, studentId) {
            return $http({
                method: 'GET',
                // url: "http://192.168.1.13:4005/api/examevaluation/3/2347/34/45"
                url: globalServices.globalValue.baseURL + 'api/attendancechartbymonth/' + month + '/' + studentId
            })
        };
        studentServices.setBulkAttendance = function (dataValue, classVal, section) {
            var test = {
                "students": dataValue,
            };
            console.log(dataValue);
            return $http({
                method: 'POST',
                url: globalServices.globalValue.baseURL + 'api/attendancebulk/' + classVal + '/' + section + '/' + globalServices.globalValue.school_id,
                data: test,
                headers: { 'Content-Type': 'application/json' },
            })
        };

        // studentServices.setBulkAttendance = function (dataValue, classVal, section) {
        //     var test = {
        //         "employees": dataValue,
        //     };
        //     console.log(dataValue);
        //     return $http({
        //         method: 'POST',
        //         url: globalServices.globalValue.baseURL + 'api/attendancebulk/' + classVal + '/' + section + '/' + globalServices.globalValue.school_id,
        //         data: $.param(test),
        //         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        //     })
        // };

        studentServices.EditStudent = function (dataValue, student_id) {
            console.log(dataValue);
            return $http({
                method: 'PUT',
                //url: globalServices.globalValue.baseURL + 'book_edit/:book_id/:name/:value',
                url: globalServices.globalValue.baseURL + 'api/edit_students/' + student_id,
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };

        studentServices.DeleteStudent = function (student_id) {
            return $http({
                method: 'DELETE',
                url: globalServices.globalValue.baseURL + 'api/delete_student/' + student_id,
            })
        };
        studentServices.getParentListBySchool = function () {
            //console.log(secId);
            return $http({
                method: 'GET',
                // url: "http://192.168.1.13:4005/api/examevaluation/3/2347/34/45"
                url: globalServices.globalValue.baseURL + 'api/getparentlist/'+globalServices.globalValue.school_id
            })
        };
        studentServices.getTeacherListBySchool = function () {
            //console.log(secId);
            return $http({
                method: 'GET',
                // url: "http://192.168.1.13:4005/api/examevaluation/3/2347/34/45"
                url: globalServices.globalValue.baseURL + 'api/teachers/'+globalServices.globalValue.school_id
            })
        };

        return studentServices;

    }]);