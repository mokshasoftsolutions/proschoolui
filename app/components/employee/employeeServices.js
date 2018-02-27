angular.module('school_erp')
    .factory('employeeServices', ['$http', 'globalServices', function ($http, globalServices) {
        var employeeService = {};

        employeeService.getEmployee = function () {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/employee/'+globalServices.globalValue.school_id
            })
        };
        
        employeeService.getEmployeeById = function (employee_id) {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/employee_details/'+employee_id
            })
        };

        employeeService.getEmployeeByCategory = function (category) {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/employees_by_category/'+category+'/'+globalServices.globalValue.school_id
            })
        };


        employeeService.setEmployee = function (dataValue) {
            //console.log(dataValue);
            return $http({
                method: 'POST',
                url: globalServices.globalValue.baseURL + 'api/employee/'+globalServices.globalValue.school_id,
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };

        employeeService.EditEmployee = function (dataValue, employee_id) {
            //console.log(dataValue);
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


        employeeService.setBulkDeleteEmployess = function (dataValue) {
            var testData = {
                "employees": dataValue,
            };
            console.log(testData);
            return $http({
                method: 'POST',
                url: globalServices.globalValue.baseURL + 'api/employee_delete_bulk/'+globalServices.globalValue.school_id,
                data:testData,
                headers: { 'Content-Type':'application/json' },
            })
        };


         employeeService.setAttendance = function(dataValue, Attendance) {
           // console.log(dataValue);
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
          //  console.log(dataValue);
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

        employeeService.getAttendenceByMonth = function (month,employee_id) {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/employee_attendance_by_month/' + month+'/'+employee_id+'/'+globalServices.globalValue.school_id
            })
        };
       
        employeeService.getAttendenceMonthByEmployee = function (month) {
            return $http({
                method: 'GET',
                // url: "http://192.168.1.13:4005/api/examevaluation/3/2347/34/45"
                url: globalServices.globalValue.baseURL + 'api/employee_monthly_attendence/' + month + '/' + globalServices.globalValue.school_id
            })
        };
        employeeService.getAttedanceByCategory = function (teaching, date) {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/employee_Attendance_by_category/' + teaching + '/' + date +'/'+ globalServices.globalValue.school_id
            })
        };

        employeeService.getAttendanceByEmployee = function (employee_id) {
            return $http({
                method: 'GET',
                //url: "http://192.168.1.6:4005/api/examevaluationlistbystudentid/263/456"
                url: globalServices.globalValue.baseURL + 'api/employee_tillDate_attendence/' + employee_id
            })
        };

        employeeService.getEmployeeStatus  = function (employee_id) {
            return $http({
                method: 'GET',
                //url: "http://192.168.1.6:4005/api/examevaluationlistbystudentid/263/456"
                url: globalServices.globalValue.baseURL + 'api/presentDay_employee_attendence/'+ new Date().toDateString() + '/'  + employee_id
            })
        };


        return employeeService;

    }]);