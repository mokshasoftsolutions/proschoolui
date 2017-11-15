
angular.module('school_erp')
    .controller("addClassSectionController", ['$http', '$scope', '$window', 'ngDialog', 'registrationServices', 'globalServices', function ($http, $scope, $window, ngDialog, registrationServices, globalServices) {




        $scope.getClass = function (school_id) {
            console.log(school_id);

            registrationServices.getClass(school_id)
                .success(function (data, status) {
                    console.log(JSON.stringify(data));
                    $scope.classData = data.school_classes;
                    $scope.class_id = $scope.classData[0].class_id;
<<<<<<< HEAD
                    //  console.log($scope.class_id);
=======
                    console.log($scope.class_id);
>>>>>>> 3063d8978d8eca3b5913af595172c0022cb6e366

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

<<<<<<< HEAD
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

=======
>>>>>>> 3063d8978d8eca3b5913af595172c0022cb6e366
        $scope.getSection = function (class_id) {

            registrationServices.getSection(class_id)
                .success(function (data, status) {
                    console.log(JSON.stringify(data));
<<<<<<< HEAD
                    $scope.secData = data.class_sections;
                    // console.log($scope.secData+"hema");
=======
                    $scope.classData = $scope.class_sections;
>>>>>>> 3063d8978d8eca3b5913af595172c0022cb6e366
                    $scope.getClass(globalServices.globalValue.school_id);
                })
                .error(function (data, success) { })
        }
<<<<<<< HEAD
        $scope.addSection = function (datavalue, class_id) {
=======


        $scope.addSection = function (datavalue,class_id) {
>>>>>>> 3063d8978d8eca3b5913af595172c0022cb6e366
            console.log("message");
            //console.log(JSON.stringify(value));
            var SectionData = {
                name: $scope.datavalue.section

            }
            console.log(SectionData);

<<<<<<< HEAD
            registrationServices.setSection(SectionData, class_id)
=======
            registrationServices.setSection(SectionData,class_id)
>>>>>>> 3063d8978d8eca3b5913af595172c0022cb6e366
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



<<<<<<< HEAD
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
=======
        $scope.getClass(globalServices.globalValue.school_id);
       // $scope.getSection($scope.class_id);
>>>>>>> 3063d8978d8eca3b5913af595172c0022cb6e366
    }])