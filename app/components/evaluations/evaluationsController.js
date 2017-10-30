 angular.module('school_erp')
     .controller("evaluationsController", ['$http', '$scope', 'globalServices', 'examServices', 'subjectsServices', 'studentServices', 'ngDialog', function ($http, $scope, globalServices, examServices, subjectsServices, studentServices, ngDialog) {
         $scope.evalData = [];
         $scope.data = {};
         $scope.conduct=[{type:"Poor",id:"Poor"},{type:"Below Average",id:"Below Average"},{type:"Average",id:"Average"},{type:"Above Average",id:"Above Average"},{type:"Good",id:"Good"},{type:"Excellent",id:"Excellent"}];
         globalServices.getClass()
             .success(function (data, status) {
                 $scope.classDatanew = data.school_classes; // Api list-name
                 $scope.data.classId = data.school_classes[0].class_id;
                 $scope.populateSections($scope.data.classId);
             })
             .error(function (data, success) {})

         $scope.getExamSchedule = function () {
             examServices.getExamSchedule()
                 .success(function (data, status) {
                     $scope.examSchedule = data.exam_schedules; // Api list-name
                     $scope.data.examSchedule_name = data.exam_schedules[0].exam_sch_id;
                     // $scope.getExamPapers(  $scope.subjectId, $scope.examScheduleId );
                 })
                 .error(function (data, success) {})
         }

         $scope.getExamSchedule();
         $scope.populateSections = function (classId) {
             globalServices.getSections(classId)
                 .success(function (data, status) {
                     $scope.secData = data.class_sections; // Api list-name
                     $scope.data.secId = data.class_sections[0].section_id;
                     $scope.populateStudentValue($scope.data.secId);
                     $scope.getSubjects($scope.data.secId);
                     $scope.getExamPapers($scope.data.examSchedule_name, $scope.data.secId);
                 })
                 .error(function (data, success) {})
         }

         $scope.populateStudentValue = function (secValue) {
             studentServices.getStudent(secValue)
                 .success(function (data, status) {
                     $scope.students = data.students;
                    $scope.data.studentId = data.students[0].student_id;
                     // $scope.getEvaluation($scope.paperId,  $scope.studentId);
                     $scope.getEvaluation($scope.data.studentId,$scope.data.examSchedule_name);

                 })
                 .error(function (data, success) {})
         }

         $scope.getSubjects = function (secId) {
             console.log("subjects");
             subjectsServices.getSubjects(secId)
                 .success(function (data, status) {
                     $scope.subjectsData = data.subjects;
                     $scope.data.subject_name = data.subjects[0].subject_id;
                 })
                 .error(function (data, success) {});
         }

         //     $scope.getExamSchedule = function(secId) {
         //      examServices.getExamSchedule()
         //     .success(function(data, status){
         //         $scope.examSchedule = data.exam_schedules;// Api list-name
         //         $scope.examScheduleId = data.exam_schedules[0].exam_sch_id;
         //         // $scope.getExamPapers(  $scope.subjectId, $scope.examScheduleId );
         //     })
         //     .error(function(data,success){
         //     })
         // }




         $scope.getExamPapers = function (exSchedule, sectionId) {
             examServices.getExamPapersbySectionAndSchedule(exSchedule, sectionId)
                 .success(function (data, status) {
                 
                     // $scope.papers = data[exSchedule+'-'+examSubject];// Api list-name
                     $scope.papers = data.resultArray;
                     // $scope.paperId = $scope.papers[0].exam_paper_id;
                     $scope.data.paper_name = data.resultArray[0].exam_paper_id;
                     console.log($scope.data.paper_name);
                     $scope.getEvaluation($scope.data.studentId, $scope.data.examSchedule_name);

                 })
                 .error(function (data, success) {})
         }




         $scope.getEvaluation = function (student, scheduleId) {
             examServices.getEvaluation(student, scheduleId)
                 .success(function (data, status) {
                     console.log(JSON.stringify(data));
                     // $scope.evalData = data[examPaper+'-'+student]
                     $scope.evalData = data.resultArray;
                 })
                 .error(function (data, success) {})
         }
         // /api/exam_eval/:exam_paper_id/:student_id

         $scope.addEvaluation = function (data) {
             var evalDetails = {
                 marks: $scope.data.marks,
                 percentage: $scope.data.percentage,
                 conduct: $scope.data.conduct
             }
             examServices.setEvaluation(evalDetails, $scope.data.examSchedule_name, $scope.data.paper_name, $scope.data.studentId, $scope.data.secId, $scope.data.classId)
                 .success(function (data, status) {
                     ngDialog.open({
                         template: '<p>ExamPapers are Added Successfully.</p>',
                         plain: true
                     });
                     $scope.data.marks = "";
                     $scope.data.percentage = "";
                     $scope.data.conduct = "";
                     $scope.getEvaluation($scope.data.studentId, $scope.data.examSchedule_name);
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
                     $scope.getEvaluation($scope.data.studentId, $scope.data.examSchedule_name);
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
                    //  ngDialog.open({
                    //      template: '<p>Station is Edited Successfully.</p>',
                    //      plain: true
                    //  });
                     $scope.editdata = [];
                     $scope.getEvaluation($scope.data.studentId, $scope.data.examSchedule_name);
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
