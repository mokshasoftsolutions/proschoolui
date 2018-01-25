angular.module('school_erp')
    .factory('taskManagerServices', ['$http', 'globalServices', function ($http, globalServices) {

        var taskManagerServices = {};

        taskManagerServices.getTaskManager = function () {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/tasks_manager/' + globalServices.globalValue.school_id
            })
        };

        taskManagerServices.setTaskManager = function (dataValue) {
            //  console.log(dataValue);
            return $http({
                method: 'POST',
                url: globalServices.globalValue.baseURL + 'api/task/' + globalServices.globalValue.school_id,
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };

        taskManagerServices.EditTaskManager = function (dataValue, task_id) {
            //   console.log(dataValue);
            return $http({
                method: 'PUT',
                url: globalServices.globalValue.baseURL + 'api/edit_task_management/' + task_id,
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };

        taskManagerServices.DeleteTaskManager = function (task_id) {
            return $http({
                method: 'DELETE',
                url: globalServices.globalValue.baseURL + 'api/delete_task_management/' + task_id,
            })
        };
        return taskManagerServices;
    }]); 
