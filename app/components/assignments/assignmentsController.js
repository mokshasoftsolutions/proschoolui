angular.module('school_erp')
    .controller("assignmentsController", ['$http', '$scope', '$rootScope', 'globalServices', 'subjectsServices', 'assignmentsServices', 'chaptersServices', 'ngDialog', function ($http, $scope, $rootScope, globalServices, subjectsServices, assignmentsServices, chaptersServices, ngDialog) {
        $scope.data = [];
        $scope.chapterId = '';


        $scope.getClassesInitalLoad = function () {
            globalServices.getClass()
                .success(function (data, status) {
                    $scope.classData = data.school_classes;// Api list-name
                    $scope.classId = $scope.classData[0].class_id;
                    $scope.populateSections($scope.classId)

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
                    console.log($scope.secId);
                    $scope.populateSubjects($scope.secId);

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
                    console.log(JSON.stringify(data));
                    console.log(subId)
                    $scope.chapterData = data[subId + ""];
                    $scope.chapterId = $scope.chapterData[0].lession_id;
                    console.log($scope.chapterId);
                    $scope.getAssignments($scope.secId, $scope.chapterId);
                })
                .error(function (data, success) {
                });
        }


        $scope.getAssignments = function (secId, chapterId) {
            //$scope.chapterId = chapterId;
         console.log(secId);
         console.log(chapterId);
            assignmentsServices.getAssignments(secId, chapterId)
                .success(function (data, status) {
                    console.log(JSON.stringify(data));

                 $scope.assignmentsData = data.assignments;

                    // console.log($scope.assignmentsData);

                })
                .error(function (data, success) {
                });
        }


        $scope.addAssignments = function (data) {
            //console.log($scope.chapterId + "lesson");
            var assignDetails = {
                assignment_title: $scope.data.assignment_title,
               // chapter_name: $scope.data.chapter_name,
                due_date: $scope.data.due_date,
                description: $scope.data.description
            }
            assignmentsServices.setAssignments(assignDetails, $scope.secId, $scope.chapterId)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Assignments are Added Successfully.</p>',
                        plain: true
                    });
                    $scope.data = [];
                    $scope.getAssignments($scope.secId, $scope.chapterId);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }

        $scope.EditAssignments = function (value, assignment) {

            console.log("messsage");
            $scope.assignment = angular.copy($scope.assignmentsData[value]);
            $scope.assignment_id = $scope.assignment.assignment_id;
            console.log($scope.assignment_id);
            var AssignmentDetails = {
                assignment_title: $scope.assignment.assignment_title,
                chapter_name: $scope.assignment.chapter_name,
                due_date: $scope.assignment.due_date,
                description: $scope.assignment.description,
            }
            console.log(AssignmentDetails);

            $scope.addEditAssignments(AssignmentDetails, $scope.assignment_id);
        }
        $scope.addEditAssignments = function (AssignmentDetails, assignment_id) {
            assignmentsServices.EditAssignments(AssignmentDetails, assignment_id)
                .success(function (data, status) {
                    // ngDialog.open({
                    //     template: '<p>Station is Edited Successfully.</p>',
                    //     plain: true
                    // });
                    $scope.editdata = [];
                    $scope.getAssignments($scope.secId, $scope.chapterId);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }

        $scope.DeleteAssignments = function (value) {
            $scope.editdata = angular.copy($scope.assignmentsData[value]);
            $scope.assignment_id = $scope.editdata.assignment_id;
            console.log($scope.exam_sch_id);
            assignmentsServices.DeleteAssignments($scope.assignment_id)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Assignment is Deleted Successfully.</p>',
                        plain: true
                    });
                    $scope.editdata = [];
                    $scope.getAssignments($scope.secId, $scope.chapterId);
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


        $scope.data = [{ "agence": "CTM", "secteur": "Safi", "statutImp": "operationnel" }];
        $scope.export = function () {

            html2canvas(document.getElementById('exportthis'), {
                onrendered: function (canvas) {
                    var data = canvas.toDataURL();
                    var docDefinition = {
                        content: [{
                            //image: data,
                            //image: 'data:image/png;base64,...encodedContent...',
                            image: 'data/image1.png',
                            height: 150,
                            width: 500,
                        }]
                    };
                    pdfMake.createPdf(docDefinition).download("Score_Details.pdf");
                }
            });
        }

        // html2canvas(document.getElementById('exportthis'), {
        //     onrendered: function (canvas) {
        // $scope.getAssignments = function (chapterId) {
        //     console.log($scope.chapterId);
        //     assignmentsServices.getAssignments($scope.chapterId, $scope.secId)
        //         .success(function (data, status) {
        //             console.log(status);
        //             $scope.assignmentsData = data.assignments;

        //         })
        //         .error(function (data, success) {
        //         });
        // }
        //         var data = canvas.toDataURL();
        //         var docDefinition = {
        //             content: [{
        //                 image: data,
        //                 width: 500,
        //             }]
        //         };
        //         pdfMake.createPdf(docDefinition).download("test.pdf");
        //     }
        // });




       $scope.selectedFile = null;
        $scope.msg = "";


        $scope.loadFile = function (files) {

            console.log("messsage1");
            $scope.$apply(function () {

                $scope.selectedFile = files[0];
                // console.log(file);
            })

        }

        $scope.handleFile = function () {
            console.log("messsage2");
            var file = $scope.selectedFile;
            console.log(file);
            $scope.save(file);


            // if (file) {

            //     var reader = new FileReader();

            //     reader.onload = function (e) {

            //         var data = e.target.result;

            //         var workbook = XLSX.read(data, { type: 'binary' });

            //         var first_sheet_name = workbook.SheetNames[0];

            //         var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);

            //         //console.log(excelData);  

            //         if (dataObjects.length > 0) {


            //             $scope.save(dataObjects);


            //         } else {
            //             $scope.msg = "Error : Something Wrong1 !";
            //         }

            //     }

            //     reader.onerror = function (ex) {

            //     }

            //     reader.readAsBinaryString(file);
            // }
        }


        $scope.save = function (file) {
            console.log("messsage3");
            console.log(file);

            var fd = new FormData();
            fd.append('file', file);
           // fd.append('data', 'string');
            $http.post(globalServices.globalValue.baseURL+'api/upload_books/'+globalServices.globalValue.school_id, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
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
           

        $scope.exportAction = function (option) {
            switch (option) {
                case 'pdf': $scope.$broadcast('export-pdf', {});
                    break;
                case 'excel': $scope.$broadcast('export-excel', {});
                    break;
                default: console.log('no event caught');
            }
        }

        if ($rootScope.role == 'parent') {

            $scope.secId = $rootScope.student.section;
            $scope.populateSubjects($scope.secId);


        } else {
            $scope.getClassesInitalLoad();
        }

    }])

