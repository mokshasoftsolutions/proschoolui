angular.module('school_erp')
    .factory('employeeProfileServices', ['$http', 'globalServices', function ($http, globalServices) {
        var employeeProfileServices = {};

        employeeProfileServices.EditEmployee_details = function (dataValue, employee_id) {
            console.log(dataValue);
            return $http({
                method: 'PUT',
                url: globalServices.globalValue.baseURL + 'api/edit_employee_details/' + employee_id,
                //url: 'http://192.168.1.10:4005/api/edit_payband/STN-1',
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };
       

        employeeProfileServices.editEmployeeImage = function (dataValue,employee_id) {
            //   console.log(student_id)
            return $http({
                method: 'POST',
                // url:'http://192.168.1.16:4005/api/schools',
                url: globalServices.globalValue.baseURL + 'api/employee_photo_edit/'+ employee_id,
                data: dataValue,
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
        };
        return employeeProfileServices;

    }])