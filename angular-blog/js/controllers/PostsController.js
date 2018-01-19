angular.module('myApp').controller('PostsController',
    ['$scope', '$http', '$state','$location', '$rootScope','$stateParams','Upload', function($scope, $http, $state, $location, $rootScope,$stateParams, Upload) {
        init();
        function init() {
            switch ($state.current.name) {
                case "me/posts"        : userPosts(); break;
                case "posts"           : posts(); break;
                case "edit_post"       : editPost(); break;
            } 
        }
        function userPosts() {
            $http.get('/api/me/posts').then(function (response) {
                var data = response.data.resource;
                $scope.userPosts = data;
            }, function(error) {

            });
        }

        $http.get('/api/categories').then(function (response) {
            var data = response.data.resource;
            $scope.allCategories = data;
        });

        $scope.addPost = function(){
            var data = new FormData();
            data.append('title', $scope.title);
            data.append('text', $scope.text);
            data.append('category_id', $scope.category.id);
            data.append('image_path', $scope.image);
        $   http.post('/api/me/posts', data,{
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function(response) {
                $scope.userPosts = response.data.resource;
                $location.path('/me/posts');
            }, function(error) {
                console.log(error);
            });
        }

        $scope.deletePost = function($id) {
            $http.delete('/api/me/posts/' + $id, {title: $scope.title}).then(function (response) {
                var data = response.data.resource;
                $scope.userPosts.map((value,index) => {
                    if(value.id == $id) {
                        $scope.userPosts.splice(index, 1);
                    }
                })
            })
        }   
    }
]);
