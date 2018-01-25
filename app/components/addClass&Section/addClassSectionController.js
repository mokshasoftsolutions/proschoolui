
angular.module('school_erp')
    .controller("addClassSectionController", ['$http', '$scope', '$window', 'ngDialog', 'registrationServices', 'globalServices', 'studentServices', function ($http, $scope, $window, ngDialog, registrationServices, globalServices, studentServices) {


        studentServices.getTeacherListBySchool()
            .success(function (data, status) {
                //  console.log(JSON.stringify(data));
                $scope.teacherList = data.teachers;// Api list-name

                //    console.log($scope.teacherList);

            })
            .error(function (data, success) {
            })


        $scope.getClass = function (school_id) {
            //   console.log(school_id);

            registrationServices.getClass(school_id)
                .success(function (data, status) {
                    //console.log(JSON.stringify(data));
                    $scope.classData = data.school_classes;
                    $scope.class_id = $scope.classData[0].class_id;
                    $scope.classBox = [];
                    index = 0;
                    $scope.classData.forEach(function (element) {

                        var obj = {
                            id: index++,
                            class_id: element.class_id,
                            name: element.name


                        }
                        $scope.classBox.push(obj);
                        //console.log($scope.classBox);
                    })

                    //  console.log($scope.class_id);

                })
                .error(function (data, success) { })
        }


        $scope.addClass = function (value) {
            // console.log("message");
            //console.log(JSON.stringify(value));
            var ClassData = {
                name: $scope.value.name

            }
            //console.log(ClassData);

            registrationServices.setClass(ClassData, globalServices.globalValue.school_id)
                .success(function (data, status) {

                    ngDialog.open({
                        template: '<p> Class Added successfully </p>',
                        plain: true
                    });
                    //$scope.value = [];

                    $scope.getClass(globalServices.globalValue.school_id);
                })
                .error(function (data, success) {
                    // ngDialog.open({
                    //     template: '<p>Some Error Occured!</p>',
                    //     plain: true
                    // });
                })
        }

        $scope.EditClass = function (value, className) {

            // console.log("messsage");
            $scope.className = angular.copy($scope.classBox[value]);
            $scope.class_id = $scope.className.class_id;
            // console.log($scope.exam_paper_id);
            var class_details = {
                name: $scope.className.name,

            }
          //  console.log(class_details);

            $scope.addEditClass(class_details, $scope.class_id);
        }
        $scope.addEditClass = function (class_details, class_id) {
            registrationServices.editClass(class_details, class_id)
                .success(function (data, status) {
                    // console.log(JSON.stringify(data));
                    // ngDialog.open({
                    //     template: '<p>class is Edited Successfully.</p>',
                    //     plain: true
                    // });
                    $scope.editdata = [];
                    $scope.getClass(globalServices.globalValue.school_id);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }



        $scope.DeleteClass = function (value) {
            // console.log("message");
            $scope.editdata = angular.copy($scope.classBox[value]);
            //  console.log($scope.editdata.class_id + " Hema")
            $scope.class_id = $scope.editdata.class_id;
            //   console.log($scope.class_id + "Babu");
            registrationServices.DeleteClass($scope.class_id)

                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Class is Deleted Successfully.</p>',
                        plain: true
                    });
                    $scope.editdata = [];
                    $scope.getClass(globalServices.globalValue.school_id);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })
        }

        $scope.getSection = function (class_id) {

            registrationServices.getSectionByClassID(class_id)
                .success(function (data, status) {
                   // console.log(JSON.stringify(data));
                    $scope.secData = data.class_sections;


                    $scope.sectionBox = [];
                    index = 0;
                    $scope.secData.forEach(function (element) {

                        var obj = {
                            id: index++,
                            class_id: element.class_id,
                            section_id: element.section_id,
                            class_name: element.class_name,
                            section_name: element.section_name,
                            teacher_name: element.teacher_name


                        }
                        $scope.sectionBox.push(obj);
                       // console.log("mesaage for section");
                        //console.log($scope.sectionBox);
                    })
                    // console.log($scope.secData+"hema");
                    $scope.getClass(globalServices.globalValue.school_id);
                })
                .error(function (data, success) { })
        }
        $scope.addSection = function (sectionName, class_id) {
           // console.log("message");
            $scope.class_id = class_id;
            //console.log(JSON.stringify(value));
            var SectionData = {
                name: $scope.sectionName.section_name,
                teacher_name: $scope.sectionName.teacher_name

            }
            // console.log(SectionData);

            registrationServices.setSection(SectionData, class_id)
                .success(function (data, status) {

                    ngDialog.open({
                        template: '<p> Section Added successfully </p>',
                        plain: true
                    });
                    //$scope.datavalue= [];

                    $scope.getSection($scope.class_id);
                    $scope.getClass(globalServices.globalValue.school_id);

                })
                .error(function (data, success) {
                    // ngDialog.open({
                    //     template: '<p>Some Error Occured!</p>',
                    //     plain: true
                    // });
                })
        }
        $scope.EditSection = function (value, sections) {

            // console.log("messsage");
            $scope.sections = angular.copy($scope.sectionBox[value]);
            $scope.class_id = $scope.sections.class_id;
            $scope.section_id = $scope.sections.section_id;
            // console.log($scope.exam_paper_id);
            var section_details = {
                name: $scope.sections.section_name,
                teacher_name: $scope.sections.teacher_name,
            }
          //  console.log(section_details);

            $scope.addEditSection(section_details, $scope.section_id, $scope.class_id);
        }
        $scope.addEditSection = function (section_details, section_id, class_id) {
            registrationServices.editSection(section_details, section_id)
                .success(function (data, status) {
                    // console.log(JSON.stringify(data));
                    // ngDialog.open({
                    //     template: '<p>class is Edited Successfully.</p>',
                    //     plain: true
                    // });
                    $scope.editdata = [];
                    $scope.getSection(class_id);
                    //  $scope.getClass(globalServices.globalValue.school_id);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }




        $scope.DeleteSection = function (value) {
            //  console.log("message");
            $scope.editdata = angular.copy($scope.sectionBox[value]);
            $scope.section_id = $scope.editdata.section_id;
            $scope.class_id = $scope.editdata.class_id;
            // console.log($scope.class_id);
            registrationServices.DeleteSection($scope.section_id)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Section is Deleted Successfully.</p>',
                        plain: true
                    });
                    $scope.editdata = [];
                    $scope.getSection($scope.class_id);
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
    

        $scope.getClass(globalServices.globalValue.school_id);

    }])