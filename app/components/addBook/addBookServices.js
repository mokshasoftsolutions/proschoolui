angular.module('school_erp')
    .factory('addBookServices', ['$http', 'globalServices', function ($http, globalServices) {
        var addBookServices = {};

        addBookServices.getBook = function () {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/book/'+globalServices.globalValue.school_id
                // url: 'http://192.168.1.10:4005/api/book/2'
            })
        };
        addBookServices.setBook = function (dataValue) {
            console.log(dataValue);
            return $http({
                method: 'POST',
                url: globalServices.globalValue.baseURL + 'api/book/'+globalServices.globalValue.school_id,
                // url: 'http://192.168.1.10:4005/api/book/2',
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };

        addBookServices.EditBook = function (dataValue,book_id)  {
            console.log(dataValue);
            return $http({
                method: 'PUT',
                url: globalServices.globalValue.baseURL +  'api/edit_book/'+book_id,
               
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };
        addBookServices.DeleteBook = function(book_id){
           return $http({
                    method: 'DELETE',
                    url: globalServices.globalValue.baseURL + 'api/delete_book/'+book_id
                })
         }

        addBookServices.getEmployee = function (employeeID) {
            var response = $http({
                method: "post",
                url: "Home/getEmployeeByNo",
                params: {
                    id: JSON.stringify(employeeID)
                }
            });
            return response;
        }

        // Update Employee
        addBookServices.updateEmp = function (employee) {
            var response = $http({
                method: "post",
                url: "Home/UpdateEmployee",
                data: JSON.stringify(employee),
                dataType: "json"
            });
            return response;
        }

        

        return addBookServices;
    }]);  