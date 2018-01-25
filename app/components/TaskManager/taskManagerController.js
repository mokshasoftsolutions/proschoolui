angular.module('school_erp')
    .controller("taskManagerController", ['$http', '$scope', '$rootScope','globalServices','employeeServices', 'taskManagerServices', 'ngDialog', function ($http, $scope, $rootScope,globalServices , employeeServices, taskManagerServices, ngDialog) {
        $scope.data = [];
        $scope.priority = [{
            name: "Urgent",
            id: 1
        },
        {
            name: "Normal",
            id: 2
        }];
        $scope.employeeType = [{ type: "Teaching", id: "teaching" }, { type: "Non-Teaching", id: "non-teaching" }, { type: "Administrative", id: "administrative" }];

        $scope.getTask = function () {
            taskManagerServices.getTaskManager()
                .success(function (data, status) {
                    // $scope.data = data.tasks;
                    //  console.log(JSON.stringify(data));
                    $scope.taskData = data.tasks;
                    $scope.taskBox = [];
                    index = 0;
                    $scope.taskData.forEach(function (element) {

                        var obj = {
                            id: index++,
                            task_id: element.task_id,
                            task: element.task,
                            department: element.department,
                            assigned_to: element.assigned_to,
                            priority: element.priority,
                            assigned_on: element.assigned_on,
                            status: element.status

                        }
                        $scope.taskBox.push(obj);
                        // console.log("mesaage for section");
                        // console.log($scope.sectionBox);
                    })

                    // $scope.station_id = $scope.data[].station_id;
                    //  console.log($scope.taskData);

                })
                .error(function (data, success) {
                });
        }
        $scope.getEmployee = function (job_category) {
            console.log("taskmanager");
            console.log(job_category);
            employeeServices.getEmployeeByCategory(job_category)
                .success(function (data, status) {
                    $scope.empData = data.employees;
                    console.log(JSON.stringify(data));
                    //$scope.taskData = $scope.data;

                    // $scope.station_id = $scope.data[].station_id;
                    //  console.log($scope.taskData);

                })
                .error(function (data, success) {
                });
        }

        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }


        $scope.addsetTaskManager = function (data) {
            //  console.log(data);
            var task_details = {
                task: $scope.data.task,
                department: $scope.data.job_category,
                assigned_to: $scope.data.assigned_to,
                priority: $scope.data.priority,
                assigned_on: $scope.data.assigned_on,
                status: $scope.data.status
            }
            //console.log(materialIn);
            taskManagerServices.setTaskManager(task_details)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Vendor details is Added Successfully.</p>',
                        plain: true
                    });
                    $scope.data = [];
                    $scope.getTask();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }
        $scope.EditTaskManager = function (value, tasks) {

            //  console.log(value);
            $scope.tasks = angular.copy($scope.taskBox[value]);
            //  console.log($scope.tasks);
            $scope.task_id = $scope.tasks.task_id;
            //  console.log($scope.task_id);
            var tasks_details = {
                task: $scope.tasks.task,
                department: $scope.tasks.department,
                assigned_to: $scope.tasks.assigned_to,
                priority: $scope.tasks.priority,
                assigned_on: $scope.tasks.assigned_on,
                status: $scope.tasks.status

            }
            console.log(tasks_details);

            $scope.addEditTaskManager(tasks_details, $scope.task_id);
        }
        $scope.addEditTaskManager = function (tasks_details, task_id) {
            taskManagerServices.EditTaskManager(tasks_details, task_id)
                .success(function (data, status) {
                    // console.log(JSON.stringify(data));
                    // ngDialog.open({
                    //     template: '<p>Station is Edited Successfully.</p>',
                    //     plain: true
                    // }); 
                    $scope.editdata = [];
                    $scope.getTask();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }


        $scope.DeleteTaskManager = function (value) {
            $scope.editdata = angular.copy($scope.taskBox[value]);
            $scope.task_id = $scope.editdata.task_id;
            // console.log($scope.task_id);
            taskManagerServices.DeleteTaskManager($scope.task_id)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Station is Deleted Successfully.</p>',
                        plain: true
                    });
                    $scope.editdata = [];
                    $scope.getTask();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })
        }



        $scope.getTask();



    }])

