
angular.module('school_erp')
    .controller("addClassSectionController", ['$http', '$scope', '$window', 'ngDialog', 'registrationServices', 'globalServices', function ($http, $scope, $window, ngDialog, registrationServices, globalServices) {




        $scope.getClass = function (school_id) {
            console.log(school_id);

            registrationServices.getClass(school_id)
                .success(function (data, status) {
                    console.log(JSON.stringify(data));
                    $scope.classData = data.school_classes;
                    $scope.class_id = $scope.classData[0].class_id;
                    //  console.log($scope.class_id);

                })
                .error(function (data, success) { })
        }


        $scope.addClass = function (value) {
            console.log("message");
            //console.log(JSON.stringify(value));
            var ClassData = {
                name: $scope.value.name

            }
            console.log(ClassData);

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

        $scope.DeleteClass = function (value) {
            console.log("message");
            $scope.editdata = angular.copy($scope.classData[value]);
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

            registrationServices.getSection(class_id)
                .success(function (data, status) {
                    console.log(JSON.stringify(data));
                    $scope.secData = data.class_sections;
                    // console.log($scope.secData+"hema");
                    $scope.getClass(globalServices.globalValue.school_id);
                })
                .error(function (data, success) { })
        }
        $scope.addSection = function (datavalue, class_id) {
            console.log("message");
            //console.log(JSON.stringify(value));
            var SectionData = {
                name: $scope.datavalue.section

            }
            console.log(SectionData);

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



            $scope.DeleteSection = function (value) {
                console.log("message");
            $scope.editdata = angular.copy($scope.secData[value]);
            $scope.section_id = $scope.editdata.section_id;
            $scope.class_id=$scope.editdata.class_id;
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
            
        $scope.getClass(globalServices.globalValue.school_id);
        // $scope.getSection($scope.class_id);
    }])