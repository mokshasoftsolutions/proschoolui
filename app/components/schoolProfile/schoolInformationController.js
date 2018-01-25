angular.module('school_erp')
    .controller("schoolInformationController", ['$http', '$scope','$rootScope', 'globalServices', 'registrationServices', 'SchoolInformationServices', 'ngDialog', function ($http, $scope,$rootScope, globalServices, registrationServices, SchoolInformationServices, ngDialog) {
        $scope.data = [];



        $scope.addSchoolData = function (data) {
            var school_details = {
                name: $scope.data.name,
                medium: $scope.data.medium,
                est_on: $scope.data.est_on,
                timings: $scope.data.timings,
                facilities_available: $scope.data.facilities_available,
                class_from: $scope.data.class_from,
                afflication: $scope.data.afflication,
                extra_curricular_activites: $scope.data.extra_curricular_activites,
                chairman: $scope.data.chairman,
                founder: $scope.data.founder,
                principal: $scope.data.principal,
                vice_principal: $scope.data.vice_principal,
                coordinator: $scope.data.coordinator,
                academic_year: $scope.data.academic_year,
                website: $scope.data.website,
                email: $scope.data.email,
                phone: $scope.data.phone,
                alternate_phone: $scope.data.alternate_phone,
                address: $scope.data.address,

            }

            registrationServices.setSchoolDetails(school_details)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Vendor details is Added Successfully.</p>',
                        plain: true
                    });
                    $scope.data = [];
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }

        $scope.getSchoolById = function (school_id) {

            registrationServices.getSchoolById(school_id)
                .success(function (data, status) {
                    //     console.log("single school details");
                   // console.log(JSON.stringify(data));
                    $scope.schoolDetails = data.schools;
                    // $rootScope.schoolName=$rootScope.schoolDetails[0].name;
                    //    console.log($scope.schoolName);
                    $scope.schoolImage = globalServices.globalValue.baseURL + 'api/image/' + $scope.schoolDetails[0].SchoolImage[0].filename;

                })
                .error(function (data, success) { })
        }

        $scope.myFunction = function () {
            document.getElementById("schooldata").contentEditable = true;
        }

        $rootScope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }



        // $scope.DeleteSchool_details = function (value) {
        // 	$scope.editdata = angular.copy($scope.data[value]);
        // 	$scope.school_id = $scope.editdata.school_id;

        // 	SchoolInformationServices.DeleteSchool_details($scope.school_id)
        // 		.success(function (data, status) {
        // 			ngDialog.open({
        // 				template: '<p>school is Deleted Successfully.</p>',
        // 				plain: true
        // 			});
        // 			$scope.editdata = [];
        // 			$scope.getSchoolById();
        // 		})
        // 		.error(function (data, success) {
        // 			ngDialog.open({
        // 				template: '<p>Some Error Occured!</p>',
        // 				plain: true
        // 			});
        // 		})
        // }


        $scope.selectedFile = null;

        $scope.loadFile = function (files) {

            //     console.log("messsage1");
            $scope.$apply(function () {

                $scope.selectedFile = files[0];
              
                if ($scope.selectedFile.type != "image/jpeg" && $scope.selectedFile.type != "image/png") {
                    //     ngDialog.open({
                    //         template: '<p> Not a Image File </p>',
                    //         plain: true
                    //     });
                    //    $window.alert("Not a Image File");
                    $scope.message = "Not a Image File !..";
                }


            })

        }

        // Add attendance single
        $scope.editSchoolImage = function () {
          console.log($scope.selectedFile);

            var file = $scope.selectedFile;
            var fd = new FormData();
            fd.append('file', file);

            SchoolInformationServices.editSchoolImage(fd)
                .success(function (data, status) {

                    ngDialog.open({
                        template: '<p> School Image editted successfully </p>',
                        plain: true
                    });
                    $scope.data = [];
                    $scope.selectedFile = null;
                    $scope.getSchoolById(globalServices.globalValue.school_id);

                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })
        }


        $scope.EditSchool_details = function (value, school) {

            $scope.school = angular.copy($scope.schoolDetails[value]);
            var school_details = {

                name: $scope.school.name,
                medium: $scope.school.medium,
                est_on: $scope.school.est_on,
                timings: $scope.school.timings,
                facilities_available: $scope.school.facilities_available,
                class_from: $scope.school.class_from,
                afflication: $scope.school.afflication,
                extra_curricular_activites: $scope.school.extra_curricular_activites,
                chairman: $scope.school.chairman,
                founder: $scope.school.founder,
                principal: $scope.school.principal,
                vice_principal: $scope.school.vice_principal,
                coordinator: $scope.school.coordinator,
                academic_year: $scope.school.academic_year,
                website: $scope.school.website,
                email: $scope.school.email,
                phone: $scope.school.phone,
                alternate_phone: $scope.school.alternate_phone,
                address: $scope.school.address,

            }
            //console.log(JSON.stringify($scope.school));
            // console.log(school_details);
            $scope.school_id = $scope.school.school_id;
            //console.log($scope.school_id);

            $scope.addEditSchool_details(school_details, $scope.school_id);
        }
        $scope.addEditSchool_details = function (school_details, school_id) {
            SchoolInformationServices.EditSchool_details(school_details, school_id)
                .success(function (data, status) {
                    // ngDialog.open({
                    //     template: '<p>session is Edited Successfully.</p>',
                    //     plain: true
                    // });
                    $scope.editdata = [];
                    $scope.getSchoolById(globalServices.globalValue.school_id);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }

        $scope.getSchoolById(globalServices.globalValue.school_id);

    }])

