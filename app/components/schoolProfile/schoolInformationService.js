angular.module('school_erp')
    .factory('SchoolInformationServices', ['$http', 'globalServices', function ($http, globalServices) {
        var SchoolInformationServices = {};

        // registrationServices.getSchoolById = function () {
        //     return $http({
        //         method: 'GET',
        //         url: globalServices.globalValue.baseURL + 'api/grades/' + globalServices.globalValue.school_id
        //     })
        // };

        // registrationServices.setSchoolDetails = function (dataValue) {
        //     //  console.log(dataValue);
        //     return $http({
        //         method: 'POST',
        //         url: globalServices.globalValue.baseURL + 'api/grades/' + globalServices.globalValue.school_id,
        //         data: $.param(dataValue),
        //         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        //     })
        // };
        SchoolInformationServices.EditSchool_details = function (dataValue, school_id) {
           // console.log(dataValue);
            return $http({
                method: 'PUT',
                url: globalServices.globalValue.baseURL + 'api/edit_school_details/' + school_id,
                //url: 'http://192.168.1.10:4005/api/edit_payband/STN-1',
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };


        SchoolInformationServices.editSchoolImage = function (dataValue) {
           // console.log(dataValue);
            return $http({
                method: 'POST',
                // url:'http://192.168.1.16:4005/api/schools',
                url: globalServices.globalValue.baseURL + 'api/schools_photo_edit/' + globalServices.globalValue.school_id,
                data: dataValue,
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
                // headers: { 'Content-Type':'application/x-www-form-urlencoded' }
            })
        };
        return SchoolInformationServices;

    }])