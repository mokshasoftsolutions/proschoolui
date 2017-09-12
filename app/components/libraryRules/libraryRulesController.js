angular.module('school_erp')
.controller("libraryRulesController",['$http','$scope', function($http, $scope){
        $scope.libraryRules = [];
            $scope.getlibraryRules= function(){
             examServices.getlibraryRules()
            .success(function(data, status){
                $scope.libraryData = data.boo;
            })
            .error(function(data,success){
            })
        }
       
         $scope.addlibraryRules= function(data){
             var bookDetails = {
                book_title:$scope.data.book_title,
                author_name: $scope.data.author_name,
                book_price: $scope.data.book_price,
                qty:$scope.data.qty,
                rack_number:$scope.data.rack_number,
                inward_date:$scope.data.inward_date,
                book_description:$scope.data.book_description,
                subject:$scope.data.subject
             }
            libraryRulesServices.setlibraryRules(bookDetails)   
            .success(function(data, status){
                ngDialog.open({
                template: '<p>ExamSchedules are Added Successfully.</p>',
                plain: true
                });
                $scope.data = [];
                $scope.getlibraryRules();
            })
            .error(function(data,success){
                ngDialog.open({
                template: '<p>Some Error Occured!</p>',
                plain: true
                });
            })
           
        }
       
    
      $scope.EditlibraryRules = function(editdata){
             var bookDetails = {
                book_title:$scope.data.book_title,
                author_name: $scope.data.author_name,
                book_price: $scope.data.book_price,
                qty:$scope.data.qty,
                rack_number:$scope.data.rack_number,
                inward_date:$scope.data.inward_date,
                book_description:$scope.data.book_description,
                subject:$scope.data.subject
             }
            examServices.EditlibraryRules(bookDetails)   
            .success(function(data, status){
                ngDialog.open({
                template: '<p>ExamSchedules are Edited Successfully.</p>',
                plain: true
                });
                $scope.examData = [];
                $scope.getlibraryRules();
            })
            .error(function(data,success){
                ngDialog.open({
                template: '<p>Some Error Occured!</p>',
                plain: true
                });
            })
           
        }
        $scope.getlibraryRules();

            $scope.showRole = function(role){            
            return globalServices.fetchRoleAuth(role);
        }
}])



