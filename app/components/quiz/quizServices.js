angular.module('school_erp')
    .factory('quizServices', ['$http', 'globalServices', function ($http, globalServices) {
        var quizServices = {};

        quizServices.getQuizQuestions = function (studentId) {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/Quizz_questions/' + studentId
            })
        };

        quizServices.setQuizQuestions = function (dataValue, studentId) {
         //   console.log(dataValue);
            return $http({
                method: 'POST',
                url: globalServices.globalValue.baseURL + 'api/Quizz_questions/' + studentId,
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };
        return quizServices;
    }]); 