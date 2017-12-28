<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/me', function (Request $request) {
    return $request->user();
});

Route::post('/login', 'Api\UsersController@login');
Route::post('/register', 'Api\UsersController@register');
Route::get('/logout', 'Api\UsersController@logout');
//categories routes
Route::get('/categories', 'Api\CategoriesController@allCategories');
Route::resource('/me/categories', 'Api\UserCategoriesController', ['except' => ['edit', 'show', 'create']]);
//posts routes
Route::get('/posts', 'Api\PostsController@allPosts');
Route::resource('/me/posts', 'Api\UserPostsController', ['except' => ['create', 'edit']]);
