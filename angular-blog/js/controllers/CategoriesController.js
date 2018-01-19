angular.module('myApp').controller('CategoriesController',
    ['$scope', '$http', '$state','$location', '$rootScope', '$stateParams',function($scope, $http, $state, $location, $rootScope,$stateParams) {
        init();
        function init() {
            switch ($state.current.name) {
                case "me/categories"   : userCategories(); break;
                case "spec_posts"      : specPosts(); break;
            }
        }
        
        function userCategories() {
            $http.get('/api/me/categories')
            .then(function(response) {
                var data = response.data.resource;
                $scope.userCategories = data;
            })
        }
          
        $scope.addCategory = function(){
            $http.post('/api/me/categories', {name: $scope.name}).then(function (response) {
                var data = response.data.resource;
                $scope.userCategories.push(data);
            });
        }

        $scope.deleteCategory = function($id){
            $http.delete('/api/me/categories/' + $id, {name: $scope.name}).then(function (response) {
                var data = response.data.resource;
                $scope.userCategories.map((value,index) => {
                    if(value.id == $id) {
                        $scope.userCategories.splice(index, 1);
                    }
                })
            });
        }

        $scope.updateCategory = function() {
            var id = $stateParams.id;
            $http.put('/api/me/categories/' + id, {name: $scope.name}).then(function (response) {
                $location.path('/me/categories');
            });
        }
}]);

