angular.module('school_erp')
.factory('libraryRulesServices',['$http', 'globalServices', function($http, globalServices){
    var libraryRulesServices = {};

    libraryRulesServices.getlibraryRules = function(){
        return $http({
                    method: 'GET',
                    url: globalServices.globalValue.baseURL + '/api/book/'
                })
    };

     libraryRulesServices.setlibraryRules = function(dataValue){
         console.log(dataValue);
        return $http({
                    method: 'POST',
                    url: globalServices.globalValue.baseURL + '/api/book/',
                    data: $.param(dataValue),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                })
      };

       libraryRulesServices.EditlibraryRules = function(dataValue){
         console.log(dataValue);
        return $http({
                    method: 'EDIT',
                    url: globalServices.globalValue.baseURL + '/book_edit/:book_id/:name/:value',
                    data: $.param(dataValue),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                })
      };
       return libraryRulesServices;
    }]);  