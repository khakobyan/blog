<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\PostRequest;
use App\Http\Controllers\Controller;
use App\Services\PostService;

class UserPostsController extends Controller
{
    protected $postService;

    public function __construct(PostService $postService)
    {
        $this->middleware('auth');
        $this->postService = $postService;
    }

    /**
     * Shows user posts.
     *
     * @return json
     */
    public function index()
    {
        $id = auth()->id();
        $user_posts = $this->postService->getPostsByUserId($id);
        return response()->json(
           ['status' => 'success',
            'message' => 'get user posts',
            'resource' => $user_posts]);
    }

    /**
     * Store a newly created post in storage.
     *
     * @param $request
     * @return json
     */
    public function store(PostRequest $request)
    {
        $inputs = $request->inputs();
        $this->postService->create($inputs);
        return response()->json(
           ['status' => 'success',
            'message' => 'Post created successfully',
            'resource' => $inputs]);
    }

    /**
     * Shows simple post.
     *
     * @param  $id
     * @return json
     */
    public function show($id)
    {
        $post = $this->postService->getById($id);
        return response()->json(
           ['status' => 'success',
            'message' => 'get single post',
            'resource' => $post]);
    }
    
    /**
     * Update post.
     *
     * @param $request $id
     * @return json
     */
    public function update(PostRequest $request, $id)
    {
        $inputs = $request-> inputs();
        $post = $this->postService->update($inputs, $id);
        return response()->json(
           ['status' => 'success',
            'message' => 'Post updated successfully',
            'resource' => $inputs]);
    }

    /**
     * Delete post.
     *
     * @param  $id
     * @return json
     */
    public function destroy($id)
    {
        $this->postService->delete($id);
        return response()->json(
           ['success' => 'true',
            'message' => 'Post deleted successfully',
            'resource' => $id]);
    }
}
