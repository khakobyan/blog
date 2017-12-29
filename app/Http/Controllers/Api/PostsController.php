<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\PostService;

class PostsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show all posts.
     *
     * @return json
     */
    public function allPosts(PostService $postService)
    {
    	$all_posts = $postService->getAllPosts();
        return response()->json(
           ['status' => 'success',
            'message' => 'get all posts',
            'resource' => $all_posts]);
    }
}
