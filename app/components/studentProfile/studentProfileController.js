angular.module('school_erp')
    .controller("studentProfileController", ['$http', '$scope', '$rootScope', '$stateParams', 'studentServices', 'globalServices', 'ngDialog', function ($http, $scope, $rootScope, $stateParams, studentServices, globalServices, ngDialog) {
        $scope.studentData = [];

        //$scope.editdata= [];

        //  $scope.getClassesInitalLoad = function () {
        // globalServices.getClass()
        //     .success(function (data, status) {
        //         $scope.classData = data.school_classes;// Api list-name
        //         $scope.classId = $scope.classData[0].class_id;
        //         //console.log(JSON.stringify(data));
        //         $scope.populateSections($scope.classId)

        //     })
        //     .error(function (data, success) {
        //     })
        //  }
        // $scope.populateSections = function (classId) {
        //     globalServices.getSections(classId)
        //         .success(function (data, status) {
        //             $scope.secData = data.class_sections;// Api list-name
        //             $scope.secId = $scope.secData[0].section_id;
        //             //$scope.getStudentValue($scope.secId);
        //             $scope.getStudentById($stateParams.student);
        //             console.log($stateParams.student);
        //         })
        //         .error(function (data, success) {
        //         })
        // }

        // globalServices.getBusRoutes()
        //     .success(function (data, status) {
        //         $scope.routes = data.bus_routes;// Api list-name           
        //     })
        //     .error(function (data, success) {
        //     })


        // $scope.getStudentValue = function (secValue) {
        //     studentServices.getStudent(secValue)
        //         .success(function (data, status) {
        //             $scope.studentData = data.students;
        //             $scope.student_id = $scope.studentData[0].student_id;
        //             //  console.log(JSON.stringify(data));
        //             console.log($scope.student_id);
        //             $scope.getStudentById($scope.student_id);

        //         })
        //         .error(function (data, success) {
        //         })
        // }
        $scope.studentDetails = [];
        // console.log(student);
        $scope.getStudentById = function (student_id) {
            studentServices.getStudentById(student_id)
                .success(function (data, status) {
                    $scope.studentDetails = data.students;
                    $scope.student_id = $scope.studentDetails.student_id;
                    $scope.first_name = $scope.studentDetails.first_name;
                    $scope.last_name = $scope.studentDetails.last_name;
                    $scope.father_name = $scope.studentDetails.parents[0].parent_name;
                    $scope.admission_no = $scope.studentDetails.admission_no;
                    $scope.roll_no = $scope.studentDetails.roll_no;
                    $scope.category = $scope.studentDetails.category;
                    $scope.phone = $scope.studentDetails.phone;
                    $scope.class_id = $scope.studentDetails.class_id;
                    $scope.section = $scope.studentDetails.section_id;
                    //$scope.studentPhoto=globalServices.globalValue.baseURL+$scope.studentDetails.studentImage[0].imagePath;
                    $scope.studentPhoto=globalServices.globalValue.baseURL+"Jellyfish.jpg";
                    console.log($scope.studentPhoto);
                    // $scope.splited=$scope.studentPhoto.split('\\');
                    // $scope.splited =globalServices.globalValue.baseURL+$scope.splited[0]+'/'+$scope.splited[1];
                    //  console.log($scope.splited);
                     //$scope.username.push($scope.splited);
                   // console.log(JSON.stringify(data));
                    //console.log($scope.studentDetails);
                    //console.log($scope.student_id);
                    // console.log($scope.student_name);
                    // $scope.getStudentById($scope.student_id);

                })
                .error(function (data, success) {
                })
        }


        // Role based Display
        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }

        if ($rootScope.role == 'parent') {
            $scope.getStudentById($rootScope.studentId);
            console.log($rootScope.studentId);
            // $scope.studentSelection = $rootScope.student._id;
           

        } else {
            $scope.getStudentById($stateParams.student);
            console.log($stateParams.student);
            // $scope.getClassesInitalLoad();
        }


        // if ($rootScope.role == 'parent') {

        //     $scope.secId = $rootScope.student.section;
        //     $scope.getStudentValue($scope.secId);


        // } else {
        //     $scope.getClassesInitalLoad();
        // }


        // $scope.showRole = function (role) {
        //     return globalServices.fetchRoleAuth(role);
        // }


        // $scope.EditStudent = function (value, student) {

        //     console.log("messsage");
        //     $scope.student = angular.copy($scope.studentData[value]);
        //     $scope.student_id = $scope.student.student_id;
        //     console.log($scope.student_id);
        //     var StudentDetails = {
        //         class_id: $scope.student.class_id,
        //         //parent_name: $scope.parents[0].parent_name,

        //         dob: $scope.student.dob,
        //         gender: $scope.student.gender,
        //         category: $scope.student.category,
        //         phone: $scope.student.phone,

        //     }
        //     console.log(StudentDetails);

        //     $scope.addEditStudent(StudentDetails, $scope.student_id);
        // }

        // $scope.addEditStudent = function (StudentDetails, student_id) {
        //     studentServices.EditStudent(StudentDetails, student_id)
        //         .success(function (data, status) {
        //             // ngDialog.open({
        //             //     template: '<p>Station is Edited Successfully.</p>',
        //             //     plain: true
        //             // });
        //             $scope.editdata = [];
        //             $scope.getStudentValue($scope.secId);
        //         })
        //         .error(function (data, success) {
        //             ngDialog.open({
        //                 template: '<p>Some Error Occured!</p>',
        //                 plain: true
        //             });
        //         })
        // }

        // $scope.DeleteStudent = function (value) {
        //     $scope.editdata = angular.copy($scope.studentData[value]);
        //     $scope.student_id = $scope.editdata.student_id;
        //     console.log($scope.student_id);
        //     studentServices.DeleteStudent($scope.student_id)
        //         .success(function (data, status) {
        //             ngDialog.open({
        //                 template: '<p>Student is Deleted Successfully.</p>',
        //                 plain: true
        //             });
        //             $scope.editdata = [];
        //             $scope.getStudentValue($scope.secId);
        //         })
        //         .error(function (data, success) {
        //             ngDialog.open({
        //                 template: '<p>Some Error Occured!</p>',
        //                 plain: true
        //             });
        //         })
        // }

        // $scope.exportAction = function (option) {
        //     switch (option) {
        //         case 'pdf': $scope.$broadcast('export-pdf', {});
        //             break;
        //         case 'excel': $scope.$broadcast('export-excel', {});
        //             break;
        //         default: console.log('no event caught');
        //     }
        // }
    }])

