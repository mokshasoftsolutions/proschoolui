angular.module('school_erp')
    .controller("registrationController", ['$http', '$scope', '$window', 'ngDialog', 'registrationServices', 'globalServices', function ($http, $scope, $window, ngDialog, registrationServices, globalServices) {



        var panes_ptr;
        $scope.goToTab = function (title) {
            angular.forEach(panes_ptr, function (pane) {
                pane.selected = pane.title === title ? true : false;
            });
        };

        $scope.LinkControllers = function (panes) {
            panes_ptr = panes;
        };

        $scope.schoolData = [];
        $scope.classData = [];
        $scope.data = [];
        $scope.value = [];
        $scope.datavalue = [];
        $window.localStorage["schoolId"] = null;


        $scope.selectedFile = null;

        $scope.loadFile = function (files) {

            console.log("messsage1");
            $scope.$apply(function () {

                $scope.selectedFile = files[0];
                console.log($scope.selectedFile);

                if ($scope.selectedFile.type != "image/jpeg") {
                    //     ngDialog.open({
                    //         template: '<p> Not a Image File </p>',
                    //         plain: true
                    //     });
                    //    $window.alert("Not a Image File");
                    $scope.message = "Not a Image File !..";
                }


            })

        }
        $scope.handleFile = function (data) {
            console.log("messsage2");
            var file = $scope.selectedFile;
            //console.log(file);
            $scope.save(file, data);
            // console.log(file.name);
            // console.log(file.type);
            // if (file == undefined || file == null) {
            //     ngDialog.open({
            //         template: '<p>Not a Image File </p>',
            //         plain: true
            //     });
            // }

            // else if (file.type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && file.type != "application/vnd.ms-excel") {
            //     ngDialog.open({
            //         template: '<p>Not a Excel File (The file format should be xls or xlsx !....) </p>',
            //         plain: true
            //     });
            // }
            // else {

            //     $scope.save(file, secId);
            // }


        }


        $scope.save = function (file, data) {
            console.log("messsage3");
            console.log(file);

            var fd = new FormData();
            fd.append('file', file);
            // fd.append('data', 'string');
            console.log(JSON.stringify(fd));
            $http.post(globalServices.globalValue.baseURL + 'api/upload_image/' + globalServices.globalValue.school_id, fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                })
                .success(function () {
                    ngDialog.open({
                        template: '<p>File Added Successfully.</p>',
                        plain: true
                    });

                })
                .error(function () {
                    ngDialog.open({
                        template: '<p>Some Error Occured!.</p>',
                        plain: true
                    });
                });
        }


        $scope.getRegistration = function () {

            registrationServices.getRegistration()
                .success(function (data, status) {
                    console.log(JSON.stringify(data));
                    $scope.schoolData = data.schools;

                    $scope.latestValue = $scope.schoolData[$scope.schoolData.length - 1];
                    $scope.school_id = $scope.latestValue.school_id;
                    //  $window.localStorage["schoolId"] = JSON.stringify($scope.latestValue.school_id);
                    console.log($scope.latestValue);
                    console.log($scope.school_id);
                    //console.log(schoolId);
                    console.log("messages..........2");
                    //$scope.school_id = $scope.schoolData[0].school_id;





                })
                .error(function (data, success) {})
        }

        // Add attendance single
        $scope.addRegistration = function (data) {
            console.log(JSON.stringify(data));
            console.log("message");
            var Registration = {
                name: $scope.data.name,
                email: $scope.data.email,
                phone: $scope.data.contact,
                academic_year: $scope.data.batch_year,
                website: $scope.data.website,
                address: $scope.data.address,
                description: $scope.data.description 
                // logo: $scope.data.logo

            }
            console.log(Registration);

            registrationServices.setRegistration(Registration)
                .success(function (data, status) {

                    ngDialog.open({
                        template: '<p> Registration submitted successfully </p>',
                        plain: true
                    });
                    $scope.data = [];
                    $scope.getRegistration();

                })
                .error(function (data, success) {
                    // ngDialog.open({
                    //     template: '<p>Some Error Occured!</p>',
                    //     plain: true
                    // });
                })
        }
        $scope.getClass = function (school_id) {

            registrationServices.getClass(school_id)
                .success(function (data, status) {
                    console.log(JSON.stringify(data));
                    $scope.classData = data.school_classes;
                    $scope.class_id = $scope.classData[0].class_id;
                    console.log($scope.class_id);

                })
                .error(function (data, success) {})
        }


        $scope.addClass = function (value) {
            console.log("message");
            //console.log(JSON.stringify(value));
            var ClassData = {
                name: $scope.value.name

            }
            console.log(ClassData);

            registrationServices.setClass(ClassData, $scope.school_id)
                .success(function (data, status) {

                    ngDialog.open({
                        template: '<p> Class Added successfully </p>',
                        plain: true
                    });
                    //$scope.value = [];

                    $scope.getClass($scope.school_id);
                })
                .error(function (data, success) {
                    // ngDialog.open({
                    //     template: '<p>Some Error Occured!</p>',
                    //     plain: true
                    // });
                })
        }

        $scope.getSection = function (class_id) {

            registrationServices.getSection(class_id)
                .success(function (data, status) {
                    console.log(JSON.stringify(data));
                    $scope.classData = $scope.class_sections;

                })
                .error(function (data, success) {})
        }


        $scope.addSection = function (datavalue,class_id) {
            console.log("message");
            //console.log(JSON.stringify(value));
            var SectionData = {
                name: $scope.datavalue.section

            }
            console.log(SectionData);

            registrationServices.setSection(SectionData,class_id)
                .success(function (data, status) {

                    ngDialog.open({
                        template: '<p> Section Added successfully </p>',
                        plain: true
                    });
                    //$scope.datavalue= [];

                    $scope.getSection($scope.class_id);
                    $scope.getClass($scope.school_id);

                })
                .error(function (data, success) {
                    // ngDialog.open({
                    //     template: '<p>Some Error Occured!</p>',
                    //     plain: true
                    // });
                })
        }




        $scope.getRegistration();
        $scope.getClass($scope.school_id);
        $scope.getSection($scope.class_id);

    }]).directive('tabs', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: ["$scope", function ($scope) {
                var panes = $scope.panes = [];

                $scope.select = function (pane) {
                    angular.forEach(panes, function (pane) {
                        pane.selected = false;
                    });
                    pane.selected = true;
                };

                this.addPane = function (pane) {
                    if (panes.length == 0) $scope.select(pane);
                    panes.push(pane);
                };
                $scope.$parent.LinkControllers(panes);
            }],
            template: '<div class="tabbable">' +
                '<ul  class="nav nav-tabs">' +
                '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">' +
                '<a style="padding: 10px 64px;" href="" ng-click="select(pane)">{{pane.title}}</a>' +
                '</li>' +
                '</ul>' +
                '<div class="tab-content" ng-transclude></div>' +
                '</div>',
            replace: true
        };
    }).
