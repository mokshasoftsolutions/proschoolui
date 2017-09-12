angular.module('school_erp')
.controller("studentAdmissionController",['$http','$scope','studentServices', 'ngDialog','globalServices', 'BusRouteServices', function($http, $scope, studentServices, ngDialog, globalServices, BusRouteServices ){
        $scope.classData = [];
        $scope.data = [];  
        BusRouteServices.getBusRoute()
        .success(function(data, status){
            $scope.busRoutes = data.bus_routes;
            $scope.routeId = $scope.busRoutes[0].route_id;
        })
        .error(function(data,success){
        })
      

        //   BusRouteServices.getTime('ROUTE-1','STN-1')
        // .success(function(data, status){
        //     $scope.busRoutes = data.station_bus_routes;
        //     $scope.routeId = $scope.busRoutes[0].route_id;
        // })
        // .error(function(data,success){
        // })

         globalServices.getClass()
        .success(function(data, status){
            $scope.classData = data.school_classes;// Api list-name
            $scope.classId = $scope.classData[0].class_id;
            $scope.populateSections($scope.classId)
            
        })
        .error(function(data,success){
        })

        $scope.populateSections = function(classId){
            globalServices.getSections(classId)
            .success(function(data, status){
                $scope.secData = data.class_sections;// Api list-name
                $scope.secId = $scope.secData[0].section_id;
                // $scope.getStudentValue($scope.secId);
            })
            .error(function(data,success){
            })
        }


       

        $scope.addStudent = function(data){
             var stdAdmission = {
                surname:$scope.data.surname ,
                first_name: $scope.data.first_name,
                last_name:$scope.data.last_name ,
                gender: $scope.data.gender,
                religion:$scope.data.religion,
                dob:$scope.data.dob,
                aadhar_no:$scope.data.aadhar_no ,
                phone:$scope.data.phone ,
                email: $scope.data.email,
                category: $scope.data.category,
                admission_date: $scope.data.admission_date,
                admission_no:$scope.data.admission_no ,
                roll_no:$scope.data.roll_no ,
                academic_year:$scope.data.academic_year,
                bus_route_id:$scope.data.bus_route_id,
                cur_address:$scope.data.cur_address,
                cur_city: $scope.data.cur_city,
                cur_state:$scope.data.cur_state ,
                cur_pincode: $scope.data.cur_pincode,
                cur_long: $scope.data.cur_long,
                cur_lat:$scope.data.cur_lat ,
                perm_address:$scope.data.perm_address ,
                perm_city: $scope.data.perm_city,
                perm_state:$scope.data.perm_state ,
                perm_pincode: $scope.data.perm_pincode ,
                perm_long:$scope.data.perm_long ,
                perm_lat:$scope.data.perm_lat ,
                father_name: $scope.data.father_name,
                father_contact:$scope.data.father_contact ,
                father_occupation:$scope.data.father_occupation ,
                mother_name: $scope.data.mother_name,
                mother_contact:$scope.data.mother_contact ,
                mother_occupation:$scope.data.mother_occupation ,
                gaurdian_name:$scope.data.gaurdian_name ,
                gaurdian_contact: $scope.data.gaurdian_contact,
                gaurdian_relation: $scope.data.gaurdian_relation,
                gaurdian_address:$scope.data.gaurdian_address,
                gaurdian_occupation: $scope.data.gaurdian_occupation
             }
           
            studentServices.setStudent(stdAdmission, $scope.secId)   
            .success(function(data, status){
                // $scope.addParent(data.id);
                ngDialog.open({
                template: '<p> Student Information  submitted successfully </p>',
                plain: true
                });
                $scope.data = [];
                
            })
            .error(function(data,success){
                 ngDialog.open({
                template: '<p>Some Error Occured!</p>',
                plain: true
                });
            })
        }

        
        $scope.addParent = function(studentId){
            var parentDetails = {
                parent_name:$scope.parent[0].parent_name,
                parent_contact:$scope.parent[0].parent_contact,
                parent_relation:$scope.parent[0].parent_relation
            }
            
            studentServices.setParent(parentDetails,studentId)   
            .success(function(data, status){
                // ngDialog.open({
                // template: '<p>Student Information  submitted successfully </p>',
                // plain: true
                // });
                $scope.parent = [];
            })
            .error(function(data,success){
                 ngDialog.open({
                template: '<p>Some Error Occured!</p>',
                plain: true
                });
            })

        }
        
        $scope.addStudentaddress = function(studentId){
            var parentDetails = {
               cur_address:$scope.Studentaddress.cur_address,
               perm_address:$scope.Studentaddress.perm_address,
               bus_route_id:$scope.Studentaddress.bus_route_id,
               Aadhaar_no:$scope.Studentaddress.Aadhaar_no
            }
            
            studentServices.setStudentaddress(Studentaddress,studentId)   
            .success(function(data, status){
                ngDialog.open({
                template: '<p>Student Information  submitted successfully </p>',
                plain: true
                });
                $scope.parent = [];
            })
            .error(function(data,success){
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

}])

