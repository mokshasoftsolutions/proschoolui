angular.module('school_erp')
    .factory('employeeServices', ['$http', 'globalServices', function ($http, globalServices) {
        var employeeService = {};

        employeeService.getEmployee = function () {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/employee/SCH-9271'
            })
        };

        employeeService.setEmployee = function (dataValue) {
            console.log(dataValue);
            return $http({
                method: 'POST',
                url: globalServices.globalValue.baseURL + 'api/employee/SCH-9271',
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


        employeeService.setAttendance = function (dataValue, Attendance) {
            console.log(dataValue);
            return $http({
                method: 'POST',
                url: globalServices.globalValue.baseURL + 'api/employee_attendance/SCH-9271/' + Attendance,
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
                url: globalServices.globalValue.baseURL + 'api/employee_attendancebulk/SCH-9271',
                data: $.param(test),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };
        employeeService.getEmployeeAttendence = function () {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/employee_attendancebulk/SCH-9271'
            })
        };

        employeeService.getEmployeeAttendenceByDay = function (date) {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/employee_attendance_status/'+date
            })
        };


        return employeeService;

    }]);