angular.module('school_erp')
    .controller("studentController", ['$http', '$scope', '$rootScope', 'studentServices', 'globalServices', 'ngDialog', function ($http, $scope, $rootScope, studentServices, globalServices, ngDialog) {
        $scope.studentData = [];
        $scope.pdf = false;
        //$scope.editdata= [];
        $scope.gender = [{ name: "Male", id: 1 }, { name: "Female", id: 2 }];

        $scope.category = [{ type: "General", id: 1 }, { type: "OBC", id: 2 }, { type: "Minority", id: 3 }];

        globalServices.getClass()
            .success(function (data, status) {
                $scope.classData = data.school_classes;// Api list-name
                $scope.classId = $scope.classData[0].class_id;
                //   console.log(JSON.stringify(data));
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
            $scope.pdf = false;
            studentServices.getStudent(secValue)
                .success(function (data, status) {
                    $scope.studentData = data.students;
                    $scope.studentBox = [];
                    index = 0;
                    $scope.studentData.forEach(function (element) {



                        var obj = {
                            id: index++,
                            student_id: element.student_id,
                            admission_no: element.admission_no, // remove
                            roll_no: element.roll_no, // remove
                            first_name: element.first_name, // remove
                            last_name: element.last_name, // remove
                            gender: element.gender,
                            dob: element.dob,
                            category: element.category,
                            phone: element.phone,
                            class: element.school_classes[0].name,
                            section: element.sections[0].name,
                            parent: element.parents[0].parent_name,
                            image: element.studentImage[0].filename,
                            selected: false,
                          //  status: "none"
                        }
                        $scope.studentBox.push(obj);
                        //console.log($scope.studentBox);
                    })



                    $scope.class_name = $scope.studentData[0].school_classes[0].name;
                    $scope.section_name = $scope.studentData[0].sections[0].name;
                    //   console.log( $scope.class_name);
                    //   console.log(( $scope.section_name));
                })
                .error(function (data, success) {
                })
        }


        $scope.students = [];

        // To Select All for Bulk Attendance report
        $scope.tickAll = function (status) {
            $scope.studentBox.forEach(function (element) {
                if (status) {
                    element.selected = true;
                } else {
                    element.selected = false;
                }
            });
        }






        $scope.sendStudentHolder = [];
        $scope.submitBulkDelete = function () {
            var dataB = $scope.studentBox;
            
            angular.forEach(dataB, function (element){
                if (element.selected == true || element.selected == 'true') {
                   // console.log(element.student_id)
                    var obj = {
                        student_id: element.student_id,
                       // status: value.status
                    }
                    $scope.sendStudentHolder.push(obj);
                }
            }); 


           
            studentServices.setBulkDeleteStudents($scope.sendStudentHolder, $scope.classId, $scope.secId)
                .success(function (data, status) {
                    $scope.sendStudentHolder = [];
                    if (data == false || data == 'false') {
                        ngDialog.open({
                            template: '<p>Students deleted successfully</p>',
                            plain: true
                        });
                        $scope.getStudentValue($scope.secId);
                    }
                    else {
                        ngDialog.open({
                            template: '<p>Students deleted successfully</p>',
                            plain: true
                        });
                        $scope.getStudentValue($scope.secId);
                    }

                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                    $scope.sendStudentHolder = [];
                })
          

        }

        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }


        $scope.generatePDF = function () {
            $scope.pdf = true;
            // console.log("pdf message1");
            html2canvas(document.getElementById('exportthis'), {
                onrendered: function (canvas) {
                    var data = canvas.toDataURL();
                    var docDefinition = {
                        content: [{
                            image: data,
                            width: 480,
                        }]
                    };
                    // console.log("pdf message2");

                    pdfMake.createPdf(docDefinition).download("Students_Report.pdf");
                    $scope.getStudentValue($scope.secId);
                }
            });
        }




        $scope.EditStudent = function (value, student) {

            //console.log("messsage");
            //console.log(value);
            $scope.student = angular.copy($scope.studentBox[value]);
            $scope.student_id = $scope.student.student_id;
            //console.log($scope.student_id);
            var StudentDetails = {
                class_id: $scope.student.class_id,
                //parent_name: $scope.parents[0].parent_name,

                dob: $scope.student.dob,
                gender: $scope.student.gender,
                category: $scope.student.category,
                phone: $scope.student.phone,

            }
            //console.log(StudentDetails);

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
            //   console.log($scope.student_id);
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