directive('pane', function () {
    return {
        require: '^tabs',
        restrict: 'E',
        transclude: true,
        scope: {
            title: '@'
        },
        link: function (scope, element, attrs, tabsCtrl) {
            scope.title = attrs.title;
            tabsCtrl.addPane(scope);
        },
        template: '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
            '</div>',
        replace: true
    };
  })
  //.directive('usernameAvailable', function ($timeout, $q, $http, globalServices) {
//     return {
//         restrict: 'AE',
//         require: 'ngModel',
//         link: function (scope, elm, attr, ngModel) {
//             ngModel.$asyncValidators.usernameExists = function (modelValue, viewValue) {
//                 //here you should access the backend, to check if username exists
//                 //and return a promise
//                 // console.log(model.$viewValue);
//                 // console.log(elm);
//                 // var defer = $q.defer();
//                 //  $http({  method: 'POST',
//                 //             url: globalServices.globalValue.baseURL + 'checkemail',
//                 //             data: {email:model.$viewValue},
//                 //             headers: { 'Content-Type': 'application/json'},
//                 //         }).success(function(data, status) {
//                 //             console.log(data);
//                 //             if(data.error == true){
//                 //                  model.$setValidity('usernameExists', true); 
//                 //                  defer.resolve;

//                 //             }else{
//                 //                  model.$setValidity('usernameExists', false); 
//                 //                  defer.resolve;
//                 //             }


//                 // }).error(function(data, status) {
//                 //    model.$setValidity('usernameExists', false); 
//                 //                  defer.reject;
//                 // });
//                   var defer = $q.defer();
//                 $http({
//                     method: 'POST',
//                     url: globalServices.globalValue.baseURL + 'checkemail',
//                     data: {
//                         email: ngModel.$viewValue
//                     },
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                 }).then(function (res) {
//                     console.log(res.data)
//                     $timeout(function () {
//                        ngModel.$setValidity('usernameExists', res.data.error);
//                         if(res.data.error){
//                            defer.resolve;
//                         }else{
//                            defer.reject;
//                         }
                         
//                     }, 1000);
               
//                 });
//               return defer.promise;

//             };
//         }
//     }
// });