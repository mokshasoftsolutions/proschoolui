angular.module('school_erp')
    .controller("messagesController", ['$http', '$scope', '$rootScope','globalServices','messagesServices', 'ngDialog', function ($http, $scope, $rootScope,globalServices , messagesServices, ngDialog) {
        $scope.data = [];

        $scope.getmessages = function () {
            messagesServices.getmessages()
                .success(function (data, status) {
                //$scope.data = data.material_in;
                    console.log(JSON.stringify(data));
                    $scope.message = data.messages;
                    // $scope.station_id = $scope.data[].station_id;
                    // console.log($scope.station_id);
                    $scope.messagesData = [];
                    index = 0;
                    $scope.message.forEach(function (element) {

                        var obj = {
                            id: index++,
                            message_id:element.message_id,
                            subject: element.subject,
                            message: element.message,
                            sent_to: element.sent_to,
                            posted_on: element.posted_on,
                          
                           

                        }
                        $scope.messagesData.push(obj);
                        // console.log("mesaage for section");
                       // console.log($scope.employeeData);
                    })

                })
                .error(function (data, success) {
                });
        }

        $scope.getmessagesFor = function (receiver) {
            messagesServices.getmessagesFor(receiver)
                .success(function (data, status) {
                //$scope.data = data.material_in;
                    console.log(JSON.stringify(data));
                    $scope.message = data.messages;
                    // $scope.station_id = $scope.data[].station_id;
                    // console.log($scope.station_id);
                    $scope.messagesData = [];
                    index = 0;
                    $scope.message.forEach(function (element) {

                        var obj = {
                            id: index++,
                            message_id:element.message_id,
                            subject: element.subject,
                            message: element.message,
                            sent_to: element.sent_to,
                            posted_on: element.posted_on,
                          
                           

                        }
                        $scope.messagesData.push(obj);
                        // console.log("mesaage for section");
                       // console.log($scope.employeeData);
                    })

                })
                .error(function (data, success) {
                });
        }

   // Role based Display
        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }
        
        if ($rootScope.role == 'parent') {
            $scope.parent='parents';
            $scope.getmessagesFor($scope.parent);

        }
        else if ($rootScope.role == 'teacher') {
            $scope.teacher='teachers';
            $scope.getmessagesFor($scope.teacher);
        }
        else {
            $scope.getmessages();
           
        }


        



    }])

