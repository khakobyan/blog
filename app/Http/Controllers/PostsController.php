<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Services\{ CategoryService, PostService };

class PostsController extends Controller
{
    protected $postService;
    
    public function __construct(PostService $postService)
    {
        $this->middleware('auth');
        $this->postService = $postService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $id = auth()->id();
        $posts = $this->postService->getPostsByUserId($id);
        return view('posts.index')->with('posts',$posts);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(CategoryService $categoryService)
    {
        $categories = $categoryService->all();
        return view('posts.create',['categories' => $categories]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PostRequest $request)

    {
        $inputs = $request->inputs();
        $this->postService->create($inputs);
        return redirect('/home')->with('message','Post created');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = $this->postService->getById($id);
        return view('posts.show')->with('post',$post);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id, CategoryService $categoryService)
    {
        $categories = $categoryService->all();
        $post = $this->postService->getById($id);
        return view('posts.edit')->with(['post' => $post, 'categories' => $categories]); 
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(PostRequest $request, $id)
    { 
        $inputs = $request-> inputs();
        $post = $this->postService->update($inputs, $id);
        if($request) {
            return redirect('/home');
        }
        return redirect()->back()->with('message','Something went wrong');
     }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->postService->delete($id);
        return redirect('/home');
    }
}
