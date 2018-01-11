var app = angular.module('myApp', [
      'ngRoute',
      'app.controllers'
])

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.config(function($routeProvider) {
    $routeProvider
    .when('/login', {
        templateUrl : 'views/auth/login.html',
        controller: 'LoginController'
    })
    .when('/register', {
        templateUrl : 'views/auth/register.html',
        controller: 'RegisterController'
    })
    .when('/', {
        templateUrl : 'views/home.html',
        controller: 'HomeController'
    })
    .when('/me/categories', {
        templateUrl: 'views/categories/userCategories.html',
        controller: 'UserCategoriesController'
    })
    .when('/me/categories/:id', {
        templateUrl: "views/categories/editCategory.html",
        controller: 'UserCategoriesController'
    })
    .when('/me/posts', {
        templateUrl: 'views/posts/userPosts.html',
        controller: 'UserPostsController'
    })
    .when('/me/posts/create',{
        templateUrl: "views/posts/createPost.html",
        controller: 'UserPostsController'
    })
    .when('/me/posts/:id',{
        templateUrl: "views/posts/editPost.html",
        controller: 'UserPostsController'
    })
    .when('/posts/:id', {
        templateUrl: 'views/posts/showPost.html',
        controller: 'SinglePostController'
    })
});
