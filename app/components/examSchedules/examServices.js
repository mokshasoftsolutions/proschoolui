angular.module('school_erp')
.factory('examServices',['$http', 'globalServices', function($http, globalServices){
    var examServices = {};

    examServices.getExamSchedule = function(){
        return $http({
            method: 'GET',
            url: globalServices.globalValue.baseURL + 'api/exam_schedule/'+globalServices.globalValue.school_id
        })
    };

     examServices.setExamSchedule = function(dataValue){
         console.log(dataValue);
        return $http({
                    method: 'POST',
                    url: globalServices.globalValue.baseURL + 'api/exam_schedule/'+globalServices.globalValue.school_id,
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
    examServices.getExamPapersbySectionAndSchedule = function( exSchedule,section){
            console.log(exSchedule+'/'+section);
        return $http({
                    method: 'GET',
                    url: globalServices.globalValue.baseURL + 'api/examsbysectionid/'+exSchedule+'/'+section
                })
    };
     examServices.setExamPapers = function(dataValue, examSubject, exSchedule,classId,sectionId){
         console.log(dataValue);
        return $http({
                    method: 'POST',
                    url: globalServices.globalValue.baseURL + 'api/exams/'+examSubject+'/'+exSchedule+'/'+classId+'/'+sectionId,
                    data:  dataValue,
                    headers: { 'Content-Type': 'application/json'},
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


        examServices.getEvaluation = function(student,scheduleId){
            
        return $http({
                    method: 'GET',
                    url: globalServices.globalValue.baseURL + 'api/exam_eval/'+student+'/'+scheduleId
                })
    };
     examServices.setEvaluation = function(dataValue, exam_sch_id,exam_paper_id,student_id,section_id,class_id){
         console.log(dataValue);
        return $http({
                    method: 'POST',
                    url: globalServices.globalValue.baseURL + 'api/exam_eval/'+exam_sch_id+"/"+exam_paper_id+'/'+student_id+'/'+section_id+'/'+class_id,
                    data:dataValue,
                    headers: { 'Content-Type': 'application/json'},
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