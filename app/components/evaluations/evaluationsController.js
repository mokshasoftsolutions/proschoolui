angular.module('school_erp')
    .controller("evaluationsController", ['$http', '$scope', 'globalServices', 'examServices', 'subjectsServices', 'studentServices', 'ngDialog', function ($http, $scope, globalServices, examServices, subjectsServices, studentServices, ngDialog) {
        $scope.evalData = [];
        $scope.data = [];
        globalServices.getClass()
            .success(function (data, status) {
                console.log(JSON.stringify(data));
                $scope.classDatanew = data.school_classes;// Api list-name
                $scope.classId = $scope.classDatanew[0].class_id;
                $scope.populateSections($scope.classId);
            })
            .error(function (data, success) {
            })

        $scope.populateSections = function (classId) {
            globalServices.getSections(classId)
                .success(function (data, status) {
                     console.log(JSON.stringify(data));
                    $scope.secData = data.class_sections;// Api list-name
                    $scope.secId = $scope.secData[0].section_id;
                    $scope.getSubjects($scope.secId);
                })
                .error(function (data, success) {
                })
        }

        examServices.getExamSchedule()
            .success(function (data, status) {
                 console.log(JSON.stringify(data));
                $scope.examSchedule = data.exam_schedules;// Api list-name
                $scope.examScheduleId = $scope.examSchedule[0].exam_sch_id;
            })
            .error(function (data, success) {
            })


        $scope.getSubjects = function (secId) {
            subjectsServices.getSubjects(secId)
                .success(function (data, status) {
                     console.log(JSON.stringify(data));
                    $scope.subjectsData = data.subjects;
                    $scope.subjectId = $scope.subjectsData[0].subject_id;
                    $scope.getExamPapers($scope.subjectId, $scope.examScheduleId);


                })
                .error(function (data, success) {
                });
        }

        $scope.getExamPapers = function (examSubject, exSchedule) {
            examServices.getExamPapers(examSubject, exSchedule)
                .success(function (data, status) {
                    console.log("message");
                    console.log(JSON.stringify(data));
                    $scope.papers = data[exSchedule + '-' + examSubject];// Api list-name
                    $scope.paperId = $scope.papers[0].exam_paper_id;
                    $scope.paper_name = $scope.papers[0].exam_paper_title;
                    console.log($scope.paper_name);
                    $scope.getStudentValue($scope.secId);
                })
                .error(function (data, success) {
                })
        }


        $scope.getStudentValue = function (secValue) {
            studentServices.getStudent(secValue)
                .success(function (data, status) {
                     console.log(JSON.stringify(data));
                    $scope.students = data.students;
                    $scope.studentId = $scope.students[0].student_id;
                    $scope.getEvaluation($scope.paperId, $scope.studentId);
                })
                .error(function (data, success) {
                })
        }

        $scope.getEvaluation = function (examPaper, student) {
            examServices.getEvaluation(examPaper, student)
                .success(function (data, status) {
                    console.log(JSON.stringify(data));
                    $scope.evalData = data[examPaper + '-' + student]
                })
                .error(function (data, success) {
                })
        }
        // /api/exam_eval/:exam_paper_id/:student_id

        $scope.addEvaluation = function (data) {
            var evalDetails = {
                subject_name: $scope.data.subject_name,
                examschedule_name: $scope.data.examSchedule_name,
                paper_name: $scope.data.paper_name,
                marks: $scope.data.marks,
                percentage: $scope.data.percentage,
                conduct: $scope.data.conduct,
                comment: $scope.data.comment
            }

            console.log(evalDetails);
            examServices.setEvaluation(evalDetails, $scope.paperId, $scope.studentId)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>ExamPapers are Added Successfully.</p>',
                        plain: true
                    });
                    $scope.data = [];
                    $scope.getEvaluation($scope.paperId, $scope.studentId);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }

        $scope.DeleteEvaluation = function (value) {
            $scope.editdata = angular.copy($scope.evalData[value]);
            $scope.paper_result_id = $scope.editdata.paper_result_id;
            console.log($scope.paper_result_id);
            examServices.DeleteEvaluation($scope.paper_result_id)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Evaluation data is Deleted Successfully.</p>',
                        plain: true
                    });
                    $scope.editdata = [];
                    $scope.getEvaluation($scope.paperId, $scope.studentId, $scope.subjectId, $scope.examScheduleId);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })
        }

        $scope.EditEvaluation = function (value, evaluatievaluationsons) {

            console.log("messsage");
            $scope.evaluations = angular.copy($scope.evalData[value]);
            $scope.paper_result_id = $scope.evaluations.paper_result_id;
            console.log($scope.paper_result_id);
            var EvaluationsDetails = {
                student_name: $scope.evaluations.student_name,
                exam_paper_title: $scope.evaluations.exam_paper_title,
                student_name: $scope.evaluations.student_name,
                student_name: $scope.evaluations.student_name,
                marks: $scope.evaluations.marks,
                percentage: $scope.evaluations.percentage,
                conduct: $scope.evaluations.conduct,
            }
            console.log(EvaluationsDetails);

            $scope.addEditEvaluation(EvaluationsDetails, $scope.paper_result_id);
        }


        $scope.addEditEvaluation = function (EvaluationsDetails, paper_result_id) {
            examServices.EditEvaluation(EvaluationsDetails, paper_result_id)
                .success(function (data, status) {
                    // ngDialog.open({
                    //     template: '<p>Station is Edited Successfully.</p>',
                    //     plain: true
                    // });
                    $scope.editdata = [];
                    $scope.getEvaluation($scope.paperId, $scope.studentId, $scope.subjectId, $scope.examScheduleId);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }

        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
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

                    var workbook = XLSX.read(data, { type: 'binary' });

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
            console.log(JSON.stringify(data));

            $http({
                method: "POST",
                url: "globalServices.globalValue.baseURL + 'api/book/SCH-9271'",
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }

            }).then(function (data) {
                if (data.status) {
                    $scope.msg = "Data has been inserted ! ";
                }
                else {
                    $scope.msg = "Error : Something Wrong2";
                }
            }, function (error) {
                $scope.msg = "Error : Something Wrong3";
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

