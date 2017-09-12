angular.module('school_erp')
.controller("headController",['$http','$scope','$rootScope','authService','$state','ngDialog','$window', function($http, $scope, $rootScope, authService, $state, ngDialog, $window){


         $scope.logout = function(){                
                authService.logout();
                 $state.go('login_page');
        };        

}])

