angular.module('school_erp')
    .factory('lessonTackerServices', ['$http', 'globalServices', function ($http, globalServices) {
        var lessonTackerServices  = {};


        lessonTackerServices.getChapterResponse = function (secId) {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/all_subjects_of_chapters_completed_topics/' + secId
            })
        };



        
        return lessonTackerServices;
    }]);  