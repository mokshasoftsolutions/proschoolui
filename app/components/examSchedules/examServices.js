angular.module('school_erp')
.factory('examServices',['$http', 'globalServices', function($http, globalServices){
    var examServices = {};

    examServices.getExamSchedule = function(){
        return $http({
            method: 'GET',
            url: globalServices.globalValue.baseURL + 'api/exam_schedule/SCH-9271'
        })
    };

     examServices.setExamSchedule = function(dataValue){
         console.log(dataValue);
        return $http({
                    method: 'POST',
                    url: globalServices.globalValue.baseURL + 'api/exam_schedule/SCH-9271',
                    data: $.param(dataValue),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                })
      };

      examServices.EditExamSchedule = function(dataValue,exam_sch_id){
            console.log(dataValue);
            return $http({
                        method: 'PUT',
                        url: globalServices.globalValue.baseURL + 'api/edit_examschedule/'+exam_sch_id,
                        
                        data: $.param(dataValue),
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                    })
        };

      examServices.DeleteExamSchedule = function(exam_sch_id){
           return $http({
                    method: 'DELETE',
                    url: globalServices.globalValue.baseURL + 'api/delete_examschedule/'+exam_sch_id,
                })
      };

      
      examServices.getExamPapers = function(examSubject, exSchedule){
            console.log(examSubject+'/'+exSchedule);
        return $http({
                    method: 'GET',
                    url: globalServices.globalValue.baseURL + 'api/exams/'+examSubject+'/'+exSchedule
                })
    };
     examServices.setExamPapers = function(dataValue, examSubject, exSchedule){
         console.log(dataValue);
        return $http({
                    method: 'POST',
                    url: globalServices.globalValue.baseURL + 'api/exams/'+examSubject+'/'+exSchedule,
                    data: $.param(dataValue),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                })
      };

      examServices.EditExamPapers = function(dataValue,exam_paper_id){
            console.log(dataValue);
            return $http({
                        method: 'PUT',
                        url: globalServices.globalValue.baseURL + 'api/edit_exam_paper/'+exam_paper_id,
                        
                        data: $.param(dataValue),
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                    })
        };

      examServices.DeleteExamPapers = function(exam_paper_id){
           return $http({
                    method: 'DELETE',
                    url: globalServices.globalValue.baseURL + 'api/delete_exam_paper/'+exam_paper_id,
                })
      };


        examServices.getEvaluation = function(examPaper,student,subjectId,examScheduleId){
            console.log(examPaper+'/'+student);
        return $http({
                    method: 'GET',
                    url: globalServices.globalValue.baseURL + 'api/exam_eval/'+examPaper+'/'+student+'/'+subjectId+'/'+examScheduleId
                })
    };
     examServices.setEvaluation = function(dataValue, examPaper, student,subjectId,examScheduleId){
         console.log(dataValue);
        return $http({
                    method: 'POST',
                    url: globalServices.globalValue.baseURL + 'api/exam_eval/'+examPaper+'/'+student+'/'+subjectId+'/'+examScheduleId,
                    data: $.param(dataValue),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                })
      };

       examServices.EditEvaluation = function(dataValue,paper_result_id){
            console.log(dataValue);
            return $http({
                        method: 'PUT',
                        url: globalServices.globalValue.baseURL + 'api/edit_exam_evalution/'+paper_result_id,
                        
                        data: $.param(dataValue),
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                    })
        };

      examServices.DeleteEvaluation = function(paper_result_id){
           return $http({
                    method: 'DELETE',
                    url: globalServices.globalValue.baseURL + 'api/delete_exam_evalution/'+paper_result_id,
                })
      };

      
      return examServices;

}]);