angular.module('school_erp')
    .controller("examSchedulesController", ['$http', '$scope', 'examServices', 'ngDialog', 'globalServices', function ($http, $scope, examServices, ngDialog, globalServices) {
        $scope.examData = [];
        $scope.today1 = '01/01/1975';
        $scope.data = [];

        globalServices.getClass()
            .success(function (data, status) {
                $scope.classData = data.school_classes;// Api list-name
                $scope.classId = $scope.classData[0].class_id;
                $scope.populateSections($scope.classId)

            })
            .error(function (data, success) {
            })

        $scope.populateSections = function (classId) {
            globalServices.getSections(classId)
                .success(function (data, status) {
                    $scope.secData = data.class_sections;// Api list-name
                    $scope.secId = $scope.secData[0].section_id;
                })
                .error(function (data, success) {
                })
        }

        $scope.populateExams = function (secId) {
            $scope.getExamPapers($scope.secId);
        }
        $scope.getExamScheduleData = function () {
            examServices.getExamSchedule()
                .success(function (data, status) {
                    $scope.examData = data.exam_schedules;
                })
                .error(function (data, success) {
                })
        }

        $scope.addExamSchedule = function (data) {
            var examDetails = {
                exam_title: $scope.data.exam_title,
                exam_classes: $scope.data.exam_classes,
                from_date: $scope.data.from_date
            }
            examServices.setExamSchedule(examDetails)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>ExamSchedules are Added Successfully.</p>',
                        plain: true
                    });
                    $scope.data = [];
                    $scope.getExamScheduleData();
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


        $scope.EditExamSchedule = function (value, exam) {

            console.log("messsage");
            $scope.exam = angular.copy($scope.examData[value]);
            $scope.exam_sch_id = $scope.exam.exam_sch_id;
            console.log($scope.exam_sch_id);
            var Exam_SchDetails = {
                exam_title: $scope.exam.exam_title,
                exam_classes: $scope.exam.exam_classes,
                from_date: $scope.exam.from_date
            }
            console.log(Exam_SchDetails);

            $scope.addEditExamSchedule(Exam_SchDetails, $scope.exam_sch_id);
        }
        $scope.addEditExamSchedule = function (Exam_SchDetails, exam_sch_id) {
            examServices.EditExamSchedule(Exam_SchDetails, exam_sch_id)
                .success(function (data, status) {
                    // ngDialog.open({
                    //     template: '<p>Station is Edited Successfully.</p>',
                    //     plain: true
                    // });
                    $scope.editdata = [];
                    $scope.getExamScheduleData();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }

        $scope.getExamScheduleData();





        $scope.selectedFile = null;
        $scope.msg = "";


        $scope.loadFile = function (files) {

            $scope.$apply(function () {

                $scope.selectedFile = files[0];

            })

        }

        $scope.DeleteExamSchedule = function (value) {
            $scope.editdata = angular.copy($scope.examData[value]);
            $scope.exam_sch_id = $scope.editdata.exam_sch_id;
            console.log($scope.exam_sch_id);
            examServices.DeleteExamSchedule($scope.exam_sch_id)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Exam Schedule is Deleted Successfully.</p>',
                        plain: true
                    });
                    $scope.editdata = [];
                    $scope.getExamScheduleData();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
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
                url: globalServices.globalValue.baseURL + 'api/book/'+globalServices.globalValue.school_id,
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

