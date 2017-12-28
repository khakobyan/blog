<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\{ Category, Post };

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Category $category, Post $post)
    {
        $categories = $category->get();
        $posts = $post->get();
        return view('home')->with(['categories' => $categories, 'posts' => $posts]);
    }
}
