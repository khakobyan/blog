<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Category;
use App\User;
use App\Post;
use Laravel\Passport\Passport;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
         view()->composer('layouts.app', function($view) {
            $view->with([
                'categories' => Category::all()->count(),
                'posts' => Post::all()->count(),
                'users' => User::all()->count(),
            ]);
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
        // Passport::ignoreMigrations();
    }
}
