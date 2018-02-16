angular.module('school_erp')
    .factory('globalServices', ['$http', '$rootScope', '$window', function ($http, $rootScope, $window) {
        var globalServices = {};
        // $window.localStorage["globalServices"] = null;
        // globalServices.globalValue = {
        //     baseURL: 'http://ec2-52-40-213-254.us-west-2.compute.amazonaws.com:4005/',

        //     schoolID: '',
        //     role: 'admin'
        // };

        globalServices.globalValue = {
            baseURL: 'http://192.168.1.6:4005/',
            schoolID: '',
            role: 'admin'
        }
      //  $window.localStorage["globalServices"] = globalServices.globalValue.baseURL;
    //   if($rootScope.role='admin'){
    //   $window.localStorage["globalServices"] = JSON.stringify(globalServices.globalValue.baseURL);
    //      console.log($window.localStorage["globalServices"]);
    //   }

        // globalServices.globalValue = {
        //     baseURL: 'http://localhost:4005/',
        //     schoolID: '',
        //     role: 'admin'
        // }


        globalServices.fetchRoleAuth = function (roles) {
            var i = 0;
            var retVal;
            while (i <= roles.length) {
                if (roles[i] == $rootScope.role) {
                    retVal = true;
                    break;
                } else {
                    retVal = false;
                }
                i++;
            }
            return retVal;
        }

        globalServices.getUserInfo = function () {
            if ($window.localStorage["userInfo"]) {
                userInfo = JSON.parse($window.localStorage["userInfo"]);
                if (userInfo != null) {
                    globalServices.globalValue.token = userInfo.token;
                    globalServices.globalValue.school_id = userInfo.school_id;
                    globalServices.globalValue.role = userInfo.role;
                    // console.log("user info");
                    // console.log(globalServices.globalValue);
                } else {
                    $window.localStorage["userInfo"] = null;
                    globalServices.globalValue.token = "";
                    globalServices.globalValue.school_id = "";
                    globalServices.globalValue.role = "";
                    //  $window.localStorage["wishlist"] = null;
                    //  $window.localStorage["sales"] = null;
                }
            }

        }


        globalServices.getUserInfo();


        globalServices.getClass = function () {
            return $http({
                method: 'GET',

                url: globalServices.globalValue.baseURL + 'api/school_classes/' + globalServices.globalValue.school_id

            })
        };
        globalServices.getSections = function (classID) {
            return $http({
                method: 'GET',

                url: globalServices.globalValue.baseURL + 'api/class_sections/' + classID

            })
        };

        globalServices.getSectionsBySchoolId = function()  {
            return $http({
                method: 'GET',

                url: globalServices.globalValue.baseURL + 'api/get_sections_by_schoolid/' + globalServices.globalValue.school_id

            })
        };


        globalServices.getBusRoutes = function () {
            return $http({
                method: 'GET',

                url: globalServices.globalValue.baseURL + 'api/bus_route_title/' + globalServices.globalValue.school_id
            })
        };
        return globalServices;
    }]);