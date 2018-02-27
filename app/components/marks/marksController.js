angular.module('school_erp')
    .controller("marksController", ['$http', '$scope', '$rootScope', 'globalServices', 'subjectsServices', 'chaptersServices', 'studentServices', 'assignmentsServices', 'marksServices', 'ngDialog', function ($http, $scope, $rootScope, globalServices, subjectsServices, chaptersServices, studentServices, assignmentsServices, marksServices, ngDialog) {
        $scope.data = [];
        $scope.chapterId = '';


        $scope.getClassesInitalLoad = function () {
            globalServices.getClass()
                .success(function (data, status) {
                    $scope.classData = data.school_classes;// Api list-name
                    $scope.classId = $scope.classData[0].class_id;
                    $scope.populateSections($scope.classId)
                    //   console.log(JSON.stringify(data));

                })
                .error(function (data, success) {
                })
        }



        $scope.populateSections = function (classId) {
            $scope.secData = [];
            globalServices.getSections(classId)
                .success(function (data, status) {
                    $scope.secData = data.class_sections; // Api list-name
                    $scope.secId = $scope.secData[0].section_id;
                    // console.log($scope.secId);
                    $scope.populateSubjects($scope.secId);
                    $scope.getStudentValue($scope.secId);

                })
                .error(function (data, success) {

                    $scope.populateSubjects($scope.secId);
                })
        }

        $scope.populateSubjects = function (secId) {
            $scope.subData = [];
            subjectsServices.getSubjects(secId)
                .success(function (data, status) {
                    $scope.subData = data.subjects;
                    $scope.subId = $scope.subData[0].subject_id;
                    $scope.populateChapters($scope.subId);

                })
                .error(function (data, success) {
                });
        }

        $scope.populateChapters = function (subId) {
            $scope.subId = subId;
            $scope.chapterData = [];
            chaptersServices.getChapters(subId)
                .success(function (data, status) {
                    //  console.log(JSON.stringify(data));
                    //   console.log(subId)
                    $scope.chapterData = data.chapters;
                    $scope.chapterId = $scope.chapterData[0].lession_id;
                    // console.log($scope.chapterId);
                    $scope.getAssignments($scope.secId, $scope.chapterId);
                })
                .error(function (data, success) {
                });
        }

        $scope.getStudentValue = function (secId) {
            studentServices.getStudent(secId)
                .success(function (data, status) {
                    $scope.studentData = data.students;
                    //      console.log(JSON.stringify(data));

                    $scope.marksBox = [];
                    $scope.marksStatus();
                })
                .error(function (data, success) {
                })
        }


        $scope.getAssignments = function (secId, chapterId) {
            //$scope.chapterId = chapterId;
            //   console.log(secId);
            //  console.log(chapterId);
            $scope.assignmentsData = [];
            assignmentsServices.getAssignments(secId, chapterId)
                .success(function (data, status) {
                    //      console.log(JSON.stringify(data));

                    $scope.assignmentsData = data.assignments;
                    $scope.assignId = $scope.assignmentsData[0].assignment_id;
                    $scope.getMarks($scope.secId, $scope.subId, $scope.chapterId, $scope.assignId);
                    // console.log($scope.assignmentsData);

                })
                .error(function (data, success) {
                });

        }

        // Mark bulk marks status
        $scope.markBulkMarks = function (marks, percentage, conduct) {
            $scope.marksBox.forEach(function (element) {
                if (element.selected) {
                    element.marks = marks;
                    element.percentage = percentage;
                    element.conduct = conduct;
                }
            });
        }


        $scope.marksStatus = function () {
            $scope.studentData.forEach(function (element) {
                var obj = {
                    student_id: element.student_id,
                    admission_no: element.admission_no, // remove
                    roll_no: element.roll_no, // remove
                    first_name: element.first_name, // remove
                    last_name: element.last_name, // remove
                    selected: false,
                    marks: "",


                }
                $scope.marksBox.push(obj);
            });
        }




        $scope.sendMarksHolder = [];
        $scope.addBulkMarks = function (secId, subId, chapterId, assignId) {
            //   console.log("message1");

            var dataB = $scope.marksBox;
            var allowSubmission = false;
            var i = 0;
            var filterBox = dataB.filter(function (data) {
                return data.marks == '';
            })
            //  console.log("m2")
            //  console.log($scope.marksBox);
            if (filterBox.length == 0) {

                angular.forEach($scope.marksBox, function (value, key) {
                    var obj = {
                        student_id: value.student_id,
                        marks: value.marks,


                    }
                    $scope.sendMarksHolder.push(obj);
                })
                //   console.log("m3")
                //   console.log($scope.sendMarksHolder);



                marksServices.setBulkMarks($scope.sendMarksHolder, secId, subId, chapterId, assignId)
                    .success(function (data, status) {
                        $scope.sendMarksHolder = [];
                        if (data == false || data == 'false') {
                            ngDialog.open({
                                template: '<p>Marks Already Added</p>',
                                plain: true
                            });
                            $scope.sendMarksHolder = [];
                            //$scope.student.marks='';
                            //  $scope.marksBox = [];
                        }
                        else {
                            ngDialog.open({
                                template: '<p> Marks  Added successfully </p>',
                                plain: true
                            });
                           
                            $scope.marksBox.marks = "";
                        }
                        //$scope.student.marks='';
                       




                        $scope.getMarks($scope.secId, $scope.subId, $scope.chapterId, $scope.assignId);
                    })
                    .error(function (data, success) {
                        ngDialog.open({
                            template: '<p>Some Error Occured!</p>',
                            plain: true
                        });
                        $scope.sendMarksHolder = [];
                    })
            } else {
                ngDialog.open({
                    template: '<p> Few text boxes are not filled properly</p>',
                    plain: true
                });
            }

        }








        $scope.getMarks = function (secId, subId, chapterId, assignId) {
            //   console.log("msg");
            marksServices.getMarks(secId, subId, chapterId, assignId)
                .success(function (data, status) {
                    //  console.log(JSON.stringify(data));

                    $scope.marks = data.assignment_marks;
                    $scope.marksData = [];
                    index = 0;
                    $scope.marks.forEach(function (element) {

                        var obj = {
                            id: index++,
                            assignment_result_id: element.assignment_result_id,
                            first_name: element.first_name,
                            last_name: element.last_name,
                            subject_name: element.subject_name,
                            chapter_name: element.chapter_name,
                            assignment_name: element.assignment_name,
                            marks: element.marks


                        }
                        $scope.marksData.push(obj);
                        //console.log($scope.marksData);
                    })

                })
                .error(function (data, success) {
                });

        }

        $scope.getMarksByStudent = function (subId, student_id) {
            //    console.log("msg");
            marksServices.getMarksByStudent(subId, student_id)
                .success(function (data, status) {
                    //    console.log(JSON.stringify(data));

                    $scope.marksData = data.assignment_marks;
                })
                .error(function (data, success) {
                });

        }


        $scope.EditMarks = function (value, marks) {

            //      console.log("messsage");
            $scope.marks = angular.copy($scope.marksData[value]);
            $scope.assignment_result_id = $scope.marks.assignment_result_id;
            //    console.log($scope.assignment_result_id);
            var AssignmentDetails = {
                marks: $scope.marks.marks

            }
            //    console.log(AssignmentDetails);

            $scope.addEditMarks(AssignmentDetails, $scope.assignment_result_id);
        }
        $scope.addEditMarks = function (AssignmentDetails, assignment_result_id) {
            marksServices.EditMarks(AssignmentDetails, assignment_result_id)
                .success(function (data, status) {
                    // ngDialog.open({
                    //     template: '<p>Station is Edited Successfully.</p>',
                    //     plain: true
                    // });
                    $scope.editdata = [];
                    $scope.getMarks($scope.secId, $scope.subId, $scope.chapterId, $scope.assignId);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }

        $scope.DeleteMarks = function (value) {
            $scope.editdata = angular.copy($scope.marksData[value]);
            $scope.assignment_result_id = $scope.editdata.assignment_result_id;
            //     console.log($scope.assignment_result_id);
            marksServices.DeleteMarks($scope.assignment_result_id)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>AssignmentMarks is Deleted Successfully.</p>',
                        plain: true
                    });
                    $scope.editdata = [];
                    $scope.getMarks($scope.secId, $scope.subId, $scope.chapterId, $scope.assignId);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })
        }
        // Role based Display
        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }



        // $scope.exportAction = function (option) {
        //     switch (option) {
        //         case 'pdf': $scope.$broadcast('export-pdf', {});
        //             break;
        //         case 'excel': $scope.$broadcast('export-excel', {});
        //             break;
        //         default: console.log('no event caught');
        //     }
        // }

        // $scope.getMarks($scope.secId,$scope.subId, $scope.chapterId,$scope.assignId);
        if ($rootScope.role == 'parent') {

            $scope.student_id = $rootScope.student.student_id;
            $scope.secId = $rootScope.student.section_id;
            subjectsServices.getSubjects($scope.secId)
                .success(function (data, status) {
                    $scope.subData = data.subjects;
                    $scope.subId = $scope.subData[0].subject_id;

                    $scope.getMarksByStudent($scope.subId, $scope.student_id);
                })
                .error(function (data, success) {
                });

        } else {
            $scope.getClassesInitalLoad();
        }

    }])

















