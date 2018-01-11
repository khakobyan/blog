angular.module('app.controllers', [
    'ngRoute',
]).controller('appController', function($scope, $http, $location){

    sessionStorage.setItem('isLogged', 0);

    $scope.checkAuth = function(){
        $scope.userName = sessionStorage.getItem('name');
        if(sessionStorage.getItem('isLogged') == 1){
            return true;
        }
        return false;
    };

    $scope.checkGuest = function () {
        if(sessionStorage.getItem('isLogged') == 0){
            return true;
        }
        return false;
    }

    $scope.logout = function(){
        $http.get('/api/logout').then(function successCallback(response) {
            sessionStorage.clear();
            sessionStorage.setItem('isLogged', 0);
            $location.path('/');
        }, function errorCallback(response) {

        });
    }
}).controller('LoginController', function($scope, $http, $location){
    $scope.login = function() {
        var user = {
                email: $scope.user.email,
                password: $scope.user.password
            }
        $http.post('/api/login', user).then(function successCallback(response) {
            var data = response.data.resource;
            sessionStorage.setItem('isLogged', 1);
            sessionStorage.setItem('user_id', data.id);
            sessionStorage.setItem('name', data.name);
            $location.path('/');
        }, function errorCallback(response) {

        });
    }
}).controller('RegisterController', function($scope, $http, $location){
    $scope.register = function(inputs){
        $http.post('/api/register', inputs).then(function successCallback(response) {
            var data = response.data.resourse;
            $location.path('/login');
        }, function errorCallback(response) {
          
        });
    }
}).controller('HomeController', function($scope, $http){
    if (sessionStorage.getItem('isLogged') == 1) {
        $http.get('/api/categories').then(function (response) {
            var data = response.data.resource;
            $scope.allCategories = data;
        }, function (error) {
            console.log(error);
        })
        $http.get('/api/posts').then(function(response) {
            var data = response.data.resource;
            $scope.allPosts = data;
        }, function(error) {
            console.log(error);
        });
    };
}).controller('UserCategoriesController', function($scope, $http, $location, $routeParams){
    $http.get('/api/me/categories').then(function (response) {
        var data = response.data.resource;
        $scope.userCategories = data;
    }, function(error) {

    });
    $scope.addCategory = function(){
        $http.post('/api/me/categories', {name: $scope.name}).then(function (response) {
            var data = response.data.resource;
            $scope.userCategories.push(data);
        }, function(error) {
            console.log(error);
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
        }, function(error) {

        });
    }
    $scope.updateCategory = function(){
        var id = $routeParams.id;
        $http.put('/api/me/categories/' + id, {name: $scope.name}).then(function (response) {
            $location.path('/me/categories');
        }, function(error) {
            console.log(error);
        });
    }

}).controller('UserPostsController', function($scope, $http, $location, $routeParams){
    $http.get('/api/me/posts').then(function (response) {
        var data = response.data.resource;
        $scope.userPosts = data;
    }, function(error) {

    });
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
        $http.post('/api/me/posts', data,{
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
    $scope.updatePost = function(){
        var id = $routeParams.id;
        var data = new FormData();
        data.append('title', $scope.title);
        data.append('text', $scope.text);
        data.append('category_id', $scope.category.id);
        data.append('image_path', $scope.image);
        data.append('id', $routeParams.id);
        data.append('_method','PUT');
        $http.post('/api/me/posts/' + id, data, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
        }).then(function(response) {
            $scope.userPosts = response.data.resource;
            $location.path('/me/posts');
        }, function(error) {
            console.log(error);
        })
    }
}).controller('SinglePostController', function($scope, $http, $location, $routeParams) {
    var id = $routeParams.id;
    $http.get('/api/me/posts/' + id).then(function (response) {
        var data = response.data.resource;
        $scope.post = data;
        $scope.userId = sessionStorage.getItem('user_id');
    }, function (error) {
        console.log(error);
    })
    $scope.deletePost = function($id) {
        $http.delete('/api/me/posts/' + $id, {title: $scope.title}).then(function (response) {
            var data = response.data.resource;
            $location.path('/');
        }, function(error) {
            console.log(error);
        })
    }
})

