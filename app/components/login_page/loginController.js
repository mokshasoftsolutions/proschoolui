angular.module('school_erp')
    .controller("loginController", ['$http', '$scope', '$rootScope', 'authService', '$state', 'ngDialog', '$window', 'ngProgressFactory', 'globalServices', function ($http, $scope, $rootScope, authService, $state, ngDialog, $window, ngProgressFactory, globalServices) {

        $scope.progressbar = ngProgressFactory.createInstance();

        $scope.datab = [];
        // $scope.image=[{
        //    "url": "dist/img/school2.png"}]

        $scope.login = function (data) {
            // console.log("login  mesaage.....");
            $scope.progressbar.start();
            var dataValue = {
                email: $scope.datab.username,
                password: $scope.datab.password
            };
            authService.login(dataValue)
                .success(function (data, status) {

                    //  console.log(data);


                    $scope.loginData = data.role;
                    //    console.log($scope.loginData);
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
                    //  console.log(JSON.stringify(data));
                    ngDialog.open({
                        template: '<p>' + data + '</p>',
                        plain: true
                    });
                })
        };

        $scope.logout = function () {
            $scope.progressbar.stop();
            authService.logout();
            $state.go('login');
        };

        // $rootScope.loginPage = true;
    }])