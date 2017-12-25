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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', 'Api\UsersController@login');
Route::post('/register', 'Api\UsersController@register');
Route::get('/logout', 'Api\UsersController@logout');
//categories routes
Route::get('/categories', 'Api\CategoryController@index');
Route::get('/me/categories', 'Api\CategoryController@myCategories');
Route::post('/me/categories', 'Api\CategoryController@store');
Route::delete('/me/categories/{id}', 'Api\CategoryController@destroy');
Route::put('/me/categories/{id}', 'Api\CategoryController@update');
//posts routes
Route::get('/me/posts', 'Api\PostController@userPosts');
Route::get('/posts', 'Api\PostController@allPosts');
Route::post('/me/posts', 'Api\PostController@store');
Route::delete('/me/posts/{id}', 'Api\PostController@destroy');
Route::get('/posts/{id}', 'Api\PostController@show');
Route::put('/me/posts/{id}', 'Api\PostController@update');
