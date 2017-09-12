angular.module('school_erp')
    .controller("loginController", ['$http', '$scope', '$rootScope', 'authService', '$state', 'ngDialog', '$window', function($http, $scope, $rootScope, authService, $state, ngDialog, $window) {
        $scope.datab = [];

        $scope.login = function(data) {
            var dataValue = {
                email: $scope.datab.username,
                password: $scope.datab.password
            };
            authService.login(dataValue)
                .success(function(data, status) {
                   
                    console.log(data);

                    $scope.loginData=data.role;
                    console.log($scope.loginData);
                    

                    

                    if (status != 401) {
                         $window.localStorage["userInfo"] = JSON.stringify(data);
                         $rootScope.role = data.role;
                        $rootScope.loginPage = false;
                        $state.go('main.dashboard');
                    }
                })
                .error(function(data, success) {
                    $scope.datab = {};
                    console.log(JSON.stringify(data));
                     ngDialog.open({
                            template: '<p>' + data + '</p>',
                            plain: true
                        });
                })
        };

        $scope.logout = function() {
            authService.logout();
            $state.go('login');
        };

        // $rootScope.loginPage = true;
    }])