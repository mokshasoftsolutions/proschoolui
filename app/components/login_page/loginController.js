angular.module('school_erp')
    .controller("loginController", ['$http', '$scope', '$rootScope', 'authService', '$state', 'ngDialog', '$window', 'ngProgress', 'globalServices', "$state", "$location", "rememberMeService", '$base64', function ($http, $scope, $rootScope, authService, $state, ngDialog, $window, ngProgress, globalServices, $state, $location, rememberMeService, $base64) {

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
                        if ($rootScope.role == 'admin') {
                            $state.go('main.dashboard');
                        } else if ($rootScope.role == 'parent') {
                            $state.go('main.parentDashboard');
                        } else {
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

     //   self = this;

    //  if (rememberMeService('7ZXYZ@L') && rememberMeService('UU@#90')) {
    //     self.user.email = Base64.decode(rememberMeService('7ZXYZ@L'));
    //     self.user.password = Base64.decode(rememberMeService('UU@#90'));
    // }
 
   
    // self.rememberMe = function () {
    //     if (self.remember) {
 
    //         rememberMeService('7ZXYZ@L', Base64.encode(self.user.email));
    //         rememberMeService('UU@#90', Base64.encode(self.user.password));
    //     } else {
    //         rememberMeService('7ZXYZ@L', '');
    //         rememberMeService('UU@#90', '');
    //     }
    // };


        if (rememberMeService('a string') && rememberMeService('YSBzdHJpbmc=')) {
           $scope.datab.username = rememberMeService('a string');
           $scope.datab.password = rememberMeService('YSBzdHJpbmc=');
          
        }


        $scope.rememberMe = function (remember) {
            if (remember) {
               // console.log($scope.datab.username);
                //console.log($scope.datab.password);
                rememberMeService('a string', $scope.datab.username);
                rememberMeService('YSBzdHJpbmc=',$scope.datab.password);
            } else {
                rememberMeService('a string', '');
                rememberMeService('YSBzdHJpbmc=', '');
            }
        };


        // $rootScope.loginPage = true;
    }])