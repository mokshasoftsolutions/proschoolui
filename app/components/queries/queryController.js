angular.module('school_erp')
    .controller("queryController", ['$http', '$scope', 'studentServices', 'ngDialog', 'globalServices', 'queryServices', function ($http, $scope, studentServices, ngDialog, globalServices, queryServices) {

        $scope.select_date = new Date().toDateString();
        $scope.sendQuery = function (data) {
            console.log("query");

            var Details = {
                user: $scope.data.user,
                query: $scope.data.query

            }
            queryServices.sendQuery(Details, $scope.select_date)
                .success(function (data, status) {
                    if (data == 'false' | data == false) {
                        ngDialog.open({
                            template: '<p style="color:red;">User or Query should not be empty </p>',
                            plain: true
                        });

                    } else {
                        ngDialog.open({
                            template: '<p>Query is sent succusfully </p>',
                            plain: true
                        });

                        $scope.data = [];
                    }
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }





    }])