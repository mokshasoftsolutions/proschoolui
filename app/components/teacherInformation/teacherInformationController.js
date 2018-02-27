angular.module('school_erp')
    .controller("teacherInformationController", ['$http', '$scope', 'studentServices', 'ngDialog', 'globalServices', 'BusRouteServices', function ($http, $scope, studentServices, ngDialog, globalServices, BusRouteServices) {

        $scope.teacherList = [];
        $scope.username = [];

        studentServices.getTeacherListBySchool()
            .success(function (data, status) {
                //    console.log(JSON.stringify(data));
                $scope.teacherList = data.teachers;// Api list-name

                //     console.log($scope.teacherList);
                $scope.teacherBox = [];
                index = 0;
                $scope.teacherList.forEach(function (element) {
                    $scope.teacherId = element.teacher_id;
                    var obj = {
                        id: index++,
                        teacher_id: element.teacher_id,
                        teacher_name: element.teacher_name,
                        selected: false,


                    }
                    $scope.teacherBox.push(obj);
                    $scope.username.push($scope.teacherId);
                    //  console.log($scope.splited);


                })

            })
            .error(function (data, success) {
            })




        // $scope.sendUser = function (teacher_id) {

        //     //  console.log("messaa");
        //     studentServices.sendUserMail(teacher_id)
        //         .success(function (data, status) {
        //             ngDialog.open({
        //                 template: '<p>User name & password are sent to Email </p>',
        //                 plain: true
        //             });
        //             //$scope.parent = [];
        //         })
        //         .error(function (data, success) {
        //             ngDialog.open({
        //                 template: '<p>Some Error Occured!</p>',
        //                 plain: true
        //             });
        //         })

        // }


        // To Select All for Bulk Attendance report
        $scope.tickAll = function (status) {
            $scope.teacherBox.forEach(function (element) {
                if (status) {
                    element.selected = true;
                } else {
                    element.selected = false;
                }
            });
        }

        $scope.sendTeacherHolder = [];

        $scope.sendAllUser = function (teacher_id) {


            var obj = {
                teacher_id: teacher_id,
                // status: value.status
            }
            $scope.sendTeacherHolder.push(obj);

            var dataB = $scope.teacherBox;

            angular.forEach(dataB, function (element) {
                if (element.selected == true || element.selected == 'true') {
                    // console.log(element.student_id)
                    var obj = {
                        teacher_id: element.teacher_id,
                        // status: value.status
                    }
                    $scope.sendTeacherHolder.push(obj);
                }
            });
            //console.log("messaa");
            studentServices.sendAllUserMail($scope.sendTeacherHolder)
                .success(function (data, status) {
                    $scope.sendTeacherHolder = [];
                    ngDialog.open({
                        template: '<p>User names & passwords are sent to Emails </p>',
                        plain: true
                    });
                    //$scope.parent = [];
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



    }])

