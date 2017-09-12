angular.module('school_erp')
    .controller("barChartTwoController", ['$http', '$scope', 'globalServices', 'examServices', 'subjectsServices', 'studentServices','barChartTwoService', 'ngDialog', function ($http, $scope, globalServices, examServices, subjectsServices, studentServices,barChartTwoService, ngDialog) {
        // $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        // $scope.series = ['Series A', 'Series B'];

        // $scope.data = [
        //     [65, 59, 80, 81, 56, 55, 40],
        //     [28, 48, 40, 19, 86, 27, 90]
        // ];

        // $scope.myDataSource = {
        //     chart: {
        //         caption: "Harry's SuperMart",
        //         subCaption: "Top 5 stores in last month by revenue",
        //         numberPrefix: "$",
        //         theme: "ocean"
        //     },
        //     data: [{
        //         label: "Bakersfield Central",
        //         value: "880000"
        //     },
        //     {
        //         label: "Garden Groove harbour",
        //         value: "730000"
        //     },
        //     {
        //         label: "Los Angeles Topanga",
        //         value: "590000"
        //     },
        //     {
        //         label: "Compton-Rancho Dom",
        //         value: "520000"
        //     },
        //     {
        //         label: "Daly City Serramonte",
        //         value: "330000"
        //     }]
        // };

//         $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
//         $scope.series = ['Series A', 'Series B'];

//         $scope.data = [
//             [65, 59, 80, 81, 56, 55, 40],
//             [28, 48, 40, 19, 86, 27, 90]
//         ];


// $scope.data = [13, 44, 55];
// $scope.labels = ['L', 'A', 'P'];


// canvas_html = '<canvas id="chart-2" class="chart chart-doughnut" chart-data="data" chart-labels="labels"></canvas>';



$scope.evalData = [];
$scope.data = [];
globalServices.getClass()
    .success(function (data, status) {
        $scope.classDatanew = data.school_classes;// Api list-name
        $scope.classId = $scope.classDatanew[0].class_id;
        console.log($scope.classId);
        $scope.populateSections($scope.classId);
    })
    .error(function (data, success) {
    })
$scope.populateSections = function (classId) {
    globalServices.getSections(classId)
        .success(function (data, status) {
            $scope.secData = data.class_sections;// Api list-name
            $scope.secId = $scope.secData[0].section_id;
            $scope.getSubjects($scope.secId);
        })
        .error(function (data, success) {
        })
}

examServices.getExamSchedule()
    .success(function (data, status) {
        $scope.examSchedule = data.exam_schedules;// Api list-name
        $scope.examScheduleId = $scope.examSchedule[0].exam_sch_id;
        console.log($scope.examScheduleId);
    })
    .error(function (data, success) {
    })


$scope.getSubjects = function (secId) {
    subjectsServices.getSubjects(secId)
        .success(function (data, status) {
            $scope.subjectsData = data.subjects;
            $scope.subjectId = $scope.subjectsData[0].subject_id;
            $scope.getExamPapers($scope.subjectId, $scope.examScheduleId);


        })
        .error(function (data, success) {
        });
}

$scope.getExamPapers = function (examSubject, exSchedule) {
    examServices.getExamPapers(examSubject, exSchedule)
        .success(function (data, status) {
            $scope.papers = data[exSchedule + '-' + examSubject];// Api list-name
            $scope.paperId = $scope.papers[0].exam_paper_id;
            console.log( $scope.paperId);
            $scope.getStudentValue($scope.secId);
        })
        .error(function (data, success) {
        })
}


$scope.getStudentValue = function (secValue) {
    studentServices.getStudent(secValue)
        .success(function (data, status) {
            $scope.students = data.students;
            $scope.studentId = $scope.students[0].student_id;
            console.log(JSON.stringify(data));
            console.log($scope.studentId);
            //$scope.getEvaluation($scope.paperId, $scope.studentId)
            $scope.getExamMarks($scope.paperId,$scope.studentId);
        })
        .error(function (data, success) {
        })
}

$scope.getExamMarks= function(examScheduleId,studentId){
barChartTwoService.getExamMarks(examScheduleId,studentId)
 .success(function (data, status) {
         $scope.examData = data.barchart;
         console.log(JSON.stringify(data));
         $scope.chartdata = $scope.examData[0].exams.max_marks;
         console.log($scope.chartdata);
    })
    .error(function (data, success) {
    })
}
//$scope.chartdata=[30,20,40,30,20,40,30,20,40];

 $scope.myJson = {
      type : "bar",
      title:{
        backgroundColor : "transparent",
        fontColor :"black"
        
      },
      backgroundColor : "white",
      series : [
        {
            text: "present",
          //values : [1,2,3,4],
          backgroundColor : "#4DC0CF"
        }
      ]
    };

    }])
