angular.module('school_erp')
    .factory('marksServices', ['$http', 'globalServices', function ($http, globalServices) {
        var marksServices = {};

        marksServices.getMarks = function (section_id, subject_id, chapter_id, assignment_id) {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/assignment_marksbulk_eval/' + section_id + "/" + subject_id + "/" + chapter_id + "/" + assignment_id
            })
        };
        marksServices.getMarksByStudent = function (subject_id, student_id) {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/student_assignment_marks/' + subject_id + "/" + student_id
            })
        };

        marksServices.setBulkMarks = function (dataValue, section_id, subject_id, chapter_id, assignment_id) {
            //  console.log(dataValue);
            var test = {
                "studentAssignmentMarks": dataValue,
            };
            return $http({
                method: 'POST',
                url: globalServices.globalValue.baseURL + 'api/assignment_marksbulk_eval/' + section_id + "/" + subject_id + "/" + chapter_id + "/" + assignment_id,
                data: test,
                headers: { 'Content-Type': 'application/json' },
            })
        };

        marksServices.EditMarks = function (dataValue, marks_id) {
            //  console.log(dataValue);
            return $http({
                method: 'PUT',
                url: globalServices.globalValue.baseURL + 'api/edit_assignments_marks/' + marks_id,
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };

        marksServices.DeleteMarks = function (marks_id) {
            return $http({
                method: 'DELETE',
                url: globalServices.globalValue.baseURL + 'api/delete_assignments_marks/' + marks_id,
            })
        };
        return marksServices;
    }]); 