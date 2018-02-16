angular.module('school_erp')
    .controller("loginController", ['$http', '$scope', '$rootScope', 'authService', '$state', 'ngDialog', '$window', 'ngProgress', 'globalServices', function ($http, $scope, $rootScope, authService, $state, ngDialog, $window, ngProgress, globalServices) {

        //$scope.progressbar = ngProgressFactory.createInstance();
        $scope.started = false;
        $scope.datab = [];
       
        $scope.login = function (data) {
            
            ngProgress.start();
            ngProgress.complete();
            var dataValue = {
                email: $scope.datab.username,
                password: $scope.datab.password
            };
            authService.login(dataValue)
                .success(function (data, status) {

                 

                    $scope.loginData = data.role;
                
                    if (status != 401) {
                        $window.localStorage["userInfo"] = JSON.stringify(data);
                        $rootScope.role = data.role;
                        $rootScope.loginPage = false;
                        globalServices.getUserInfo();
                        if($rootScope.role=='admin'){
                        $state.go('main.dashboard');
                        } else if($rootScope.role=='parent'){
                            $state.go('main.parentDashboard');
                        } else{
                            $state.go('main.teacherDashboard');
                        }
                    }
                })
                .error(function (data, success) {
                    $scope.datab = {};
                   
                    ngDialog.open({
                        template: '<p>' + data + '</p>',
                        plain: true
                    });
                    //ngProgress.reset();
                    ngProgress.complete();
                })
        };

        $scope.logout = function () {
            ngProgress.reset();
          
            authService.logout();
            $state.go('login');
        };

        // $rootScope.loginPage = true;
    }])