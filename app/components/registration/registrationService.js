angular.module('school_erp')
    .factory("registrationServices", ['$http', 'globalServices', function ($http, globalServices) {
        var registrationServices = {};
        // registrationServices.globalValue = {
        //         baseURL: 'http://192.168.1.11:4005/',

        //     }

        registrationServices.getSchoolById = function (school_id) {
            return $http({
                method: 'GET',
                // url:'http://192.168.1.16:4005/api/schools'
                url: globalServices.globalValue.baseURL + 'api/school_details/' + school_id
            })
        };
        registrationServices.setSchoolDetails = function (dataValue) {
            //  console.log("message")
            return $http({
                method: 'PUT',                
                url: globalServices.globalValue.baseURL + 'api/edit_school_details/' +globalServices.globalValue.school_id,
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
        };       

        registrationServices.getRegistration = function () {
            return $http({
                method: 'GET',
                // url:'http://192.168.1.16:4005/api/schools'
                url: globalServices.globalValue.baseURL + 'api/schools'
            })
        };


        registrationServices.setRegistration = function (dataValue) {
            //   console.log("message")
            return $http({
                method: 'POST',
                // url:'http://192.168.1.16:4005/api/schools',
                url: globalServices.globalValue.baseURL + 'api/schools',
                data: dataValue,
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
        };

        registrationServices.getClass = function (school_id) {
            return $http({
                method: 'GET',
                // url:'http://192.168.1.16:4005/api/school_classes/SCH-176'
                url: globalServices.globalValue.baseURL + 'api/school_classes/' + school_id
            })
        };


        registrationServices.setClass = function (dataValue, school_id) {
            //  console.log("message")
            return $http({
                method: 'POST',
                //url:'http://192.168.1.16:4005/api/school_classes/SCH-176',
                url: globalServices.globalValue.baseURL + 'api/school_classes/' + school_id,
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
        };
        registrationServices.editClass = function (dataValue, class_id) {
            //  console.log("message")
            return $http({
                method: 'PUT',                
                url: globalServices.globalValue.baseURL + 'api/edit_classes/' + class_id,
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
        };


        registrationServices.getSection = function (class_id) {
            return $http({
                method: 'GET',
                //url:'http://192.168.1.16:4005/api/class_sections/CLS-1'
                url: globalServices.globalValue.baseURL + 'api/class_sections/' + class_id
            })
        };
        registrationServices.getSectionByClassID = function (class_id) {
            return $http({
                method: 'GET',
                //url:'http://192.168.1.16:4005/api/class_sections/CLS-1'
                url: globalServices.globalValue.baseURL + 'api/get_sections_by_classid/' + class_id
            })
        };


        registrationServices.setSection = function (dataValue, class_id) {
            //    console.log("message")
            return $http({
                method: 'POST',
                //url:'http://192.168.1.16:4005/api/class_sections/CLS-1',
                url: globalServices.globalValue.baseURL + 'api/class_sections/' + class_id,
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
        };
        registrationServices.editSection = function (dataValue, section_id) {
            //    console.log("message")
            return $http({
                method: 'PUT',
                //url:'http://192.168.1.16:4005/api/class_sections/CLS-1',
                url: globalServices.globalValue.baseURL + 'api/edit_sections/' + section_id,
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
        };
        registrationServices.DeleteClass = function (class_id) {
            return $http({
                method: 'DELETE',
                url: globalServices.globalValue.baseURL + 'api/delete_classes/' + class_id
            })
        }
        registrationServices.DeleteSection = function (section_id) {
            return $http({
                method: 'DELETE',
                url: globalServices.globalValue.baseURL + 'api/delete_sections/' + section_id
            })
        }
        return registrationServices;
    }])