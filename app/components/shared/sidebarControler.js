angular.module('school_erp')
.controller("sideController",['$http','$scope','$rootScope','authService','$state','ngDialog','$window', function($http, $scope, $rootScope, authService, $state, ngDialog, $window){
     
     $scope.setRole = function(value){
         if(value == $rootScope.role){
            return true;
         }else{
             return false;
         }
         
     }

}])