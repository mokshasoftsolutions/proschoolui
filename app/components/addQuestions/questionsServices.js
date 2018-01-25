angular.module('school_erp')
    .factory('questionsServices', ['$http', 'globalServices', function ($http, globalServices) {
        var questionsServices = {};

        questionsServices.getQuestionsForSubject = function (subId,classId) {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/questions/'+subId+'/'+ classId
            })
        };

        questionsServices.setQuestions = function (dataValue, classId) {
            console.log(dataValue);
            return $http({
                method: 'POST',
                url: globalServices.globalValue.baseURL + 'api/questions/' + classId,
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };
        return questionsServices;
    }]); 