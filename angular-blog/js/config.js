angular.module("myApp").config(function($stateProvider, $urlRouterProvider) {
  // 
  // For any unmatched url, redirect to /state1 
  // 
  // Now set up the states     
  $stateProvider
  .state('login',{
    url: '/',
    templateUrl: 'views/login.html',
    controller: 'LoginController',
    data :
    {
      guest: true
    }
  })
  .state('register',{
    url: '/register',
    templateUrl: 'views/register.html',
    controller: 'RegisterController',
    data :
    {
      guest: true
    }
  }) 
  .state('home',{
    url: '/home',
    templateUrl: 'views/home.html',
    controller: 'HomeController',
    data :
    {
      guest: false
    }
  })
  .state('me/categories', {
      url: "/me/categories",
      templateUrl: "views/category/my_categories.html",
      controller: "CategoriesController",
      data :
      {
        guest: false
      }
  })
  .state("me/categories/:id", {
      url: "/me/categories/:id",
      templateUrl : "views/category/edit.html",
      controller: 'CategoriesController',
      params: {
        id: null
      },
      data :
      {
        guest: false
      }
  })
  .state("me/posts", {
      url: "/me/posts",
      templateUrl: "views/post/my_posts.html",
      controller: "PostsController",
      data :
      {
        guest: false
      }
  })
  .state('me/posts/create', {
      url: "/me/posts/create",
      templateUrl: "views/post/create.html",
      controller: "PostsController",
      data :
      {
        guest: false
      }

  })
  .state("me/posts/:id", {
        url: "/me/posts/:id",
        params: {
            id: null
        },
        data :
        {
          guest: false
        },
        templateUrl : "views/post/edit.html",
        controller: 'PostsController'
  })
    .state("posts/:id", {
        url: "/posts/:id",
        params: {
            id: null
        },
        data :
        {
            guest: false
        },
        templateUrl : "views/post/show.html",
        controller: 'CategoriesController'
    })
  $urlRouterProvider.otherwise("/");
});