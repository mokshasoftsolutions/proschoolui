angular.module('school_erp')
    .controller("parentInformationController", ['$http', '$scope', 'studentServices', 'ngDialog', 'globalServices', 'BusRouteServices', function ($http, $scope, studentServices, ngDialog, globalServices, BusRouteServices) {
        $scope.classData = [];
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
                    //$scope.getParents ($scope.secId);
                })
                .error(function (data, success) {
                })
        }
        $scope.parentsList = [];
        $scope.username = [];
        // $scope.getParents =function(secId){
        //     console.log(secId);
        studentServices.getParentListBySchool()
            .success(function (data, status) {

                $scope.parentsList = data.parents;// Api list-name
                $scope.parentBox = [];
                index = 0;

                $scope.parentsList.forEach(function (element) {
                    $scope.parentId = element.parent_id;
                    //console.log($scope.parentId);

                    // $scope.splited=$scope.parentId.split('-');
                    // $scope.splited = $scope.splited[1]+$scope.splited[3];
                    // $scope.username.push($scope.splited);
                    $scope.username.push($scope.parentId);
                    //console.log($scope.splited);

                    if (element.student_doc == 0) {
                        first_name=''
                        last_name=''
                    } else {
                        first_name = element.student_doc[0].first_name;
                        last_name = element.student_doc[0].last_name;
                    }
                    var obj = {
                        id: index++,
                        parent_id: element.parent_id,
                        parent_name: element.parent_name,
                        first_name:first_name,
                        last_name:last_name


                    }
                    $scope.parentBox.push(obj);


                })
                //console.log($scope.username);
                //$scope.parentsList.push(($scope.username));
            })
            .error(function (data, success) {
            })


            // $scope.sendUser = function (parent_id) {
          
            //     //  console.log("messaa");
            //       studentServices.sendUserMailParent(parent_id)
            //           .success(function (data, status) {
            //               ngDialog.open({
            //                   template: '<p>User name & password are sent to Email </p>',
            //                   plain: true
            //               });
            //               //$scope.parent = [];
            //           })
            //           .error(function (data, success) {
            //               ngDialog.open({
            //                   template: '<p>Some Error Occured!</p>',
            //                   plain: true
            //               });
            //           })
      
            //   }
      
      
              // To Select All for Bulk Attendance report
              $scope.tickAll = function (status) {
                  $scope.parentBox.forEach(function (element) {
                      if (status) {
                          element.selected = true;
                      } else {
                          element.selected = false;
                      }
                  });
              }
      
              $scope.sendParentHolder = [];
      
              $scope.sendAllUser = function (parent_id) {

                var obj = {
                    parent_id:parent_id,
                     // status: value.status
                  }
                  $scope.sendParentHolder.push(obj);
                  var dataB = $scope.parentBox;
                  
                  angular.forEach(dataB, function (element){
                      if (element.selected == true || element.selected == 'true') {
                         // console.log(element.student_id)
                          var obj = {
                            parent_id: element.parent_id,
                             // status: value.status
                          }
                          $scope.sendParentHolder.push(obj);
                      }
                  }); 
                  //console.log("messaa");
                  studentServices.sendAllUserMailParent($scope.sendParentHolder)
                      .success(function (data, status) {
                          $scope.sendParentHolder = [];
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

