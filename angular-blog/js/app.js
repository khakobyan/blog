var app=angular.module('myApp',  ["ui.router","ngFileUpload"]);
app.run(['$rootScope', '$state', function($rootScope, $state){
        $rootScope.user = localStorage['user'];
        $rootScope.id = localStorage['id'];
        $rootScope.loggedIn = localStorage['loggedIn'];
        $rootScope.count_user=localStorage['count_user'];
        $rootScope.count_post=localStorage['count_post'];
        $rootScope.count_category=localStorage['count_category'];
    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState) {
    	if($rootScope.loggedIn && toState.data.guest) {
    		e.preventDefault();
    		$state.go('home', {}, {reload: true});
    		return false;
    	} else if(!toState.data.guest && !$rootScope.loggedIn) {
    		e.preventDefault();
    		$state.go('login', {}, {reload: true});
    		return false;
    	} 

    });
}])
