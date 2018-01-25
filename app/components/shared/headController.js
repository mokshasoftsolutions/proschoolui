angular.module('school_erp')
        .controller("headController", ['$http', '$scope', '$rootScope', '$filter', 'authService', '$state', 'ngDialog', '$window', 'globalServices', 'registrationServices', function ($http, $scope, $rootScope, $filter, authService, $state, ngDialog, $window, globalServices, registrationServices) {
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

                $scope.setRole = function (value) {
                        if (value == $rootScope.role) {
                                return true;
                        } else {
                                return false;
                        }
                }

                if ($rootScope.role == 'parent') {

                        $scope.studentSelection = $rootScope.student._id;
                        $scope.changeStudent = function (student) {
                                $scope.items = $filter('filter')($rootScope.users, student, true);
                                $window.localStorage["student"] = JSON.stringify($scope.items[0]);
                                $rootScope.student = $scope.items[0];
                                // $rootScope.studentId =$scope.items[0].student_id;
                                console.log($rootScope.student);
                                $state.reload();
                        }
                }

                //For logout

                $scope.logout = function () {
                        authService.logout();
                        $state.go('login_page');
                };

                $scope.getSchoolById = function (school_id) {
                        registrationServices.getSchoolById(school_id)
                                .success(function (data, status) {
                                        //     console.log("single school details");
                                        //   console.log(JSON.stringify(data));
                                        $rootScope.schoolDetails = data.schools;
                                        $rootScope.schoolName=$rootScope.schoolDetails[0].name;
                                        //    console.log($scope.schoolName);
                                        $rootScope.schoolImage = globalServices.globalValue.baseURL + 'api/image/' + $rootScope.schoolDetails[0].SchoolImage[0].filename;
                                        //     $scope.schoolData = data.schools;

                                        //     $scope.latestValue = $scope.schoolData[$scope.schoolData.length - 1];
                                        //     $scope.school_id = $scope.latestValue.school_id;
                                        //     //  $window.localStorage["schoolId"] = JSON.stringify($scope.latestValue.school_id);
                                        //     console.log($scope.latestValue);
                                        //     console.log($scope.school_id);
                                        //     //console.log(schoolId);
                                        //     console.log("messages..........2");
                                        //     //$scope.school_id = $scope.schoolData[0].school_id;

                                })
                                .error(function (data, success) { })
                }

             

                $scope.getSchoolById(globalServices.globalValue.school_id);

        }])

