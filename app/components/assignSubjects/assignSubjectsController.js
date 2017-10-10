angular.module('school_erp')
    .controller("assignSbjectsController", ['$http', '$scope', 'assignServices', 'ngDialog', 'globalServices', 'subjectsServices', 'employeeServices', function ($http, $scope, assignServices, ngDialog, globalServices, subjectsServices, employeeServices) {
        $scope.employeeData = [];
        $scope.teacherData = [];
        $scope.subjects = [];
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
            $scope.secData = [];
            globalServices.getSections(classId)
                .success(function (data, status) {
                    $scope.secData = data.class_sections;// Api list-name
                    $scope.secId = $scope.secData[0].section_id;
                    $scope.getTeacher($scope.secId);
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

        var arrTeacher = new Array();
        employeeServices.getEmployee()
            .success(function (data, status) {
             //   console.log(JSON.stringify(data));
                $scope.employeeData = data.employee;

                $scope.array = $.map($scope.employeeData, function (item) {
                    //console.log(item);
                    //$scope.item=null;
                    if (item.job_category == "teaching") {
                        var id = item.employee_id;
                        var name = item.first_name + ' ' + item.last_name;
                        console.log(name);
                        console.log(id);
                        arrTeacher.push(name);
                        // arrTeacher.push(id);

                        $scope.teachers = [];
                        for (var i = 0; i < arrTeacher.length; i++) {
                            $scope.teachers.push(arrTeacher[i]);
                        }
                        console.log("message");
                        console.log($scope.teachers);
                        // $scope.present = ($scope.data1).length;
                        // console.log($scope.present);
                    }
                    return;
                });


                // $scope.empType=$scope.employeeData[0].job_category;
                // console.log($scope.empType);
            })
            .error(function (data, success) {
            })

        $scope.addTeacher = function (data) {
            console.log("message");


            var teacherDetails = {
                section_id: $scope.secId,
                //employee_id:data.teachId.
                //subject_id: $scope.data.subjectObj.subject_id,
                subject_name: $scope.data.subjectObj,
                employee_id: $scope.data.teachId,
                // teacher_name:$scope.data.teachId


            }
            console.log(teacherDetails);


            assignServices.setTeacher(teacherDetails)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Subjects are Added Successfully.</p>',
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
                    // $scope.subjects = $scope.teacherData[0].subjects;
                    //   console.log($scope.subjects);
                    //$scope.employeeData = data.employee;
                })
                .error(function (data, success) {
                })

        }

        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }
        //$scope.getSubjects();
        // $scope.EditAssignSubjects = function (value, teachers) {

        //     console.log("messsage");
        //     $scope.teachers = angular.copy($scope.teacherData[value]);
        //     console.log($scope.teachers);
        //     $scope.teacher_id = $scope.teachers.teacher_id;
        //     console.log($scope.teacher_id);
        //     var TeacherDetails = {
        //         title: $scope.teachers.subject_name,
        //         chapter_code: $scope.teachers.teacher_id,
        //         // subject_name: $scope.chapter.subject_name,
        //         // description: $scope.chapter.description,
        //         // no_of_topics: $scope.chapter.no_of_topics,
        //     }
        //     console.log(TeacherDetails);

        //     $scope.addEditAssignSubjects(TeacherDetails, $scope.teacher_id);
        // }
        // $scope.addEditAssignSubjects = function (TeacherDetails, teacher_id) {
        //     assignServices.EditAssignSubject(TeacherDetails, teacher_id)
        //         .success(function (data, status) {
        //             // ngDialog.open({
        //             //     template: '<p>Station is Edited Successfully.</p>',
        //             //     plain: true
        //             // });
        //             $scope.editdata = [];
        //             $scope.getTeacher();
        //         })
        //         .error(function (data, success) {
        //             ngDialog.open({
        //                 template: '<p>Some Error Occured!</p>',
        //                 plain: true
        //             });
        //         })

        // }

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
                    $scope.getTeacher($scope.secId);
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
            $http.post(globalServices.globalValue.baseURL+'api/upload_books/SCH-9271', fd, {
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
        $scope.getTeacher($scope.secId);

    }])

