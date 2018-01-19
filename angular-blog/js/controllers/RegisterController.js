angular.module('myApp').controller('RegisterController',['$http', '$scope','$rootScope', '$state', function($http, $scope,$rootScope, $state) {
    $scope.inputs = {};
    $rootScope.user = '';
    $rootScope.loggedIn = false;
    
    $scope.submit = function(inputs) {
        $http.post('/api/register', $scope.inputs)
        .then(
        	function(response) { 
                localStorage.setItem('name',response.data.name);
                $rootScope.name = localStorage['name'];
                $state.go('login');
            }, 
            function(response) {
                $scope.errors = response.data;
                $state.go('register');
           	}
        ); 
    }
}]);