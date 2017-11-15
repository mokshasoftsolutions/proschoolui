angular.module('school_erp')
    .controller("loginController", ['$http', '$scope', '$rootScope', 'authService', '$state', 'ngDialog', '$window', 'ngProgressFactory','globalServices', function ($http, $scope, $rootScope, authService, $state, ngDialog, $window, ngProgressFactory,globalServices) {

        $scope.progressbar = ngProgressFactory.createInstance();

        $scope.datab = [];
        // $scope.image=[{
        //    "url": "dist/img/school2.png"}]

        $scope.login = function (data) {
<<<<<<< HEAD
console.log("login  mesaage.....");
=======

>>>>>>> 3063d8978d8eca3b5913af595172c0022cb6e366
            $scope.progressbar.start();
            var dataValue = {
                email: $scope.datab.username,
                password: $scope.datab.password
            };
            authService.login(dataValue)
                .success(function (data, status) {

                    console.log(data);


                    $scope.loginData = data.role;
                    console.log($scope.loginData);
                    if (status != 401) {
                        $window.localStorage["userInfo"] = JSON.stringify(data);
                        $rootScope.role = data.role;
                        $rootScope.loginPage = false;
                        globalServices.getUserInfo();
                        $state.go('main.dashboard');
                    }
                })
                .error(function (data, success) {
                    $scope.datab = {};
                    console.log(JSON.stringify(data));
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