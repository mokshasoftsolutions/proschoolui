angular.module('school_erp')
    .factory('lessonplannerServices', ['$http', 'globalServices', function ($http, globalServices) {
        var lessonplannerServices = {};


        // lessonplannerServices.getLessons = function (subjectId) {
        //     return $http({
        //         method: 'GET',
        //         url: globalServices.globalValue.baseURL + 'api/course_works/' + subjectId
        //     })
        // };



        lessonplannerServices.setBulkChapters = function (dataValue, subject_id) {
            //  console.log(dataValue);
            var test = {
                "chapters_completed": dataValue,
            };
            return $http({
                method: 'POST',
                url: globalServices.globalValue.baseURL + 'api/chaptersbulk_completed_topics/' + subject_id,
                data: test,
                headers: { 'Content-Type': 'application/json' },
            })
        };



        return lessonplannerServices;
    }]);  