angular.module('school_erp')
    .factory('questionsServices', ['$http', 'globalServices', function ($http, globalServices) {
        var questionsServices = {};

        questionsServices.getQuestionsForSubject = function (subId, classId, lessionId) {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/questions/' + subId + '/' + classId + '/' + lessionId
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

        questionsServices.EditQuestions = function (dataValue, questions_id) {
            console.log(dataValue);
            return $http({
                method: 'PUT',
                url: globalServices.globalValue.baseURL + 'api/edit_question/' + questions_id,
                //url: 'http://192.168.1.10:4005/api/edit_station/STN-1',
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };
        questionsServices.DeleteQuestions = function (question_id) {
            return $http({
                method: 'DELETE',
                url: globalServices.globalValue.baseURL + 'api/delete_question/' + question_id
            })
        }
        return questionsServices;
    }]); 