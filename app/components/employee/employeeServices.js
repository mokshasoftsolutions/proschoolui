angular.module('school_erp')
    .factory('employeeServices', ['$http', 'globalServices', function ($http, globalServices) {
        var employeeService = {};

        employeeService.getEmployee = function () {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/employee/'+globalServices.globalValue.school_id
            })
        };

        employeeService.setEmployee = function (dataValue) {
            console.log(dataValue);
            return $http({
                method: 'POST',
                url: globalServices.globalValue.baseURL + 'api/employee/'+globalServices.globalValue.school_id,
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };

        employeeService.EditEmployee = function (dataValue, employee_id) {
            console.log(dataValue);
            return $http({
                method: 'PUT',
                url: globalServices.globalValue.baseURL + 'api/edit_employee/' + employee_id,

                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };

        employeeService.DeleteEmployee = function (employee_id) {
            return $http({
                method: 'DELETE',
                url: globalServices.globalValue.baseURL + 'api/delete_employee/' + employee_id,
            })
        };


        // employeeService.setAttendance = function (dataValue, Attendance) {
        //     console.log(dataValue);
        //     return $http({
        //         method: 'POST',
        //         url: globalServices.globalValue.baseURL + 'api/employee_attendance/'+globalServices.globalValue.school_id+'/' + Attendance,
        //         data: $.param(dataValue),
        //         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        //     })
        // };


         employeeService.setAttendance = function(dataValue, Attendance) {
            console.log(dataValue);
            return $http({
                method: 'POST',
                url: globalServices.globalValue.baseURL + 'api/employee_attendance/' + Attendance,
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };


        employeeService.setBulkAttendance = function (dataValue) {
            var test = {
                "employees": dataValue,
            };
            console.log(dataValue);
            return $http({
                method: 'POST',
                url: globalServices.globalValue.baseURL + 'api/employee_attendancebulk/'+globalServices.globalValue.school_id,
                data: test,
                headers: { 'Content-Type': 'application/json' },
            })
        };
        // employeeService.setBulkAttendance = function (dataValue) {
        //     var test = {
        //         "employees": dataValue,
        //     };
        //     console.log(dataValue);
        //     return $http({
        //         method: 'POST',
        //         url: globalServices.globalValue.baseURL + 'api/employee_attendancebulk/'+globalServices.globalValue.school_id,
        //         data: $.param(test),
        //         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        //     })
        // };

        employeeService.getEmployeeAttendenceByDay = function (date) {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/employee_attendance_by_date/' + date+'/'+globalServices.globalValue.school_id
            })
        };

        return employeeService;

    }]);