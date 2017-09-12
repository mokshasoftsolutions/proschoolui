angular.module('school_erp')
    .controller("assignSbjectsController", ['$http', '$scope', 'assignServices', 'ngDialog', 'globalServices', 'subjectsServices', 'employeeServices', function ($http, $scope, assignServices, ngDialog, globalServices, subjectsServices, employeeServices) {
        $scope.employeeData = [];
        $scope.data = {};
      //  $scope.teachId = '';
        // employeeServices.getEmployee()
        // .success(function(data, status){
        //     $scope.employeeData = data.employee;
        // })
        // .error(function(data,success){
        // })

        globalServices.getClass()
            .success(function (data, status) {
                $scope.classDatanew = data.school_classes;// Api list-name
                $scope.classId = $scope.classDatanew[0].class_id;
                $scope.populateSections($scope.classId);
            })
            .error(function (data, success) {
            })

        $scope.populateSections = function (classId) {
            globalServices.getSections(classId)
                .success(function (data, status) {
                    $scope.secData = data.class_sections;// Api list-name
                    $scope.secId = $scope.secData[0].section_id;
                    $scope.getSubjects($scope.secId);
                })
                .error(function (data, success) {
                })
        }

        $scope.getSubjects = function (secId) {
            subjectsServices.getSubjects(secId)
                .success(function (data, status) {
                    console.log(JSON.stringify(data));
                    $scope.subjectsData = data.subjects;
                    $scope.subjectId = $scope.subjectsData[0].subject_id;
                    console.log($scope.subjectId);

                })
                .error(function (data, success) {
                });
        }

        $scope.getSubName = function (subid) {
            console.log(subid);
            $scope.employeeData.forEach(function (ele) {
                if (ele.subject_id == subid) {
                    return ele.name;
                }
            });
        };

        employeeServices.getEmployee()
            .success(function (data, status) {
                console.log(JSON.stringify(data));
                $scope.employeeData = data.employee;
            })
            .error(function (data, success) {
            })

        $scope.addTeacher = function (data) {
           // console.log(data);


            var teacherDetails = {
                //employee_id:data.teachId.
                //subject_id: $scope.data.subjectObj.subject_id,
                subject_name:$scope.data.subjectObj,
               // employee_id:$scope.data.teachId,
                teacher_name:$scope.data.teachId


            }
            console.log(teacherDetails);


            assignServices.setTeacher(teacherDetails,$scope.secId)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>ExamPapers are Added Successfully.</p>',
                        plain: true
                    });
                    $scope.data = [];
                    $scope.getTeacher($scope.secId);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }
        $scope.getTeacher = function (secId) {

            assignServices.getTeacher(secId)
                .success(function (data, status) {
                    $scope.teacherData = data.teachers;

                    console.log(JSON.stringify(data));
                  //  console.log($scope.teacherData);
                    //$scope.employeeData = data.employee;
                })
                .error(function (data, success) {
                })

        }

        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }
        //$scope.getSubjects();
        $scope.EditAssignSubjects = function (value, teachers) {

            console.log("messsage");
            $scope.teachers = angular.copy($scope.teacherData[value]);
            console.log($scope.teachers);
            $scope.teacher_id = $scope.teachers.teacher_id;
            console.log($scope.teacher_id);
            var TeacherDetails = {
                title: $scope.teachers.subject_name,
                chapter_code: $scope.teachers.teacher_id,
                // subject_name: $scope.chapter.subject_name,
                // description: $scope.chapter.description,
                // no_of_topics: $scope.chapter.no_of_topics,
            }
            console.log(TeacherDetails);

            $scope.addEditAssignSubjects(TeacherDetails, $scope.teacher_id);
        }
        $scope.addEditAssignSubjects = function (TeacherDetails, teacher_id) {
            assignServices.EditAssignSubject(TeacherDetails, teacher_id)
                .success(function (data, status) {
                    // ngDialog.open({
                    //     template: '<p>Station is Edited Successfully.</p>',
                    //     plain: true
                    // });
                    $scope.editdata = [];
                    $scope.getTeacher();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }

        $scope.DeleteAssignSubject = function (value) {
            $scope.editdata = angular.copy($scope.teacherData[value]);
            $scope.teacher_id = $scope.editdata.teacher_id;
            console.log($scope.teacher_id);
            assignServices.DeleteAssignSubject($scope.teacher_id)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Chapter is Deleted Successfully.</p>',
                        plain: true
                    });
                    $scope.editdata = [];
                    $scope.getTeacher();
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
        $scope.getTeacher($scope.secId);

    }])

