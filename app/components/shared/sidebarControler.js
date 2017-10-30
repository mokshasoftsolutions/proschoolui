angular.module('school_erp')
.controller("sideController",['$http','$scope','$rootScope','$filter','authService','$state','ngDialog','$window', function($http, $scope, $rootScope,$filter,authService, $state, ngDialog, $window){
     
     $scope.setRole = function(value){
         if(value == $rootScope.role){
            return true;
         }else{
             return false;
         }
         
     }

     if ($rootScope.role == 'parent') {

            $scope.studentSelection = $rootScope.student._id;
            $scope.changeStudent = function (student) {
                $scope.items = $filter('filter')($rootScope.users, student, true);
                $window.localStorage["student"] = JSON.stringify($scope.items[0]);
                // console.log($scope.studentSelection);
                $state.reload();
            }

        }

}])