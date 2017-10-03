angular.module('school_erp')
        .controller("headController", ['$http', '$scope', '$rootScope', 'authService', '$state', 'ngDialog', '$window', function ($http, $scope, $rootScope, authService, $state, ngDialog, $window) {
                // For current date
                n = new Date();
                y = n.getFullYear();
                m = n.getMonth() + 1;
                d = n.getDate();
                if (d < 10) {
                        d = '0' + d;
                }
                if (m < 10) {
                        m = '0' + m;
                }
                document.getElementById("date").innerHTML = d + "/" + m + "/" + y;

                //For logout

                $scope.logout = function () {
                        authService.logout();
                        $state.go('login_page');
                };

        }])

