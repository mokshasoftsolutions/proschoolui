
<<<<<<< HEAD
angular.module('school_erp', ['ui.router','720kb.datepicker', 'ngDialog', 'zingchart-angularjs', 'htmlToPdfSave', 'xeditable', 'ui.calendar', 'ui.bootstrap','anguFixedHeaderTable','smart-table','ngProgress'])
=======
angular.module('school_erp', ['ui.router','720kb.datepicker', 'ngDialog', 'zingchart-angularjs', 'htmlToPdfSave', 'xeditable', 'ui.calendar', 'ui.bootstrap','anguFixedHeaderTable','ngProgress','smart-table'])
>>>>>>> 3063d8978d8eca3b5913af595172c0022cb6e366
  .run(function ($rootScope, $state, authService) {
    $rootScope.loginPage = false;
    $rootScope.role = 'teacher';
    // $rootScope.role = 'parent';
    // if($rootScope.role){

    // }

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

      var requireLogin = toState.data.requireLogin;
      if (requireLogin && authService.getUserInfo() == null) {
        $rootScope.authenticated = false;
        event.preventDefault();
        return $state.go("login");
      }

    });
  });


