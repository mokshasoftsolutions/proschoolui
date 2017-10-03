
angular.module('school_erp')
    .controller("registrationController", ['$http', '$scope', 'registrationServices', function ($http, $scope, registrationServices) {
        
        
        function tab1()
        {
            document.getElementById(tab_1).style.backgroundColor="rgba(3, 200, 244, 0.69)";
            document.getElementById(tab_2).style.backgroundColor="grey";
            
        }

        function tab2()
        {
            document.getElementById(tab_1).style.backgroundColor="grey";
            document.getElementById(tab_2).style.backgroundColor="rgba(3, 200, 244, 0.69)";
            
        }
        $scope.schoolData = [];
        $scope.classData =[];
        $scope.getRegistration = function () {

            registrationServices.getRegistration()
                .success(function (data, status) {
                    console.log(JSON.stringify(data));
                    $scope.schoolData = data.schools;
                    $scope.school_id=$scope.schoolData[0].school_id;
                    console.log($scope.school_id);

                })
                .error(function (data, success) { })
        }

        // Add attendance single
        $scope.addRegistration = function (data) {
            var Registration = {

                name: $scope.data.name,
                email: $scope.data.email,
                phone: $scope.data.contact,
                academic_year: $scope.data.batch_year,
                website: $scope.data.website,
                address: $scope.data.address,
                description:$scope.data.description,
                logo:$scope.data.logo

            }
            console.log(Registration);

            registrationServices.setRegistration(Registration)
                .success(function (data, status) {

                    // ngDialog.open({
                    //     template: '<p> Student Attendance  submitted successfully </p>',
                    //     plain: true
                    // });
                    $scope.data = [];
                    $scope.getRegistration();

                })
                .error(function (data, success) {
                    // ngDialog.open({
                    //     template: '<p>Some Error Occured!</p>',
                    //     plain: true
                    // });
                })
        }
        $scope.getClass = function (school_id) {

            registrationServices.getClass(school_id)
                .success(function (data, status) {
                    console.log(JSON.stringify(data));
                    $scope.classData=data.school_classes;
                    $scope.class_id=$scope.classData[0].class_id;
                    console.log($scope.class_id);

                })
                .error(function (data, success) { })
        }

       
        $scope.addClass = function (value) {
            console.log("message");
            var ClassData = {
                name: $scope.value.name

            }
            console.log(ClassData);

            registrationServices.setClass(ClassData,$scope.school_id)
                .success(function (data, status) {

                    // ngDialog.open({
                    //     template: '<p> Student Attendance  submitted successfully </p>',
                    //     plain: true
                    // });
                    $scope.value = [];

                    $scope.getClass($scope.school_id);
                })
                .error(function (data, success) {
                    // ngDialog.open({
                    //     template: '<p>Some Error Occured!</p>',
                    //     plain: true
                    // });
                })
        }

         $scope.getSection = function (class_id) {

            registrationServices.getSection(class_id)
                .success(function (data, status) {
                    console.log(JSON.stringify(data));
                    $scope.classData=$scope.class_sections;

                })
                .error(function (data, success) { })
        }

       
        $scope.addSection = function (datavalue) {
            var SectionData = {
                name: $scope.datavalue.section

            }
            console.log(SectionData);

            registrationServices.setSection(SectionData,$scope.class_id)
                .success(function (data, status) {

                    // ngDialog.open({
                    //     template: '<p> Student Attendance  submitted successfully </p>',
                    //     plain: true
                    // });
                    //$scope.datavalue= [];
                     
                    $scope.getSection($scope.class_id);
                    $scope.getClass($scope.school_id);

                })
                .error(function (data, success) {
                    // ngDialog.open({
                    //     template: '<p>Some Error Occured!</p>',
                    //     plain: true
                    // });
                })
        }




         $scope.getRegistration();
         $scope.getClass($scope.school_id);
         $scope.getSection($scope.class_id);

    }])