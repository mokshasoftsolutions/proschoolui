angular.module('school_erp')
    .controller("teacherInformationController", ['$http', '$scope', 'studentServices', 'ngDialog', 'globalServices', 'BusRouteServices', function ($http, $scope, studentServices, ngDialog, globalServices, BusRouteServices) {
        $scope.classData = [];
        $scope.data = [];
        $scope.busRoutes = [];
        // BusRouteServices.getBusRoute()
        //     .success(function (data, status) {
        //         console.log(JSON.stringify(data));
        //         $scope.busRoutes = data.Bus_Route;
        //         $scope.routeId = $scope.busRoutes[0].bus_route_id;
        //     })
        //     .error(function (data, success) {
        //     })


        //   BusRouteServices.getTime('ROUTE-1','STN-1')
        // .success(function(data, status){
        //     $scope.busRoutes = data.station_bus_routes;
        //     $scope.routeId = $scope.busRoutes[0].route_id;
        // })
        // .error(function(data,success){
        // })

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
                    //$scope.getParents ($scope.secId);
                })
                .error(function (data, success) {
                })
        }
        $scope.teacherList = [];
        $scope.username=[];
        // $scope.getParents =function(secId){
        //     console.log(secId);
        studentServices.getTeacherListBySchool()
            .success(function (data, status) {
                console.log(JSON.stringify(data));
                $scope.teacherList = data.teachers;// Api list-name
               
                console.log($scope.teacherList);
                $scope.teacherList.forEach(function (item) {
                $scope.teacherId=item.teacher_id;
                //console.log($scope.parentId);

                // $scope.splited=$scope.teacherId.split('-');
                // $scope.splited = $scope.splited[1]+"-"+$scope.splited[2]+"-"+$scope.splited[3];

                // $scope.username.push($scope.splited);
                $scope.username.push($scope.teacherId);
              //  console.log($scope.splited);


                })
                //console.log($scope.username);
                //$scope.parentsList.push(($scope.username));
            })
            .error(function (data, success) {
            })
        // }

        // $scope.addStudent = function (data) {
        //     var stdAdmission = {
        //         surname: $scope.data.surname,
        //         first_name: $scope.data.first_name,
        //         last_name: $scope.data.last_name,
        //         gender: $scope.data.gender,
        //         religion: $scope.data.religion,
        //         dob: $scope.data.dob,
        //         aadhar_no: $scope.data.aadhar_no,
        //         phone: $scope.data.phone,
        //         email: $scope.data.email,
        //         category: $scope.data.category,
        //         admission_date: $scope.data.admission_date,
        //         admission_no: $scope.data.admission_no,
        //         roll_no: $scope.data.roll_no,
        //         academic_year: $scope.data.academic_year,
        //         bus_route_id: $scope.data.routeId,
        //         cur_address: $scope.data.cur_address,
        //         cur_city: $scope.data.cur_city,
        //         cur_state: $scope.data.cur_state,
        //         cur_pincode: $scope.data.cur_pincode,
        //         cur_long: $scope.data.cur_long,
        //         cur_lat: $scope.data.cur_lat,
        //         perm_address: $scope.data.perm_address,
        //         perm_city: $scope.data.perm_city,
        //         perm_state: $scope.data.perm_state,
        //         perm_pincode: $scope.data.perm_pincode,
        //         perm_long: $scope.data.perm_long,
        //         perm_lat: $scope.data.perm_lat,
        //         father_name: $scope.data.father_name,
        //         father_contact: $scope.data.father_contact,
        //         father_occupation: $scope.data.father_occupation,
        //         mother_name: $scope.data.mother_name,
        //         mother_contact: $scope.data.mother_contact,
        //         mother_occupation: $scope.data.mother_occupation,
        //         gaurdian_name: $scope.data.gaurdian_name,
        //         gaurdian_contact: $scope.data.gaurdian_contact,
        //         gaurdian_relation: $scope.data.gaurdian_relation,
        //         gaurdian_address: $scope.data.gaurdian_address,
        //         gaurdian_occupation: $scope.data.gaurdian_occupation,
        //         parent_account_create: $scope.data.parentAccount,
        //         parent_account_new: $scope.data.parentAccountCreate,
        //         parent_id: $scope.data.parentId

        //     }
        //     console.log(stdAdmission);
        //     studentServices.setStudent(stdAdmission, $scope.secId)
        //         .success(function (data, status) {
        //             // $scope.addParent(data.id);
        //             ngDialog.open({
        //                 template: '<p> Student Information  submitted successfully </p>',
        //                 plain: true
        //             });
        //             $scope.data = [];

        //         })
        //         .error(function (data, success) {
        //             ngDialog.open({
        //                 template: '<p>Some Error Occured!</p>',
        //                 plain: true
        //             });
        //         })
        // }


        // $scope.addParent = function (studentId) {
        //     var parentDetails = {
        //         parent_name: $scope.parent[0].parent_name,
        //         parent_contact: $scope.parent[0].parent_contact,
        //         parent_relation: $scope.parent[0].parent_relation
        //     }

        //     studentServices.setParent(parentDetails, studentId)
        //         .success(function (data, status) {
        //             // ngDialog.open({
        //             // template: '<p>Student Information  submitted successfully </p>',
        //             // plain: true
        //             // });
        //             $scope.parent = [];
        //         })
        //         .error(function (data, success) {
        //             ngDialog.open({
        //                 template: '<p>Some Error Occured!</p>',
        //                 plain: true
        //             });
        //         })

        // }

        // $scope.addStudentaddress = function (studentId) {
        //     var parentDetails = {
        //         cur_address: $scope.Studentaddress.cur_address,
        //         perm_address: $scope.Studentaddress.perm_address,
        //         bus_route_id: $scope.Studentaddress.bus_route_id,
        //         Aadhaar_no: $scope.Studentaddress.Aadhaar_no
        //     }

        //     studentServices.setStudentaddress(Studentaddress, studentId)
        //         .success(function (data, status) {
        //             ngDialog.open({
        //                 template: '<p>Student Information  submitted successfully </p>',
        //                 plain: true
        //             });
        //             $scope.parent = [];
        //         })
        //         .error(function (data, success) {
        //             ngDialog.open({
        //                 template: '<p>Some Error Occured!</p>',
        //                 plain: true
        //             });
        //         })

        // }



        // $scope.selectedFile = null;
        // $scope.msg = "";


        // $scope.loadFile = function (files) {

        //     console.log("messsage1");
        //     $scope.$apply(function () {

        //         $scope.selectedFile = files[0];

        //     })

        // }

        // $scope.handleFile = function (secId) {
        //     console.log("messsage2");
        //     var file = $scope.selectedFile;
        //     // console.log(file);
        //     // console.log(file.name);
        //     // console.log(file.type);
        //     if (file == undefined || file == null) {
        //         ngDialog.open({
        //             template: '<p>Please Select a File </p>',
        //             plain: true
        //         });
        //     }

        //     else if (file.type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && file.type != "application/vnd.ms-excel") {
        //         ngDialog.open({
        //             template: '<p>Not a Excel File (The file format should be xls or xlsx !....) </p>',
        //             plain: true
        //         });
        //     }
        //     else {

        //         $scope.save(file, secId);
        //     }


        //     // if (file) {

        //     //     var reader = new FileReader();

        //     //     reader.onload = function (e) {

        //     //         var data = e.target.result;

        //     //         var workbook = XLSX.read(data, { type: 'binary' });

        //     //         var first_sheet_name = workbook.SheetNames[0];

        //     //         var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);

        //     //         //console.log(excelData);  

        //     //         if (dataObjects.length > 0) {


        //     //             $scope.save(dataObjects);


        //     //         } else {
        //     //             $scope.msg = "Error : Something Wrong1 !";
        //     //         }

        //     //     }

        //     //     reader.onerror = function (ex) {

        //     //     }

        //     //     reader.readAsBinaryString(file);
        //     // }
        // }


        // $scope.save = function (file, secId) {
        //     console.log("messsage3");
        //     console.log(file);

        //     var fd = new FormData();
        //     fd.append('file', file);
        //     // fd.append('secId', 'string');
        //     $http.post(globalServices.globalValue.baseURL + 'api/bulk_upload_students/' + secId, fd, {
        //         transformRequest: angular.identity,
        //         headers: { 'Content-Type': undefined }
        //     })
        //         .success(function () {
        //             ngDialog.open({
        //                 template: '<p>File Added Successfully.</p>',
        //                 plain: true
        //             });

        //         })
        //         .error(function () {
        //             ngDialog.open({
        //                 template: '<p>Some Error Occured!.</p>',
        //                 plain: true
        //             });
        //         });
        // }

    }])

