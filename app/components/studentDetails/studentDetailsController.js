angular.module('school_erp')
.controller("studentDetailsController",['$http','$scope', function($http, $scope){
        $scope.StudentDetails = [];
        employeeServices.getStudentDetails()
        .success(function(data, status){
            $scope.StudentDetails = data.Students;
        })
        .error(function(data,success){
        })
}])

