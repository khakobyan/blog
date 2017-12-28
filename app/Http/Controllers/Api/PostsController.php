<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\PostService;

class PostsController extends Controller
{
	protected $postService;

    public function __construct(PostService $postService)
    {
        $this->middleware('auth');
        $this->postService = $postService;
    }

    /**
     * Show all posts.
     *
     * @return json
     */
    public function allPosts()
    {
    	$all_posts = $this->postService->getAllPosts();
        return response()->json(
           ['status' => 'success',
            'message' => 'get all posts',
            'resource' => $all_posts]);
    }
}
