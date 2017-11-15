angular.module('school_erp')
    .controller("registrationController", ['$http', '$scope', '$window', 'ngDialog', 'registrationServices', 'globalServices', function ($http, $scope, $window, ngDialog, registrationServices, globalServices) {
        $scope.schoolData = [];
        $scope.classData = [];
        $scope.data = [];
        $scope.value = [];
        $scope.datavalue = [];
        $window.localStorage["schoolId"] = null;


        $scope.selectedFile = null;

        $scope.loadFile = function (files) {

            console.log("messsage1");
            $scope.$apply(function () {

                $scope.selectedFile = files[0];
                console.log($scope.selectedFile);

                if ($scope.selectedFile.type != "image/jpeg" && $scope.selectedFile.type !="image/png") {
                    //     ngDialog.open({
                    //         template: '<p> Not a Image File </p>',
                    //         plain: true
                    //     });
                    //    $window.alert("Not a Image File");
                    $scope.message = "Not a Image File !..";
                }


            })

        }
      
         // Add attendance single
         $scope.addRegistration = function (data) {
            var file = $scope.selectedFile;
            var fd = new FormData();
            fd.append('file', file);
            fd.append('name', $scope.data.name);
            fd.append('email', $scope.data.email);
            fd.append('phone', $scope.data.contact);
            fd.append('academic_year', $scope.data.batch_year);
            fd.append('website', $scope.data.website);
            fd.append('address', $scope.data.address);
            fd.append('description', $scope.data.description);
          

            registrationServices.setRegistration(fd)
                .success(function (data, status) {

                    ngDialog.open({
                        template: '<p> Registration submitted successfully </p>',
                        plain: true
                    });
                    $scope.data = [];
                    $scope.selectedFile = null;
                    $scope.getRegistration();

                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })
        }



        $scope.getRegistration = function () {

            registrationServices.getRegistration()
                .success(function (data, status) {
                    console.log(JSON.stringify(data));
                    $scope.schoolData = data.schools;

                    $scope.latestValue = $scope.schoolData[$scope.schoolData.length - 1];
                    $scope.school_id = $scope.latestValue.school_id;
                    //  $window.localStorage["schoolId"] = JSON.stringify($scope.latestValue.school_id);
                    console.log($scope.latestValue);
                    console.log($scope.school_id);
                    //console.log(schoolId);
                    console.log("messages..........2");
                    //$scope.school_id = $scope.schoolData[0].school_id;





                })
                .error(function (data, success) {})
        }
        
        $scope.getRegistration();
      

    }])