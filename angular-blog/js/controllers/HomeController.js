angular.module('myApp').controller('HomeController',
    ['$scope', '$http', '$state','$location', '$rootScope', function($scope, $http, $state, $location, $rootScope) {
        if($state.current.name == "home"){
            $http.get('/api/categories').then(function(response) {
                var data  = response.data.resource;
                $scope.allCategories = data;
            });
            $http.get('/api/posts').then(function(response) {
                var data = response.data.resource;
                $scope.allPosts = data;
            }) ;
        }
    }
]);
