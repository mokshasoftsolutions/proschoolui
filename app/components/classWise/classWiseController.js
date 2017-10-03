angular.module('school_erp')
    .controller("classWiseController", ['$http', '$scope', 'globalServices', 'subjectsServices','classWiseServices','ngDialog', function ($http, $scope, globalServices, subjectsServices,classWiseServices,ngDialog) {
      $scope.days = [{
            name: "Sunday",
            id: 1
        },
        {
            name: "Monday",
            id: 2
        },
        {
            name: "Tuesday",
            id: 3
        },
        {
            name: "Wednesday",
            id: 4
        },
        {
            name: "Thursday",
            id: 5
        },
        {
            name: "Friday",
            id: 6
        },
        {
            name: "Saturday",
            id: 7
        }
        ]
      
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
            $scope.secId = [];
            globalServices.getSections(classId)
                .success(function (data, status) {
                    $scope.secData = data.class_sections;// Api list-name
                    $scope.secId = $scope.secData[0].section_id;
                    $scope.populateSubjects($scope.secId);
                

                })
                .error(function (data, success) {

                    $scope.populateSubjects($scope.secId);
                })
        }

        $scope.populateSubjects = function (secId) {
            $scope.subData = [];
            subjectsServices.getSubjects(secId)
                .success(function (data, status) {
                    $scope.subData = data.subjects;
                    $scope.subId = $scope.subData[0].subject_id;
                    //$scope.getChapters($scope.subId);
                    $scope.getTimeTable(secId);
                })
                .error(function (data, success) {
                });
        }

        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }


        $scope.getTimeTable = function (secId) {
            classWiseServices.getTimeTable(secId)
                .success(function (data, status) {
                    $scope.timeTableData = [];
                    
                                    var slots =[{time :"09:30-10:30" },
                                    {time :"10:30-11:30" },
                                    {time :"11:30-12:30" },
                                    {time :"01:30-02:30" },
                                    {time :"02:30-03:30" },
                                    {time :"03:30-04:30" }]         
          angular.forEach(slots, function(value, key) {
              var dataObj = {
                        "start_time" :value.time,
                        "data":{"monday":"--","tuesday":"--","wednesday":"--","thursday":"--","friday":"--","saturday":"--","sunday":"--"},
                    }
                    angular.forEach(data.timetable, function(valuesub, keysub) {
                        
                        if(valuesub.start_time == value.time){
                            
                            if(valuesub.day == "monday"){
                              dataObj.data.monday = valuesub.name;
                            }else if(valuesub.day == "tuesday"){
                              dataObj.data.tuesday = valuesub.name;
                            }else if(valuesub.day == "wednesday"){
                                dataObj.data.wednesday = valuesub.name;
                            }else if(valuesub.day == "thrusday"){
                                dataObj.data.thursday = valuesub.name;
                            }else if(valuesub.day == "friday"){
                                dataObj.data.friday = valuesub.name;
                            }else if(valuesub.day == "saturday"){
                                  dataObj.data.saturday = valuesub.name;
                            }else if(valuesub.day == "sunday"){
                                 dataObj.data.sunday = valuesub.name;
                            }else{

                            }

                        }

                    })

       
                $scope.timeTableData.push(dataObj);
               
           });
                                       
                   
                    $scope.timetables = data.timetable;


                    $scope.id=$scope.timetables.id;
                    // $scope.studentId = $scope.students[0].student_id;
                    //console.log($scope.studentId);
                })
                .error(function (data, success) {
                })
        }


        $scope.addTimeTable = function(data){
             var TimeTableDetails = {
                 day: $scope.data.select_day,
                room_no: $scope.data.room_no,
                start_time: $scope.data.time_from,
                end_time: "4:30"
             }
            classWiseServices.setTimeTable(TimeTableDetails,$scope.secId,$scope.subId)   
            .success(function(data, status){
                ngDialog.open({
                template: '<p>TimeTable is Added Successfully.</p>',
                plain: true
                });
                $scope.data = [];
                $scope.getTimeTable( $scope.secId);
               // $scope.getEvaluation($scope.paperId , $scope.studentId);
            })
            .error(function(data,success){
                ngDialog.open({
                template: '<p>Some Error Occured!</p>',
                plain: true
                });
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

