angular.module('school_erp')
    .controller("studentController", ['$http', '$scope', '$rootScope', 'studentServices', 'globalServices', 'ngDialog', function ($http, $scope, $rootScope, studentServices, globalServices, ngDialog) {
        $scope.studentData = [];
        //$scope.editdata= [];
        $scope.gender = [{ name: "Male", id: 1 }, { name: "Female", id: 2 }];

        $scope.category = [{ type: "General", id: 1 }, { type: "OBC", id: 2 }, { type: "Minority", id: 3 }];
        
        globalServices.getClass()
            .success(function (data, status) {
                $scope.classData = data.school_classes;// Api list-name
                $scope.classId = $scope.classData[0].class_id;
                console.log(JSON.stringify(data));
                $scope.populateSections($scope.classId)

            })
            .error(function (data, success) {
            })

        $scope.populateSections = function (classId) {
            globalServices.getSections(classId)
                .success(function (data, status) {
                    $scope.secData = data.class_sections;// Api list-name
                    $scope.secId = $scope.secData[0].section_id;
                    $scope.getStudentValue($scope.secId);
                })
                .error(function (data, success) {
                })
        }

        globalServices.getBusRoutes()
            .success(function (data, status) {
                $scope.routes = data.bus_routes;// Api list-name           
            })
            .error(function (data, success) {
            })


        $scope.getStudentValue = function (secValue) {
            studentServices.getStudent(secValue)
                .success(function (data, status) {
                    $scope.studentData = data.students;
                    console.log(JSON.stringify(data));
                })
                .error(function (data, success) {
                })
        }

        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }


        $scope.EditStudent = function (value, student) {

            console.log("messsage");
            $scope.student = angular.copy($scope.studentData[value]);
            $scope.student_id = $scope.student.student_id;
            console.log($scope.student_id);
            var StudentDetails = {
                class_id: $scope.student.class_id,
                //parent_name: $scope.parents[0].parent_name,

                dob: $scope.student.dob,
                gender: $scope.student.gender,
                category: $scope.student.category,
                phone: $scope.student.phone,

            }
            console.log(StudentDetails);

            $scope.addEditStudent(StudentDetails, $scope.student_id);
        }

        $scope.addEditStudent = function (StudentDetails, student_id) {
            studentServices.EditStudent(StudentDetails, student_id)
                .success(function (data, status) {
                    // ngDialog.open({
                    //     template: '<p>Station is Edited Successfully.</p>',
                    //     plain: true
                    // });
                    $scope.editdata = [];
                    $scope.getStudentValue($scope.secId);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })
        }

        $scope.DeleteStudent = function (value) {
            $scope.editdata = angular.copy($scope.studentData[value]);
            $scope.student_id = $scope.editdata.student_id;
            console.log($scope.student_id);
            studentServices.DeleteStudent($scope.student_id)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Student is Deleted Successfully.</p>',
                        plain: true
                    });
                    $scope.editdata = [];
                    $scope.getStudentValue($scope.secId);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })
        }

        $scope.exportAction = function (option) {
            switch (option) {
                case 'pdf': $scope.$broadcast('export-pdf', {});
                    break;
                case 'excel': $scope.$broadcast('export-excel', {});
                    break;
                default: console.log('no event caught');
            }
        }
    }])

