angular.module('school_erp')
    .controller("examPapersController", ['$http', '$scope', 'examServices', 'ngDialog', 'globalServices', 'subjectsServices', function ($http, $scope, examServices, ngDialog, globalServices, subjectsServices) {
        $scope.data = {};
         globalServices.getClass()
            .success(function (data, status) {
                $scope.classDatanew = data.school_classes; // Api list-name
                $scope.classId = data.school_classes[0].class_id;
                $scope.populateSections($scope.classId);
                
            })
            .error(function (data, success) {})

            $scope.getExamSchedule = function(){
            examServices.getExamSchedule()
            .success(function (data, status) {
                $scope.examSchedule = data.exam_schedules; // Api list-name
                $scope.examScheduleId = data.exam_schedules[0].exam_sch_id;
                // $scope.getExamPapersbySectionAndSchedule($scope.examScheduleId,$scope.secId);
            })
            .error(function (data, success) {})

        }
        $scope.getExamSchedule();

        $scope.populateSections = function (classId) {
            $scope.classId = classId;
            globalServices.getSections(classId)
                .success(function (data, status) {
                    $scope.secData = data.class_sections; // Api list-name
                    $scope.secId = data.class_sections[0].section_id;
                    $scope.getSubjects($scope.secId);
                    $scope.getExamPapersbySectionAndSchedule($scope.examScheduleId,$scope.secId);
                })
                .error(function (data, success) {})
        }

         $scope.getExamPapersbySectionAndSchedule = function (exSchedule,sectionId) {
             $scope.examScheduleId = exSchedule;
            examServices.getExamPapersbySectionAndSchedule(exSchedule,sectionId)
                .success(function (data, status) {
                    $scope.examData = data.resultArray;
                     console.log(JSON.stringify(data));

                })
                .error(function (data, success) {});
        }

        // $scope.populateExams = function (examScheduleId,classId) {
        //     $scope.examScheduleId = examScheduleId;
        //     $scope.getExamPapersbySectionAndSchedule(examScheduleId,$scope.classId);
        // }
        $scope.getExamSchedule = function(){
            examServices.getExamSchedule()
            .success(function (data, status) {
                $scope.examSchedule = data.exam_schedules; // Api list-name
                $scope.examScheduleId = data.exam_schedules[0].exam_sch_id;
                // $scope.getExamPapersbySectionAndSchedule($scope.examScheduleId,$scope.secId);
            })
            .error(function (data, success) {})

        }
        $scope.getExamSchedule();
        
 

        $scope.addExamPapers = function (data,subjectId, examScheduleId,classId,secId) {
            var examDetails = {
                subject_name: $scope.data.subject_name,
                exam_paper_title: $scope.data.exam_paper_title,
                date: $scope.data.date,
                start_time: $scope.data.time_from,
                end_time: $scope.data.time_to,
                max_marks: $scope.data.max_marks
            }
            // console.log($scope.examScheduleId, $scope.secId,  $scope.classId)
            //   console.log(data,subjectId, examScheduleId,classId,secId)
            examServices.setExamPapers(examDetails, subjectId, examScheduleId,classId,secId)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>ExamPapers are Added Successfully.</p>',
                        plain: true
                    });
                    $scope.data = {};
                    $scope.getExamPapersbySectionAndSchedule($scope.examScheduleId,$scope.secId);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }

        $scope.getSubjects = function (secId) {
            subjectsServices.getSubjects(secId)
                .success(function (data, status) {
                   ;
                    $scope.subjectsData = data.subjects;
                    $scope.data.subjectId = data.subjects[0].subject_id;
                    
                    // $scope.getExamPapersbySectionAndSchedule($scope.subjectId, $scope.examScheduleId);
                })
                .error(function (data, success) {});
        }

        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }

        $scope.EditExamPapers = function (value, exam) {

            // console.log("messsage");
            $scope.exam = angular.copy($scope.examData[value]);
            $scope.exam_paper_id = $scope.exam.exam_paper_id;
            // console.log($scope.exam_paper_id);
            var Exam_PaperDetails = {
                subject_name: $scope.exam.subject_name,
                exam_paper_title: $scope.exam.exam_paper_title,
                max_marks: $scope.exam.max_marks,
                date: $scope.exam.date,
                start_time: $scope.exam.start_time,
                end_time: $scope.exam.end_time
            }
            // console.log(Exam_PaperDetails);

            $scope.addEditExamPapers(Exam_PaperDetails, $scope.exam_paper_id);
        }
        $scope.addEditExamPapers = function (Exam_PaperDetails, exam_paper_id) {
            examServices.EditExamPapers(Exam_PaperDetails, exam_paper_id)
                .success(function (data, status) {
                    // console.log(JSON.stringify(data));
                    // ngDialog.open({
                    //     template: '<p>Station is Edited Successfully.</p>',
                    //     plain: true
                    // });
                    $scope.editdata = [];
                    $scope.getExamPapersbySectionAndSchedule( $scope.examScheduleId,$scope.secId);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }

        $scope.DeleteExamPapers = function (value) {
            $scope.editdata = angular.copy($scope.examData[value]);
            $scope.exam_paper_id = $scope.editdata.exam_paper_id;
            // console.log($scope.exam_paper_id);
            examServices.DeleteExamPapers($scope.exam_paper_id)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Exam Paper is Deleted Successfully.</p>',
                        plain: true
                    });
                    $scope.editdata = [];
                    $scope.getExamPapersbySectionAndSchedule( $scope.examScheduleId,$scope.secId);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })
        }


        $scope.selectedFile = null;
        $scope.msg = "";


        $scope.loadFile = function (files) {

            $scope.$apply(function () {

                $scope.selectedFile = files[0];

            })

        }

        $scope.handleFile = function () {

            var file = $scope.selectedFile;

            if (file) {

                var reader = new FileReader();

                reader.onload = function (e) {

                    var data = e.target.result;

                    var workbook = XLSX.read(data, {
                        type: 'binary'
                    });

                    var first_sheet_name = workbook.SheetNames[0];

                    var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);

                    //console.log(excelData);  

                    if (dataObjects.length > 0) {


                        $scope.save(dataObjects);


                    } else {
                        $scope.msg = "Error : Something Wrong1 !";
                    }

                }

                reader.onerror = function (ex) {

                }

                reader.readAsBinaryString(file);
            }
        }


        $scope.save = function (data) {
            // console.log(JSON.stringify(data));

            $http({
                method: "POST",
                url: globalServices.globalValue.baseURL + 'api/book/'+globalServices.globalValue.school_id,
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }

            }).then(function (data) {
                if (data.status) {
                    $scope.msg = "Data has been inserted ! ";
                } else {
                    $scope.msg = "Error : Something Wrong2";
                }
            }, function (error) {
                $scope.msg = "Error : Something Wrong3";
            })

        }
        $scope.exportAction = function (option) {
            switch (option) {
                case 'pdf':
                    $scope.$broadcast('export-pdf', {});
                    break;
                case 'excel':
                    $scope.$broadcast('export-excel', {});
                    break;
                default:
                    console.log('no event caught');
            }
        }
    }])
